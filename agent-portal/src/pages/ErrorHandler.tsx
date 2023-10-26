import { Link } from "react-router-dom";
const ErrorHandler = () => {
    return (
        <div className="p-2 lg:p-0 flex flex-col items-center gap-4 justify-center lg:h-screen lg:bg-gray-200">
            <p className="text-center">
                <span className="text-4xl">Error!</span>
                <span className="text-2lg">
                    <br /> Seems like the server is downn...
                </span>
            </p>
            <p className="text-xl">Sorry, an error occurred. Please go to homepage.</p>
            <p>
                Back{" "}
                <Link to="/" className="text-blue-600">
                    Home
                </Link>
            </p>
        </div>
    );
};

export default ErrorHandler;
