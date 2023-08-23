/** @format */

const rolQueries = require("../queries/rolQueries");
const express = require("express");
const {
	validatePermiso,
	validateRole,
	validateAssignPermisoToUser,
	validateAssignRoleToUser,
} = require("../validations/sesionValidations");
const translateString = require("../utils/Functions");
const router = express.Router();

// Ruta para obtener todos los roles
router.get("/roles", async (req, res) => {
	try {
		const roles = await rolQueries.getAllRoles();
		res.status(200).json(roles);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para obtener todos los permisos
router.get("/permisos", async (req, res) => {
	try {
		const permisos = await rolQueries.getAllPermisos();
		res.status(200).json(permisos);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

router.get("/lista-roles-usuarios", async (req, res) => {
	try {
		const listaRolesUsuarios = await rolQueries.getListaRolesUsuarios();
		res.status(200).json(listaRolesUsuarios);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

router.get("/lista-permisos-usuarios", async (req, res) => {
	try {
		const listaPermisosUsuarios =
			await rolQueries.getListaPermisosUsuarios();
		res.status(200).json(listaPermisosUsuarios);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para crear un nuevo rol
router.post("/roles", validateRole, async (req, res) => {
	try {
		const newRole = await rolQueries.createRole(req.body);
		res.status(201).json(newRole);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para crear un nuevo permiso
router.post("/permisos", validatePermiso, async (req, res) => {
	try {
		const newPermiso = await rolQueries.createPermiso(req.body);
		res.status(201).json(newPermiso);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para asignar un permiso a un usuario
router.post(
	"/usuarios/:id_usuario/permisos/:id_permiso",
	validateAssignPermisoToUser,
	async (req, res) => {
		try {
			const rolesPermisos = await rolQueries.assignPermisoToUser(
				req.params.id_usuario,
				req.params.id_permiso
			);
			res.status(201).json(rolesPermisos);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}
);

// Ruta para asignar un rol a un usuario
router.post(
	"/usuarios/:id_usuario/roles/:roleId",
	validateAssignRoleToUser,
	async (req, res) => {
		try {
			const user = await rolQueries.assignRoleToUser(
				req.params.id_usuario,
				req.params.roleId
			);
			res.status(200).json(user);
		} catch (error) {
			let translatedError = await translateString(error.message);
			res.status(500).json({ error: translatedError });
		}
	}
);

// Ruta para revocar un permiso de un usuario
router.delete("/usuarios/:userId/permisos/:permisoId", async (req, res) => {
	try {
		const deletedRolesPermisos = await rolQueries.revokePermisoFromUser(
			req.params.userId,
			req.params.permisoId
		);
		res.status(200).json(deletedRolesPermisos);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para revocar un rol de un usuario
router.delete("/usuarios/:userId/roles", async (req, res) => {
	try {
		const user = await rolQueries.revokeRoleFromUser(req.params.userId);
		res.status(200).json(user);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

// Ruta para obtener todos los permisos de un usuario
router.get("/usuarios/:userId/permisos", async (req, res) => {
	try {
		const permisos = await rolQueries.getAllPermisosByUser(
			req.params.userId
		);
		res.status(200).json(permisos);
	} catch (error) {
		let translatedError = await translateString(error.message);
		res.status(500).json({ error: translatedError });
	}
});

module.exports = router;
