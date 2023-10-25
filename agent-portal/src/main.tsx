import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MessageProvider from "./context/MessageProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MessageProvider>
        <App />
    </MessageProvider>
);
