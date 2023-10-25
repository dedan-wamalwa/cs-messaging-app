import React, { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { messageContextType, user } from "../types";

const MessageContext = createContext<messageContextType | undefined>(undefined);

const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<user>({ _id: "000000000000000000000000" });
    const storedData = localStorage.getItem("userInfo");
    useEffect(() => {
        const userInfo = storedData ? JSON.parse(storedData) : user;
        setUser(userInfo);
    }, [storedData]);

    return <MessageContext.Provider value={{ user, setUser }}>{children}</MessageContext.Provider>;
};

export const MessageState = () => {
    return useContext(MessageContext);
};

export default MessageProvider;
