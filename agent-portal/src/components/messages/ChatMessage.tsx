import { Avatar } from "flowbite-react";
interface MyComponentProps {
    profilePhotoPath?: string;
    senderName?: string;
    description?: string;
    time?: string;
}
function ChatMessage(props: MyComponentProps) {
    return (
        <div className="flex gap-1 ">
            <Avatar alt="avatar of Jese" img={props.profilePhotoPath} rounded className="shrink-0" />
            <div className="max-w-3/4">
                <div className="flex gap-1">
                    <div>
                        <small className="">{props.senderName}</small>
                    </div>
                    <div>
                        <small>{props.time}</small>
                    </div>
                </div>
                <div className="font-medium text-gray-800">{props.description}</div>
            </div>
        </div>
    );
}
export default ChatMessage;
