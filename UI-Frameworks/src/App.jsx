import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Example() {
  function showSettingsDialog() {
    alert("Open settings dialog!");
  }

  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <button
            onClick={showSettingsDialog}
            className="block w-full text-left data-[focus]:bg-blue-100"
          >
            Settings
          </button>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
        <form action="/logout" method="post">
          <MenuItem>
            <button
              type="submit"
              className="block w-full text-left data-[focus]:bg-blue-100"
            >
              Sign out
            </button>
          </MenuItem>
        </form>
      </MenuItems>
    </Menu>
  );
}
function TailwindUIInput() {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Tailwind Email - CSS Framework
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <p id="email-description" className="mt-2 text-sm text-gray-500">
        We will use this for spam.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <ChakraProvider>
      <TailwindUIInput />
      <br /> <br /> <br />
      <FormControl>
        <FormLabel>Chakra Email - Opinionated Framework</FormLabel>
        <Input type="email" placeholder="you@example.com" />
        <FormHelperText>We will always share your email.</FormHelperText>
      </FormControl>
      <br /> <br /> <br />
      <Example />
    </ChakraProvider>
  );
}
