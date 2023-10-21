import { useLoaderData } from "react-router-dom";
import { message } from "../types";
import Message from "../components/content/Message";

const Home = () => {
    const messages: message[] = (useLoaderData() as message[]) || [];
    return (
        <>
            <div className="w-full p-4 flex flex-col gap-1">
                {messages.map((m) => (
                    <Message key={m.id} />
                ))}
                {messages.map((m) => (
                    <Message key={m.id} />
                ))}
                {messages.map((m) => (
                    <Message key={m.id} />
                ))}
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
