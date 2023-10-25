import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface MessageProps {
    img: string;
    alt: string;
    sender: string;
    description: string;
    time: string;
}
const Message = (props: MessageProps) => {
    const calculateRelativeTime = (date: string) => {
        const now = dayjs();
        const targetDate = dayjs(date);
        return now.to(targetDate);
    };
    return (
        <>
            <li className="py-1 rounded-md m-1 bg-sky-200 shadow">
                <div className="flex space-x-1">
                    <div className="shrink-0">
                        <img className="w-4 h-4 rounded-full" src={props.img} alt={props.alt} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                            {props.sender} <span className="font-normal text-gray-600 ml-3">{calculateRelativeTime(props.time)}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{props.description}</p>
                    </div>
                </div>
            </li>
        </>
    );
};
export default Message;
