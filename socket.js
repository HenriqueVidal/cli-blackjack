import { io } from "socket.io-client";
import "dotenv/config";

const { SERVER_URL } = process.env; 
const socket = io("ws://"+SERVER_URL, { 
    forceNew : false,
    reconnectionAttempts: Infinity, 
    timeout : 50000,  
    reconnectionDelayMax: 10000
});
export default socket;