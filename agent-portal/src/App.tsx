import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import Home, { messagesLoader } from "./pages/Home";
import MessageDetails, { messageDetailsLoader } from "./pages/MessageDetails";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} loader={messagesLoader} />
                <Route path="/messages/:id" element={<MessageDetails />} loader={messageDetailsLoader} />
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
