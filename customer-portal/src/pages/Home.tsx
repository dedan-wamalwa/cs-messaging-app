import { useLoaderData } from "react-router-dom";
import { message } from "../types";
import Message from "../components/content/Message";

const Home = () => {
    const messages: message[] = (useLoaderData() as message[]) || [];
    return (
        <>
            <div className="w-full p-4 border-2 border-red-300">
                {messages.map((m) => (
                    <Message key={m._id} />
                ))}
                {messages.map((m) => (
                    <Message key={m._id} />
                ))}
                {messages.map((m) => (
                    <Message key={m._id} />
                ))}
                {messages.map((m) => (
                    <Message key={m._id} />
                ))}
                {messages.map((m) => (
                    <Message key={m._id} />
                ))}
                <div className="fixed bottom-14 right-2 w-11/12 h-3/4 md:w-1/3 bg-gray-300 p-4">Chatbox content goes here</div>
                <button className="fixed bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Click Me
                </button>
            </div>
        </>
    );
};
export const messagesLoader = async () => {
    const api = import.meta.env.VITE_PUBLIC_API_HOST;
    try {
        const response = await fetch(`${api}/api/messages`);
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
