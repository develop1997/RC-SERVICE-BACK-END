/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
const sesionController = require("./controllers/sesionController");
const rolController = require("./controllers/rolController");
const countriesController = require("./controllers/coutriesController");
const enviarMensaje = require("./whatsappAPI");

// Middleware to remove "X-Powered-By" header
app.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	next();
});

app.use(cors());
app.use(express.json());

// Use session controller for /users routes
app.use("/users", sesionController);

// Use countries controller for /countries routes
app.use("/countries", countriesController);

// Use role controller for /admin-rol routes
app.use("/admin-rol", rolController);

// Welcome message for root endpoint
app.get("/", (req, res) => {
	res.send("Welcome to the app");
});

// Endpoint to send messages to WhatsApp
app.post("/send-message", async (req, res) => {
	const { phoneNumber, message } = req.body;
	if (!phoneNumber || !message) {
		return res
			.status(400)
			.json({ error: "Both phoneNumber and message are required." });
	}

	let sent = await enviarMensaje(phoneNumber, message);

	if (sent) {
		res.status(200).json({ success: true });
	} else {
		res.status(500).json({
			error: "An error occurred while sending the message.",
		});
	}
});

// 404 Route
app.use((req, res, next) => {
	res.status(404).send("404 Page Not Found");
});

module.exports = app;
