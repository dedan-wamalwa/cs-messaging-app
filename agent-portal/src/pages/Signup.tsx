import { Button, Label, Card, FileInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../components/content/Logo";
const SignUp = () => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [employmentStatus, setEmploymentStatus] = useState<string>("Employed");
    const [profilePhotoPath, setProfilePhotoPath] = useState<string | null>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();
    const [error1, setError1] = useState<string | null>();
    const navigate = useNavigate();

    const submitDetails = async (): Promise<void> => {
        setLoading(true);
        setError1(null);
        if (!name || !email || !phone || !employmentStatus || !password || !confirmPassword) {
            setError1("Please fill all the details");
            setLoading(false);
            return;
        }
        if (password != confirmPassword) {
            setError1("Passwords don't match");
            setLoading(false);
            return;
        }
        try {
            const api = import.meta.env.VITE_PUBLIC_API_HOST;
            const response = await fetch(`${api}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    employmentStatus,
                    profilePhotoPath,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);

            navigate("/sign_in", { state: email });
        } catch (error: any | unknown) {
            console.error("Error:", error.message);
            setLoading(false);
            setError1("Sorry, an error occurred, please try again");
            return;
        }
    };

    const postPhoto = (photo: File | null): void => {
        const api = import.meta.env.VITE_FILE_UPLOAD_URL;
        const profileUrl = import.meta.env.VITE_DEFAULT_PROFILE_URL;
        setLoading(true);
        if (!photo) {
            setProfilePhotoPath(profileUrl);
            setLoading(false);
            return;
        }
        if (photo) {
            if (photo.type === "image/jpeg" || photo.type === "image/png") {
                const data = new FormData();
                setError(null);
                data.append("file", photo);
                data.append("upload_preset", "messaging-app");
                data.append("cloud_name", "dnvguqrso");
                fetch(api, {
                    method: "post",
                    body: data,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setProfilePhotoPath(data.url.toString());
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                    });
            } else {
                setError("Please choose appropriate file format (jpeg/png)");
                setLoading(false);
                return;
            }
        }
    };
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Phone" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="phone"
                            required
                            type="text"
                            placeholder="0712345678"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="employmentStatus" value="Employment Status" />
                        </div>
                        <select
                            id="employmentStatus"
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            required
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                        >
                            <option>Employed</option>
                            <option>Self Employed</option>
                            <option>Student</option>
                        </select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="profilePhotoPath" value="Upload Profile Photo" />
                        </div>
                        <FileInput
                            accept="image/jpeg, image/png"
                            id="profilePhotoPath"
                            onChange={(e) => postPhoto(e.target.files && e.target.files[0])}
                        />
                    </div>
                    {error && (
                        <div>
                            <div className="mb-2 block text-sm text-red-400">{error}</div>
                        </div>
                    )}
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
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password" value="Confirm password" />
                        </div>
                        <input
                            className="block w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-gray-800 focus:ring-gray-800 shadow-sm"
                            id="repeat-password"
                            required
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error1 && (
                        <div>
                            <div className="mb-2 block text-sm text-red-400">{error1}</div>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <p>
                            Already have an account?{" "}
                            <Link to="/sign_in" className="text-blue-600">
                                Sign In
                            </Link>
                        </p>
                    </div>
                    <Button
                        color="success"
                        type="submit"
                        isProcessing={loading}
                        onClick={submitDetails}
                        disabled={error || error1 || loading ? true : false}
                    >
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
