/** @format */

const express = require("express");
const router = express.Router();
const { validateUser } = require("../validations/sesionValidations");
const queries = require("../queries/sesionQueries");

// Route to create a new user
router.post("/", validateUser, async (req, res) => {
	try {
		const newUser = await queries.createUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to get all users Without Passwords
router.get("/", async (req, res) => {
	try {
		const users = await queries.getAllUsersWithoutPasswords();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to get all users
router.get("/all", async (req, res) => {
	try {
		const users = await queries.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to get a user by their correo (email)
router.get("/:correo", async (req, res) => {
	try {
		const user = await queries.getUserByCorreo(req.params.correo);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to initiate a login session
router.post("/login", validateUser, async (req, res) => {
	try {
		const { correo, contraseña } = req.body;
		const user = await queries.getUserByCorreo(correo);

		if (!user || user.contraseña !== contraseña) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to get a user by their ID
router.get("/:id", async (req, res) => {
	try {
		const user = await queries.getUserById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to update a user by their ID
router.put("/:id", validateUser, async (req, res) => {
	try {
		const updatedUser = await queries.updateUser(req.params.id, req.body);
		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to delete a user by their ID
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await queries.deleteUser(req.params.id);
		if (!deletedUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
