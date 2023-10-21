import { Button, Label, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "../components/content/Logo";
const SignIn = () => {
    return (
        <div className="p-2 lg:p-0 flex items-center justify-center lg:h-screen lg:bg-gray-200">
            <Card className="md:w-2/3 lg:w-1/3">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <form className="flex flex-col gap-4 lg:gap-2">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="email"
                            required
                            type="email"
                            placeholder="name@aspire.com"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="password"
                            required
                            type="password"
                        />
                    </div>
                    <Button color="success" type="submit">
                        Sign In
                    </Button>
                    <div>
                        <p className="my-1 text-center">
                            Don't have an account?{" "}
                            <Link to="/sign_up" className="text-blue-600">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SignIn;
