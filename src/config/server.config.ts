import { registerAs } from "@nestjs/config";

export default registerAs('server', () => ({
	port: process.env.REPLAY_SERVER_PORT || 3000,
	host: process.env.REPLAY_SERVER_HOST || "http://localhost:3000",
}));