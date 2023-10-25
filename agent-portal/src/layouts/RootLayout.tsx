import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="h-screen">
                    <SideBar />
                </div>
                <div className="py-2 px-6 w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default RootLayout;
