import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <div className="p-2 lg:p-0 flex flex-col items-center gap-4 justify-center lg:h-screen lg:bg-gray-200">
            <p className="text-center">
                <span className="text-4xl">404 </span>
                <span className="text-2lg">
                    <br /> Page Not Found
                </span>
            </p>
            <p className="text-xl">Sorry, we couldn't find the page you are looking for</p>
            <p>
                Back{" "}
                <Link to="/" className="text-blue-600">
                    Home
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
