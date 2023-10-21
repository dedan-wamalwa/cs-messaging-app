import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="h-screen">
                    <SideBar />
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
