export type chat = {
    isGroupChat?: boolean;
    users?: user[];
    _id: string;
    chatName?: string;
};
export type user = {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    role?: string;
    messages?: message[] | string[];
    loanLimit?: Number;
    availableLimit?: Number;
    employmentStatus?: string;
    profilePhotoPath?: string;
    phone?: string;
};
export type message = {
    _id: string;
    customer?: user | string;
    createdAt?: string;
    priority?: Number;
    category?: string;
    description?: string;
    isRead?: boolean;
    assignee?: user | string;
    sender?: user | string;
    attachmentPath?: string;
    isCustomerMessage?: boolean;
};

export type messageContextType = {
    user: user;
    setUser: React.Dispatch<React.SetStateAction<user>>;
};

export type Params = {
    id: string;
};

// socket.io types
export type ServerToClientEvents = {
    connection: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    messageReceived: (messageReceived: message) => void;
    customerMessageReceived: (customerMessage: message) => void;
};

export type ClientToServerEvents = {
    setup: (user: user) => void;
    joinChat: (customerId: string) => void;
    newMessage: (messageSent: message) => void;
    agentLogIn: (agentId: string) => void;
};
