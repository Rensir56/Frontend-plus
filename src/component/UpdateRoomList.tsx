import useSWR from "swr";
import { fetcher } from "../util";
import { useEffect } from "react";
import { RoomListRes } from "../vite-env";

const updateRooms = (
  Rid: number,
  rooms: {
    rid: number;roomname: string;currentroomId: number;
    lastMessage: {
      messageId: number;roomId: number;sender: string;content: string;time: number;
    };
    deleteRoom: (id:number) => void; 
    getinto: (id:number) => void;
  }[],
  deleteRoom: (Rid: number) => void,
  getinto: (Rid: number) => void,
  setRid: (Rid: number) => void,
  setRooms: (rooms: {
    rid: number;roomname: string;currentroomId: number;
    lastMessage: {
      messageId: number;roomId: number;sender: string;content: string;time: number;
    };
    deleteRoom: (id:number) => void; 
    getinto: (id:number) => void;
  }[]) => void,
) => {
  
  //获取后端roomlist
  const {
    data: roomData,
    error: roomError,
    isLoading: roomIsLoading,
  } = useSWR<RoomListRes>("/api/room/list", fetcher,{
    refreshInterval: 1000,
  });

  useEffect(() => {    //用useEffect钩子函数检测roomData是否变化，若变化，说明获取了新数据，那么就进行操作
    let FLAG = 1;    //标志是否需要增加房间，若为1，说明有新的房间需要添加
    rooms.map((item: { rid: number | undefined; }) => {
      if (roomData?.rooms[0].roomId === item.rid) {  //检测获取的新数据是否是新的房间，如果是房间，则执行UpdateRooms更新房间
        FLAG = 0;
      }
    });

    if (FLAG === 1) {
      UpdateRooms();
      let maxRoomId = rooms.reduce((maxId:number, room:{  //用reduce方法检测获取数据前rooms数组内roomId的最大值
        rid: number;
        roomname: string;
        lastMessage: {
          messageId: number;
          roomId: number;
          sender: string;
          content: string;
          time: number;
        };
      }) => {
        return room.rid > maxId ? room.rid : maxId;
      }, 0);
      maxRoomId = maxRoomId > (roomData?.rooms[0].roomId || 0) ? maxRoomId : (roomData?.rooms[0].roomId || 0); //再与获取到的新数据的roomId比对，确定真正的最大roomId

      setRid(maxRoomId + 1);  //为本地添加房间准备好roomId
    }
  }, [roomData]);

  function UpdateRooms(){
    const newRoom = {
        rid: roomData?.rooms[0].roomId || 0,
        roomname: roomData?.rooms[0].roomName || "",
        currentroomId: 0,
        lastMessage: roomData?.rooms[0].lastMessage || { messageId: 0, roomId: 0, sender: "", content: "", time: 0 },
        deleteRoom: deleteRoom,
        getinto: getinto
      };
    setRooms([...rooms, newRoom]);
    localStorage.setItem('rooms', JSON.stringify([...rooms, newRoom]));
    setRid(Rid + 1);
  }
  //获取roomlist
}

export {updateRooms}