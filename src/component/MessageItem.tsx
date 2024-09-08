import { MessageProps } from "../vite-env";
import convertTimestampToTimeString from "./convertTimestampToTimeString";

function MessageItem (props:MessageProps){
    let sender = props.sender
    let time = props.time
    let title = sender.substring(0, 1)
    const timeString = convertTimestampToTimeString(time, Date.now(),1);
    sender = sender + " " + timeString
    if(props.mode === true){
        return(
            <>
                <div className="Message">
                    <div className="sender-cover">
                        <span className="sender-cover-title">{title}</span>
                    </div>
                    <div className="McontentWrapper">
                        <span className="sender-name">{sender}</span>
                        <div className="Mcontent1"> 
                            <span>{props.content} </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return(
            <>
                <div className="Message">
                    <div className="sender-cover">
                        <span className="sender-cover-title">{title}</span>
                    </div>
                    <div className="McontentWrapper">
                        <span className="sender-name">{sender}</span>
                        <div className="Mcontent0"> 
                            <span>{props.content} </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MessageItem