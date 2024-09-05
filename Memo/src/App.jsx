import { useState, useMemo, memo } from "react";

// Increase this number to see worse effects, decrease to see where memo becomes useless
// Remeber if you have a powerful computer you could handle much higher than the average dev
// Use chrome performance dev tools to limit performance
const listOfItems = Array.from(Array(10000).keys());

function App() {
  return (
    <>
      <p>
        Random numbers are a visual way to show what is being re-rendered. Left
        is slowest and right is the fastest to re-render
      </p>

      <div style={{ flexDirection: "row", display: "flex" }}>
        <NormalList />
        <MemoList />
        <MemoComponentList />
      </div>
    </>
  );
}

function NormalList() {
  const [counter, setCounter] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);

  return (
    <div style={{ marginRight: 40 }}>
      <h1>No Memo</h1>
      <p>Counter: {counter}</p>
      {listOfItems.map((v, idx) => {
        return (
          <div
            onClick={() => {
              setCounter(counter + 1);
              setSelectedArray((selected) => {
                if (selected.includes(v))
                  return selected.filter((sv) => sv !== v);

                return [...selected, v];
              });
            }}
            key={idx}
          >
            <input type="checkbox" checked={selectedArray.includes(v)} />
            {/* Math.Random is to show each which items are being re-rendered */}
            Item {Math.random()}
          </div>
        );
      })}
    </div>
  );
}

function MemoList() {
  const [counter, setCounter] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);

  const visibleTodos = useMemo(
    () =>
      listOfItems.map((v, idx) => {
        return (
          <div
            onClick={() => {
              // Without useMemo this is going to be very slow to update the page.
              setCounter((c) => c + 1);
              setSelectedArray((selected) => {
                if (selected.includes(v))
                  return selected.filter((sv) => sv !== v);

                return [...selected, v];
              });
            }}
            key={idx}
          >
            <input type="checkbox" checked={selectedArray.includes(v)} />
            {/* Math.Random is to show each which items are being re-rendered */}
            Item {Math.random()}
          </div>
        );
      }),
    [selectedArray]
  );

  return (
    <div style={{ marginRight: 40 }}>
      <h1>useMemo</h1>
      <p style={{ width: 250, fontSize: 12 }}>
        Without the checkboxes and just the counter when clicking list elements
        this is actually a good solution compared to the left. (Try it)
      </p>
      <p>Counter: {counter}</p>
      {visibleTodos}
    </div>
  );
}

function MemoComponentList() {
  const [counter, setCounter] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);

  return (
    <div style={{ marginRight: 40 }}>
      <h1>memo()</h1>
      <p>Counter: {counter}</p>
      {listOfItems.map((v, idx) => {
        return (
          <MemoListComponent
            key={idx}
            v={v}
            selected={selectedArray.includes(v)}
            onClick={() => {
              // Without useMemo this is going to be very slow to update the page.
              setCounter((c) => c + 1);
              setSelectedArray((selected) => {
                if (selected.includes(v))
                  return selected.filter((sv) => sv !== v);

                return [...selected, v];
              });
            }}
          />
        );
      })}
    </div>
  );
}

const MemoListComponent = memo(
  function ListComponent(props) {
    return (
      <div
        onClick={() => {
          props.onClick();
        }}
      >
        <input type="checkbox" checked={props.selected} />
        {/* Math.Random is to show each which items are being re-rendered */}
        Item {Math.random()}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Function to declare if props are equal, return true if no change between new and old props
    return prevProps.selected === nextProps.selected;
  }
);

export default App;
