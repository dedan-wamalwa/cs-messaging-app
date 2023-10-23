import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
const RootLayout = () => {
    return (
        <>
            <div className="flex flex-col">
                <NavBar />
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
