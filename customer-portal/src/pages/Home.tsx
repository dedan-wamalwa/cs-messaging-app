import { useLoaderData, useNavigate } from "react-router-dom";
import { message, user } from "../types";
import Message from "../components/content/Message";
import { useEffect, useState } from "react";
import { Textarea } from "flowbite-react";
const Home = () => {
    const messages: message[] = (useLoaderData() as message[]) || [];
    const [description, setDescription] = useState<string>();

    const [showChat, setShowChat] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (!storedData) {
            navigate("/sign_in");
        }
    }, [navigate]);
    const showChatBox = () => {
        setShowChat((a) => !a);
    };

    const submitDetails = async (): Promise<void> => {
        if (!description) {
            return;
        }
        const storedData = JSON.parse(localStorage.getItem("userInfo") as string);
        if (!storedData) {
            return;
        }
        const data = {
            sender: storedData._id,
            description,
            customer: storedData._id,
            attachmentPath: "",
            isCustomerMessage: true,
        };
        console.log(data);
        try {
            const api = import.meta.env.VITE_PUBLIC_API_HOST;
            const response = await fetch(`${api}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 401) {
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error: any | unknown) {
            console.error("Error:", error.message);
            throw error;
        }
    };

    const getSenderName = (sender: user) => {
        return sender.name;
    };
    const getImageUrl = (sender: user) => {
        return sender.profilePhotoPath;
    };
    return (
        <>
            <div className="w-full ">
                <div className="ml-4 flex flex-col">
                    <div>
                        <p className="text-gray-800 text-4xl py-2">Welcome Dedan Wamalwa</p>
                    </div>
                    <div></div>
                </div>
                <div
                    className={`${
                        showChat ? `flex flex-col` : `hidden`
                    } fixed bottom-14 right-2 w-11/12 h-3/4 md:w-1/3 rounded-md bg-sky-100 p-1 overflow-auto`}
                >
                    <h5 className="text-gray-900 text-center font-bold">My Messages</h5>
                    <ul>
                        {messages.map((message) => (
                            <Message
                                key={message._id}
                                sender={getSenderName(message.sender as user) as string}
                                img={getImageUrl(message.sender as user) as string}
                                description={message.description as string}
                                alt={getSenderName(message.sender as user) as string}
                                time={message.createdAt as string}
                            />
                        ))}
                    </ul>
                    <form className="mt-auto flex flex-col gap-2" onSubmit={(event) => event.preventDefault()}>
                        <div className="flex gap-1 max-w-lg pt-2" id="textarea">
                            <Textarea
                                id="comment"
                                placeholder="Write your message here..."
                                required
                                rows={2}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button type="submit" onClick={submitDetails}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <style>svg{"fill:#421dc9"}</style>
                                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <button
                    type="button"
                    onClick={showChatBox}
                    className="fixed bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Messages
                </button>
            </div>
        </>
    );
};
export const messagesLoader = async () => {
    const api = import.meta.env.VITE_PUBLIC_API_HOST;
    const { _id } = JSON.parse(localStorage.getItem("userInfo") as string);
    try {
        const response = await fetch(`${api}/api/messages/customer/${_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export default Home;
