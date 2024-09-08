import type { Response} from "./vite-env";

const prefix = "https://chatroom.zjuxlab.com";

export async function getFetcher(key: string) {
/*    const randomInt = Math.floor(Math.random() * 2) + 1;

    switch(key){
        
        case "/api/room/list":
            {
                if(randomInt === 1){
                    return{
                        rooms: [
                            {
                                roomId: 1,
                                roomName: "test1",
                                lastMessage: {
                                    messageId: 1001,
                                    roomId: 1,
                                    sender: "rwy",
                                    content: "it's a test",
                                    time: Date.now(),
                                },
                            },
                        ],
                    } satisfies RoomListRes
                }
                else if(randomInt === 2){
                    return{
                        rooms: [
                            {
                                roomId: 2,
                                roomName: "test2",
                                lastMessage: {
                                    messageId: 1002,
                                    roomId: 2,
                                    sender: "rwy",
                                    content: "it's another test",
                                    time: Date.now(),
                                },
                            },
                        ],
                    } satisfies RoomListRes
                }
            }
*/
            const resp = (await fetch(prefix + key, {mode : "cors"}).then((res) =>
                res.json()
            )) as Response<any>;
        
            if (resp.code !== 0) {
                throw new Error(resp.message + " " + resp.code);
            }
        
            return resp.data;  
}

export async function postFetcher(
    key: string,
    body: {arg: Record<string, unknown> | Array<unknown>}
) {
    const resp = (await fetch(prefix + key,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body.arg),
        mode : "cors",
    }).then((res) => res.json())) as Response<any>;

    if (resp.code !== 0) {
        throw new Error(resp.message + " " + resp.code);
    }

    return resp.data;
}

