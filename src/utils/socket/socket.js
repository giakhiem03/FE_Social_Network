import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"], // Đảm bảo hỗ trợ cả WebSocket & polling
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

socket.on("connection", () => {
    console.log("✅ Connected to WebSocket:", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("❌ WebSocket connection error:", err);
});

export default socket;
