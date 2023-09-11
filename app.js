/** @format */

const express = require("express");
const db = require("./db/dbConfig");
const cors = require("cors");
const app = express();
const sesionController = require("./controllers/sesionController");
const rolController = require("./controllers/rolController");
const countriesController = require("./controllers/coutriesController");
const { enviarMensajeWhatsapp, enviarCorreo } = require("./InfoSender");

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
		return res.status(400).json({
			error: "Faltan datos, debe enviarse el telefono y el mensaje.",
		});
	}

	let sent = await enviarMensajeWhatsapp(phoneNumber, message);

	if (sent) {
		res.status(200).json({ success: true });
	} else {
		res.status(500).json({
			error: "Ocurrió un error mientras se enviaba el mensaje",
		});
	}
});

// Endpoint to send messages to email
app.post("/send-email", async (req, res) => {
	const { email, titulo, message } = req.body;
	if (!email || !titulo || !message) {
		return res.status(400).json({
			error: "Faltan datos, debe enviarse el correo, el titulo y el mensaje",
		});
	}

	let user = await db.User.findOne({ correo: email });

	if (user) {
		let sent = await enviarCorreo(email, message, titulo);

		if (sent) {
			res.status(200).json({ success: true });
		} else {
			res.status(500).json({
				error: "Ocurrió un error mientras se enviaba el correo",
			});
		}
	} else {
		res.status(500).json({
			error: "El correo no esta registrado",
		});
	}
});

// 404 Route
app.use((req, res, next) => {
	res.status(404).send("404 Ruta no encontrada");
});

module.exports = app;
