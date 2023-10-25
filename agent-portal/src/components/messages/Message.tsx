import { Avatar } from "flowbite-react";
interface MyComponentProps {
    profilePhotoPath?: string;
    senderName?: string;
    description?: string;
    time?: string;
}
const Message = (props: MyComponentProps) => {
    return (
        <>
            <div className="flex gap-1">
                <Avatar alt="avatar of Jese" img={props.profilePhotoPath} rounded className="shrink-0" />
                <div className="max-w-xl truncate">
                    <div>
                        <small className="">{props.senderName}</small>
                    </div>
                    <span className="font-medium text-gray-900">{props.description}</span>
                </div>
                <div className="flex items-end">
                    <small>{props.time}</small>
                </div>
            </div>
        </>
    );
};
export default Message;
