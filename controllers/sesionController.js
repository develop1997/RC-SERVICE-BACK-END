/** @format */

const express = require("express");
const router = express.Router();
const { validateUser } = require("../validations/sesionValidations");
const queries = require("../queries/sesionQueries");
const { translateString } = require("../utils/Functions");

// Route to create a new user
router.post("/", validateUser, async (req, res) => {
	try {
		const newUser = await queries.createUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to get all users Without Passwords
router.get("/", async (req, res) => {
	try {
		const users = await queries.getAllUsersWithoutPasswords();
		res.status(200).json(users);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to get all users
router.get("/all", async (req, res) => {
	try {
		const users = await queries.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to get a user by their correo (email)
router.get("/email/:correo", async (req, res) => {
	try {
		const user = await queries.getUserByCorreo(req.params.correo);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to initiate a login session
router.post("/login", validateUser, async (req, res) => {
	try {
		const { correo, contraseña } = req.body;
		const user = await queries.getUserByCorreo(correo);

		if (!user || user.contraseña !== contraseña) {
			res.status(401).json({ message: "Credenciales Invalidas" });
			return;
		}

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to create a new user with a role
router.post("/:rol", validateUser, async (req, res) => {
	try {
		const { rol } = req.params;
		const newUser = await queries.createUserwithRol(req.body, rol);
		res.status(201).json(newUser);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to get a user by their ID
router.get("/id/:id", async (req, res) => {
	try {
		const user = await queries.getUserById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "Usuario no encontrado" });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to update a user by their ID
router.put("/:id", validateUser, async (req, res) => {
	try {
		let { data, rol } = req.body;
		const updatedUser = await queries.updateUser(req.params.id, data, rol);
		if (!updatedUser) {
			res.status(404).json({ message: "Usuario no encontrado" });
			return;
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to update a user's password by their email
router.put("/password/:correo", async (req, res) => {
	try {
		const { nuevaContraseña } = req.body;
		const correo = req.params.correo;
		const updatedUser = await queries.updatePasswordByEmail(
			correo,
			nuevaContraseña
		);
		if (!updatedUser) {
			res.status(404).json({ message: "Usuario no encontrado" });
			return;
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Route to delete a user by their ID
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await queries.deleteUser(req.params.id);
		if (!deletedUser) {
			res.status(404).json({ message: "Usuario no encontrado" });
			return;
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});


module.exports = router;
