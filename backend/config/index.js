const config = {
	db: {
		string: process.env.DB_CONNECT_STRING || "mongodb://127.0.0.1:27017/GenshinShopVN",
	},
	jwt: {
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access_token",
	},
};
module.exports = config;
