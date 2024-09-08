import { RoomEntryProps } from "../vite-env";
import convertTimestampToTimeString from "./convertTimestampToTimeString";

function RoomEntry(props: RoomEntryProps) {
    let roomname = props.roomName;
    if(roomname === '')
        return;
    if(roomname.length > 9)
        roomname = roomname.substring(0, 8) + '……'
    let title = roomname.substring(0, 1)
    let latestMessage = props.lastMessage
    let latestMessageContent = latestMessage? props.lastMessage?.content : '';
    latestMessageContent = latestMessage?.sender + ": " + latestMessageContent
    if(latestMessageContent.length > 16)
        latestMessageContent = latestMessageContent.substring(0, 15) + '……'
    if(latestMessageContent === "undefined: ")
        latestMessageContent = '';
    let latestTime = latestMessage?.time || 0;
    const timeString = convertTimestampToTimeString(latestTime, Date.now(),0);

    return (
        <>  
            <div className={props.currentroomId === props.roomId ? 'selected' : 'room'} onClick={() => props.getinto(props.roomId)}>
                <div className="room-cover">
                    <span className="room-cover-title">{title}</span>
                </div>
                <div className="overview">
                    <span className="room-name">{roomname}</span>
                    <span className="latest-message">{latestMessageContent}</span>
                </div>
                <div className="time#delete">
                    <p className="time">{timeString}</p>
                    <button className="delete-button" onClick={() => props.deleteRoom(props.roomId)} disabled={props.isMutating}>
                        <span className="cross-icon">×</span>
                    </button>
                </div>
            </div>
            {/* <div className="container">
                <div className="radio-wrapper">
                    <input type="radio" id="value-1" name="btn" className="input"></input>
                    <div className="btn">
                        <span className='words' >_Cyber</span>
                        <span className="btn__glitch">_Cyber</span>
                        <label className="number">r1</label>
                    </div>
                </div>
                <div className="radio-wrapper">
                    <input type="radio" checked={true} id="value-2" name="btn" className="input"></input>
                    <div className="btn">
                        _Radio<span >_</span>
                        <span  className="btn__glitch">_R_a_d_i_o_</span>
                        <label className="number">r2</label>
                    </div>
                </div>
                <div className="radio-wrapper">
                    <input type="radio" id="value-3" name="btn" className="input"></input>
                    <div className="btn">
                        Buttons<span ></span>
                        <span  className="btn__glitch">Buttons_</span>
                        <label className="number">r3</label>
                    </div> 
                </div>
                <div className="radio-wrapper">
                    <input type="radio" id="value-4" name="btn" className="input"></input>
                    <div className="btn">
                        Test_<span ></span>
                        <span  className="btn__glitch">Test_</span>
                        <label className="number">r4</label>
                    </div> 
                </div>
            </div> */}
        </>
    )
}

export default RoomEntry;