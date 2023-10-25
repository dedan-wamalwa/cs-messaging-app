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
};

export type messageContextType = {
    userData: user;
    setUserData: React.Dispatch<React.SetStateAction<user>>;
};

export type Params = {
    id: string;
};
