import { useLoaderData, useParams } from "react-router-dom";
const MessageDetails = () => {
    const message = useLoaderData();

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="px-4 md:px-32">
            <div>Chats Details</div>
        </div>
    );
};

export const messageDetailsLoader = async () => {
    const { id } = useParams();
    const api = import.meta.env.VITE_PUBLIC_API_HOST;
    const response = await fetch(`${api}/api/messages/${id}`);
    return response.json();
};

export default MessageDetails;
