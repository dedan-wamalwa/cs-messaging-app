import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./content/Logo";
const NavBar = () => {
    const profUrl = import.meta.env.VITE_DEFAULT_PROFILE_URL;
    const storedData = localStorage.getItem("userInfo");
    const userData = storedData ? JSON.parse(storedData) : null;
    const navigate = useNavigate();
    const handleAuth = () => {
        if (userData) {
            localStorage.removeItem("userInfo");
        }
        navigate("/sign_in");
    };
    return (
        <Navbar fluid rounded className="sm:py-6">
            <Navbar.Brand href="/">
                <Logo />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={<Avatar alt="User settings" img={userData ? userData.profilePhotoPath : profUrl} rounded />}
                >
                    {userData && (
                        <>
                            <Dropdown.Header>
                                <span className="block text-sm">{userData.name}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                        </>
                    )}
                    <Dropdown.Item onClick={handleAuth}>{userData ? "Sign Out" : "Sign In"}</Dropdown.Item>
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
