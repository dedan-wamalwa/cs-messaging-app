import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "./content/Logo";
const NavBar = () => {
    const profUrl = import.meta.env.VITE_DEFAULT_PROFILE_URL
    return (
        <Navbar fluid rounded className="sm:py-6">
            <Navbar.Brand href="/">
                <Logo />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={<Avatar alt="User settings" img={profUrl} rounded />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Dedan Wamalwa</span>
                        <span className="block truncate text-sm font-medium"></span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to="/" className="text-gray-800 hover:text-sky-400">
                    Home
                </Link>
                <Link to="/loans" className="text-gray-800 hover:text-sky-400">
                    Loans
                </Link>
                <Link to="/transactions" className="text-gray-800 hover:text-sky-400">
                    Transactions
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
