import { Button, Label, Card } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/content/Logo";
import { useEffect, useState } from "react";
const SignIn = () => {
    const [email, setEmail] = useState<string>(useLocation().state || "");
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();
    const defaultRole = "Customer";

    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (storedData) {
            const { role } = JSON.parse(storedData);
            if (role === defaultRole) {
                navigate("/");
            }
        }
    }, [navigate]);
    const submitDetails = async (): Promise<void> => {
        setLoading(true);
        if (!email || !password) {
            setError("Please fill all the details");
            setLoading(false);
            return;
        }
        try {
            const api = import.meta.env.VITE_PUBLIC_API_HOST;
            const response = await fetch(`${api}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    role: defaultRole,
                }),
            });
            if (response.status === 401) {
                setError("Invalid email or password");
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/");
        } catch (error: any | unknown) {
            console.error("Error:", error.message);
            setLoading(false);
            setError("Sorry, an error occurred, please try again");
            return;
        }
    };
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
                            placeholder="e.g. name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div>
                            <div className="mb-2 block text-sm text-red-400">{error}</div>
                        </div>
                    )}
                    <Button color="success" type="submit" onClick={submitDetails} isProcessing={loading} disabled={loading}>
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
