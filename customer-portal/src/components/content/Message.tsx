import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
const Message = () => {
    return (
        <>
            <Alert color="success" icon={HiInformationCircle}>
                <span>
                    <p>
                        <span className="font-medium">Info alert!</span>
                        Change a few things up and try submitting again.
                    </p>
                </span>
            </Alert>
        </>
    );
};
export default Message;
