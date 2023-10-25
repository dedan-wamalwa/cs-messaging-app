import { Card, Textarea, Modal, Dropdown } from "flowbite-react";
import ChatMessage from "../components/messages/ChatMessage";
import { useLoaderData, useParams } from "react-router-dom";
import { message, user, Params } from "../types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
const ChatBox = () => {
    const messages: message[] = (useLoaderData() as message[]) || [];
    const { id } = useParams();

    const [description, setDescription] = useState<string>();

    const [customerData, setCustomerData] = useState<user | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    useEffect(() => {
        const getCustomerDetails = async (): Promise<void> => {
            setLoading(true);
            try {
                const url = import.meta.env.VITE_PUBLIC_API_HOST;
                const response = await fetch(`${url}/api/users/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCustomerData(data);
                    setLoading(false);
                }
                if (response.status === 401) {
                    throw new Error("user does not exist");
                }
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
                throw error;
            }
        };
        getCustomerDetails();
    }, []);

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
            customer: id,
            attachmentPath: "",
            isCustomerMessage: false,
        };
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
            setDescription("");
        } catch (error: any | unknown) {
            console.error("Error:", error.message);
            throw error;
        }
    };

    const getSenderName = (sender: user) => {
        return sender.name;
    };
    const getProfilePath = (sender: user) => {
        return sender.profilePhotoPath;
    };
    const getDateTime = (date: string) => {
        return dayjs(date).format("MMM D h:mm A");
    };
    return (
        <div>
            <Card className="px-4 flex flex-col">
                <div className="ml-1">
                    <button onClick={() => props.setOpenModal("default")}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                    </button>
                </div>
                {messages.map((message) => (
                    <ChatMessage
                        profilePhotoPath={getProfilePath(message.sender as user)}
                        senderName={getSenderName(message.sender as user)}
                        description={message.description}
                        time={getDateTime(message.createdAt as string)}
                        key={message._id}
                    />
                ))}
                <form className="mt-auto flex flex-col gap-2" onSubmit={(event) => event.preventDefault()}>
                    <div className="flex gap-1 max-w-lg" id="textarea">
                        <Textarea
                            id="comment"
                            placeholder="Write your message here..."
                            required
                            rows={2}
                            value={description}
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
            </Card>

            {/* modal */}
            <Modal dismissible show={props.openModal === "default"} onClose={() => props.setOpenModal(undefined)} size={"md"}>
                <Modal.Header className="py-3">Customer Profile</Modal.Header>
                <Card className="rounded-t-none">
                    <div className="flex justify-end px-4 pt-0">
                        <Dropdown inline label="">
                            <DropdownItem>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    href="#"
                                >
                                    <p>Edit</p>
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    href="#"
                                >
                                    <p>Loans</p>
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    href="#"
                                >
                                    <p>Transactions</p>
                                </a>
                            </DropdownItem>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img
                            className="w-36 h-36 mb-3 rounded-full shadow-lg"
                            src={customerData?.profilePhotoPath}
                            alt={customerData?.name}
                        />
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">{customerData?.name}</h5>
                        <span className="text-md text-gray-700 dark:text-gray-700 font-medium">{customerData?.email}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Joined : {dayjs(customerData?.createdAt).format("MMM D YYYY")}{" "}
                        </span>
                        <div className="flex space-x-3">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Phone:</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {customerData?.phone}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Loan Limit:</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {customerData?.loanLimit?.toLocaleString()}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Available Limit:</p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {customerData?.availableLimit?.toLocaleString()}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};

export const customerMessagesLoader = async ({ params }: { params: Params }) => {
    const api = import.meta.env.VITE_PUBLIC_API_HOST;
    const { id } = params;
    try {
        const response = await fetch(`${api}/api/messages/customer/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export default ChatBox;
