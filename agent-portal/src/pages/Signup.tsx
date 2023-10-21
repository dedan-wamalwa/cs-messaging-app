import { Button, Label, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "../components/content/Logo";
const SignUp = () => {
    return (
        <div className="lg:p-0 flex flex-col items-center justify-center lg:bg-gray-200">
            <Card className="md:w-2/3 lg:w-1/3 my-2">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <form className="flex flex-col gap-4 lg:gap-2">
                    <h1 className="text-lg text-center font-semibold tracking-tight text-gray-900">Let's Get Started</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Full Name" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="name"
                            required
                            type="text"
                            placeholder="e.g. John Doe"
                        />
                    </div>
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
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password" value="Confirm password" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="repeat-password"
                            required
                            type="password"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <p>
                            Already have an account?{" "}
                            <Link to="/sign_in" className="text-blue-600">
                                Sign In
                            </Link>
                        </p>
                    </div>
                    <Button color="success" type="submit">
                        Sign Up
                    </Button>
                    <div>
                        <p className="text-xs my-1">
                            By creating an account, you agree to the{" "}
                            <Link to="/terms_and_privacy" className="text-blue-600 hover:underline">
                                Terms of Service.
                            </Link>{" "}
                            For more information about SpireTravel's privacy practices, see the{" "}
                            <Link to="/terms_and_privacy" className="text-blue-600 hover:underline">
                                Privacy Policy Statement.
                            </Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SignUp;