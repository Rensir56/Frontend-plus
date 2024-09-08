/// <reference types="vite/client" />

export interface RoomEntryProps {
    isMutating: boolean;
    roomId: number;
    roomName: string;
    lastMessage: MessageProps | null;
    currentroomId: number;
    deleteRoom: (id:number) => void;
    getinto: (id:number) => void;
}

export interface MessageProps {
    isMutating: boolean;
    messageId: number;
    roomId: number;
    sender: string;
    content: string;
    time: number;
    mode: boolean;
}

export interface Response<T> {
    message: string;
    code: number;
    data: T | null;
}

export interface RoomMessageListRes{
    messages: Message[];
}

export interface RoomListRes{
    rooms: RoomPreviewInfo[];
}