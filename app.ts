import app = require("teem");
import path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

app.run({
	// Configurações de acesso ao banco de dados.
	// Mais informações: https://www.npmjs.com/package/mysql2#using-connection-pools
	sqlConfig: {
		connectionLimit: 30,
		waitForConnections: true,
		charset: "utf8mb4",
		host: process.env.host,
		port: parseInt(process.env.port),
		user: process.env.user,
		password: process.env.password,
		database: process.env.database
	}
});
