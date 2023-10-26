import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Home, { messagesLoader } from "./pages/Home";
import Chat, { customerMessagesLoader } from "./pages/Chat";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import ErrorHandler from "./pages/ErrorHandler";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route index element={<Home />} loader={messagesLoader} />
                <Route path="/chats/:id" element={<Chat />} loader={customerMessagesLoader} />
            </Route>
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}
export default App;
