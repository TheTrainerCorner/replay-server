import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
	uri: process.env.MONGODB_CONNECT_URI as string,
}));