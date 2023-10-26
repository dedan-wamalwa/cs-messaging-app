import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="h-screen">
                    <SideBar />
                </div>
                <div className="py-2 px-6 w-full md:w-3/4 h-screen">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default RootLayout;
