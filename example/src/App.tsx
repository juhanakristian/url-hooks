import * as React from "react";

import { usePathParams } from "../../dist/index";

type Params = {
  id: string;
  name: string;
};

export default function App() {
  const { name } = usePathParams<Params>("/:name");
  return (
    <div>
      <h1>Hello {name} </h1>
      <p>This is a simple example of a React app.</p>
    </div>
  );
}
