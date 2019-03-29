export interface IHelloWorldData{
    status:string;
    count?:number;
}

export const RECEIVE_HELLOWORLD = "RECEIVE_HELLOWORLD";

export function receiveHelloWorldData(data:IHelloWorldData){
    return {
        type:RECEIVE_HELLOWORLD,
        data
    }
}