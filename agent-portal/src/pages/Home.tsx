import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { message, user, ServerToClientEvents, ClientToServerEvents } from "../types";
import { useEffect, useState } from "react";
import { Table, TextInput } from "flowbite-react";
import Message from "../components/messages/Message";
import { io, Socket } from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ENDPOINT = import.meta.env.VITE_PUBLIC_API_HOST;
var socket: Socket<ServerToClientEvents, ClientToServerEvents>;
const Home = () => {
    const navigate = useNavigate();
    const _messages: message[] = (useLoaderData() as message[]) || [];
    const storedData = localStorage.getItem("userInfo");
    const userDetails = JSON.parse(storedData as string);
    const [messages, setMessages] = useState<message[]>(_messages);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (!storedData) {
            navigate("/sign_in");
        }
    }, []);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", userDetails);
        socket.on("connection", () => {
            setSocketConnected(true);
        });
        socket.emit("agentLogIn", userDetails._id);
    }, []);

    const calculateRelativeTime = (date: string) => {
        const now = dayjs();
        const targetDate = dayjs(date);
        return now.to(targetDate);
    };
    const getSenderName = (sender: user) => {
        return sender.name;
    };
    const getProfilePath = (sender: user) => {
        return sender.profilePhotoPath;
    };
    const getCustomerId = (customer: user) => {
        return customer._id;
    };
    useEffect(() => {
        socket.on("customerMessageReceived", (newMessageRecieved: message) => {
            if (newMessageRecieved.isCustomerMessage) {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });
    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Messages</Table.HeadCell>
                </Table.Head>
                <TextInput
                    id="base"
                    sizing="md"
                    type="email"
                    placeholder="Search"
                    className="px-5 md:w-3/4"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Table.Body className="divide-y">
                    {messages
                        .filter((message) => {
                            return search.toLocaleLowerCase() === ""
                                ? message
                                : getSenderName(message.sender as user)
                                      ?.concat((" " + message.description) as string)
                                      .toLocaleLowerCase()
                                      .includes(search.toLocaleLowerCase());
                        })
                        .map((message) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={message._id}>
                                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                                    <Link to={`chats/${getCustomerId(message.customer as user)}`} state={{ messageId: message._id }}>
                                        <Message
                                            profilePhotoPath={getProfilePath(message.sender as user)}
                                            senderName={getSenderName(message.sender as user)}
                                            description={message.description}
                                            time={calculateRelativeTime(message.createdAt as string)}
                                        />
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
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
