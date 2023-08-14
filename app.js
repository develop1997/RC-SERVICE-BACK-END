/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
const sesionController = require("./controllers/sesionController");
const rolController = require("./controllers/rolController");
const enviarMensaje = require("./whatsappAPI");

// Middleware para eliminar el encabezado "X-Powered-By"
app.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	next();
});

app.use(cors());
app.use(express.json());

app.use("/users", sesionController);

app.use("/admin-rol", rolController);

app.get("/", (req, res) => {
	res.send("Welcome to the app");
});

// Endpoint para enviar mensajes
app.post("/send-message", async (req, res) => {
	const { phoneNumber, message } = req.body;
	if (!phoneNumber || !message) {
		return res
			.status(400)
			.json({ error: "Both phoneNumber and message are required." });
	}
	try {
		await enviarMensaje(phoneNumber, message);
		return res.status(200).json({ success: true });
	} catch (error) {
		return res
			.status(500)
			.json({ error: "An error occurred while sending the message." });
	}
});

// 404 Route
app.use((req, res, next) => {
	res.status(404).send("404 Page Not Found");
});

module.exports = app;
