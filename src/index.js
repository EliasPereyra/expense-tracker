import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

import App from "./App";

ReactDOM.render(
  <SpeechProvider appId="9dabb8f8-83e7-4890-aab6-7bed8737b5e5" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
