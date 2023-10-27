import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiUser } from "react-icons/hi";
import BranchLogo from "../assets/branch-logo.png";
import { useNavigate } from "react-router-dom";
export default function DefaultSidebar() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("userInfo");
        navigate("/sign_in");
    };
    return (
        <Sidebar aria-label="Branch Int'l">
            <Sidebar.Logo href="/" img={BranchLogo} imgAlt="Branch Int'l"></Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie}>
                        <p>Home</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="/inbox" icon={HiInbox}>
                        <p>Inbox</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        <p>Customers</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        <p>Loans</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser}>
                        <p>Profile</p>
                    </Sidebar.Item>

                    <Sidebar.Item icon={HiArrowSmRight} onClick={handleClick}>
                        <p>Sign Out</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
