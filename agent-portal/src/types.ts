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
    createdAt?: Date;
    role?: string;
    messages?: message[];
    loanLimit?: Number;
    availableLimit?: Number;
    employmentStatus?: string;
    profilePhotoPath?: string;
    phone?: string;
};
export type message = {
    _id: string;
    customerId?: string;
    customer?: user;
    createdAt?: Date;
    priority?: Number;
    category?: string;
    description?: string;
    isRead?: boolean;
    assigneeId?: string;
    assignee?: user;
    senderId?: string;
    sender?: user;
    attachmentPath?: string;
};
