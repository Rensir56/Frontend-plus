import "./ChatRoom.css"
import RoomEntry from "../../component/RoomEntry.tsx";
import MessageItem from "../../component/MessageItem.tsx";
import { getFetcher, postFetcher } from "../../util.ts";
import { KeyboardEvent, useEffect, useState,useRef } from "react";
import useSWR from "swr";
import  useSWRMutation  from 'swr/mutation';
import { RoomListRes, RoomMessageListRes } from "../../vite-env";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
    const Navigate = useNavigate();

    const [flag, setFlag] = useState(0)                              //当前是否进入一个房间的标志，为0说明未进入，为1说明已经进入
    let FLAG = 1
       
    const [currentRoomName, setCurrentRoomName] = useState("");
    const [currentRoomId, setCurrentRoomId] = useState(0);
    const [Rname, setRname] = useState("rwy");
    const [Mcontent, setMcontent] = useState("");

    const username = localStorage.getItem("username");

//获取roomlist
    const {
        data: roomData,
        //error: roomError,
        //isLoading: roomIsLoading,
    } = useSWR<RoomListRes>("/api/room/list", getFetcher,{
        refreshInterval: 1000,
    });

    console.log(roomData)

//add new room
    const {trigger: addTrigger, isMutating: isAdding} = useSWRMutation<
    {roomId: number},
    null,
    string,
    {
        user: string;
        roomName: string;
    }
    >("/api/room/add", postFetcher)

    async function HandleAddRoom() {
        setFlag(0);
        await addTrigger({user: username!, roomName: Rname});
    }
//

//delete room
    const {trigger: deleteTrigger, isMutating: isDeleting} = useSWRMutation<
    {code: number},
    null,
    string,
    {
        user: string;
        roomId: number;
    }
    >("/api/room/delete", postFetcher)

    //console.log("roomIsdeleting is", isDeleting)

    async function DeleteRoom(roomId: number) {
        FLAG =0
        await deleteTrigger({user: username!, roomId: roomId})      
    }

// 获取房间历史消息
    const {
        data: roomMessageData,
        //error: roomMessageError,
        //isLoading: roomMessageIsLoading,
    } = useSWR<RoomMessageListRes>(() => {
        if (currentRoomId === null) return false
        return "/api/room/message/list?roomId=" + currentRoomId;
    }, getFetcher,{
        refreshInterval: 1000,
    });

    const MessageFlag = roomMessageData?.messages.length

    //console.log("roomMessageData is ",roomMessageData)

    function JoinRoom(roomId: number) {
        const currentRoom = roomData?.rooms.find(item => item.roomId === roomId);      //用find方法找到被点击的房间
        console.log(roomData?.rooms)
        console.log("currentRoom is ",currentRoom)
        if (FLAG === 0){
            setCurrentRoomName("");
            //setFlag(1);
            FLAG = 1;
        }   
        else if(currentRoom) {
            setCurrentRoomName(currentRoom.roomName);
            setCurrentRoomId(currentRoom.roomId)
        }
    }
//

//发送消息
    const {trigger: SendTrigger, isMutating: isSending} = useSWRMutation<
    {code: number},
    null,
    string,
    {
        roomId: number;
        content: string;
        sender: string;
    }
    >("/api/message/add", postFetcher)

    async function SendMessage(){
        setMcontent("");
        await SendTrigger({roomId: currentRoomId, content: Mcontent, sender: username!})
    }
//

// //更新消息列表
//     const sinceMessageId = roomData?.rooms.find(item => item.roomId === currentRoomId)?.lastMessage;
//     const {
//         data: sinceMessageData,
//         error: sinceMessageError,
//         isLoading: sinceMessageIsLoading,
//     } = useSWR<RoomMessageListRes>(
//         () => {
//         if (currentRoomId === null) return false;
//         return `/api/room/message/getUpdate?roomId=${currentRoomId}&sinceMessageId=${sinceMessageId}`;
//         },
//         getFetcher,
//         {
//         refreshInterval: 1000,
//         }
//     );
    
//     console.log(sinceMessageData);
// //

//设置房间滚动
const messageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    if (messageRef.current){
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
},[MessageFlag,currentRoomId])
//

    function handlekeydown(e: KeyboardEvent<HTMLTextAreaElement>){  //快捷键设置
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        // 判断 ctrl+enter 换行
        if (ctrlKey && keyCode == 13) {
        //换行
        setMcontent(Mcontent + "\n");
        } else if (keyCode == 13) {
        // 阻止提交自动换行
        e.preventDefault();
        // 获取发送按钮id，调用 发送按钮事件
        SendMessage()
        }
    }

    function Back(){
        Navigate('/')
    }

    return(
        <>
            <div className="chat-room">
                <div className="list">
                    <div className="list-header">
                        <div className="welcome">Hello {username}!</div>
                        <button className="add-button" onClick={() => setFlag(1)} disabled={isAdding}>
                            <span className="plus-icon">+</span>
                        </button>
                    </div>
                    <div className="list-body" >
                    {roomData?.rooms&&roomData.rooms.map(item => (
                            <RoomEntry 
                                isMutating={isDeleting}
                                roomId={item.roomId} 
                                roomName={item.roomName} 
                                lastMessage={item.lastMessage}
                                deleteRoom={DeleteRoom}     
                                getinto={JoinRoom}   
                                currentroomId={currentRoomId}                    
                            />
                        ))} 
                    </div>
                </div>
                <div className="chat">
                    <div className="chat-header">
                        <div className="chat-cover">
                            <span className="chat-cover-icon">{currentRoomName.substring(0,1)}</span>
                        </div>
                        <p className="chat-room-name">{currentRoomName}</p>
                        <button onClick={Back} className="Back">Back</button>
                    </div>
                    <div className="chat-body" ref = {messageRef}>
                    {roomMessageData?.messages && roomMessageData.messages
                        .map(item => (
                            <MessageItem
                                isMutating={isSending}
                                messageId={item.messageId}
                                roomId={item.roomId}
                                sender={item.sender}
                                content={item.content}
                                time={item.time}
                                mode={item.sender === username}
                            />
                        ))}
                    </div>
                    <div className="chat-foot">
                        <textarea 
                            className="text-area"
                            value={Mcontent}
                            onKeyDown={(e) => handlekeydown(e)}
                            onChange={e => setMcontent(e.target.value)}
                            disabled={currentRoomName === ''}
                        /> 
                        <button className="send-button" onClick={SendMessage} disabled={currentRoomName === '' || Mcontent === ''}>发送</button>
                        <span className="tip">Enter 发送 Ctrl+Enter 换行</span>
                    </div>
                </div>
                {flag === 1 &&
                <div className="roomname-inputarea">
                    <button className="roomname-button" onClick={HandleAddRoom}>
                        <span> 创建房间!</span>
                    </button>
                    <input
                        className="roomname-input"
                        onChange={e => setRname(e.target.value)}
                        placeholder="please enter roomname"
                    />
                    <button className="delete-addroombutton" onClick={() => setFlag(0)}>
                        <span className="cross-icon">×</span>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default ChatRoom;