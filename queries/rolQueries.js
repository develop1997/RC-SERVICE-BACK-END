/** @format */

const db = require("../db/dbConfig");

/**  Obtener todos los roles*/
async function getAllRoles() {
	try {
		const roles = await db.Role.find();
		return roles;
	} catch (error) {
		throw error;
	}
}

/** Obtener todos los permisos*/
async function getAllPermisos() {
	try {
		const permisos = await db.Permiso.find();
		return permisos;
	} catch (error) {
		throw error;
	}
}

/** Crear un nuevo rol*/
async function createRole(data) {
	try {
		const newRole = await db.Role.create(data);
		return newRole;
	} catch (error) {
		throw error;
	}
}

/** Crear un nuevo permiso*/
async function createPermiso(data) {
	try {
		const newPermiso = await db.Permiso.create(data);
		return newPermiso;
	} catch (error) {
		throw error;
	}
}

/** Asignar un permiso a un usuario específico */
async function assignPermisoToUser(userId, permisoId) {
	try {
		const user = await db.User.findById(userId);
		const permiso = await db.Permiso.findById(permisoId);

		if (!user || !permiso) {
			throw new Error("User or permiso not found");
		}

		const rolesPermisos = await db.RolesPermisos.create({
			id_usuario: user._id,
			id_permiso: permiso._id,
		});

		return rolesPermisos;
	} catch (error) {
		throw error;
	}
}

/** Revocar un permiso de un usuario específico */
async function revokePermisoFromUser(userId, permisoId) {
	try {
		const deletedRolesPermisos = await db.RolesPermisos.findOneAndDelete({
			id_usuario: userId,
			id_permiso: permisoId,
		});

		if (!deletedRolesPermisos) {
			throw new Error("User or permiso not found");
		}

		return deletedRolesPermisos;
	} catch (error) {
		throw error;
	}
}

/** Asignar un rol a un usuario*/
async function assignRoleToUser(userId, roleId) {
	try {
		const user = await db.User.findById(userId);
		const role = await db.Role.findById(roleId);

		if (!user || !role) {
			throw new Error("User or role not found");
		}

		user.rol = role._id;
		await user.save();

		return user;
	} catch (error) {
		throw error;
	}
}

/** Desasignar un rol de un usuario*/
async function revokeRoleFromUser(userId) {
	try {
		const user = await db.User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		user.rol = null;
		await user.save();

		return user;
	} catch (error) {
		throw error;
	}
}

/** Obtener todos los permisos de un usuario */
async function getAllPermisosByUser(userId) {
	try {
		const rolesPermisos = await db.RolesPermisos.find({
			id_usuario: userId,
		}).populate("id_permiso");
		const permisos = rolesPermisos.map((rp) => rp.id_permiso);
		return permisos;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllRoles,
	getAllPermisos,
	createRole,
	createPermiso,
	assignPermisoToUser,
	revokePermisoFromUser,
	assignRoleToUser,
	revokeRoleFromUser,
	getAllPermisosByUser,
};
