// HOC ClickTrackingHOC
const withClickTracking = (WrappedComponent) => {
  return function HOCClickTracking(props) {
    const handleClick = () => {
      console.log("Click tracked:", props.trackingInfo);
    };

    return (
      <div onClick={handleClick}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

// Original component
const Button = (props) => {
  return <button>{props.label}</button>;
};

const Link = (props) => {
  return <a href={props.href}>{props.children}</a>;
};

// Applying the HOC to the original component
const ButtonWithClickTracking = withClickTracking(Button);
const LinkWithClickTracking = withClickTracking(Link);

function App() {
  return (
    <>
      <div>
        <h1>HOC Example</h1>
        <Link>Link no tracking</Link>
        <LinkWithClickTracking trackingInfo="Link 1">
          Tracked Link
        </LinkWithClickTracking>
        <br />
        <Button label="No Tracking" />
        <ButtonWithClickTracking label="Click Me" trackingInfo="Button 1" />
        <ButtonWithClickTracking label="Click Me Too" trackingInfo="Button 2" />
      </div>
    </>
  );
}

export default App;
