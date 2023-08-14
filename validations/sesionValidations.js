/** @format */

const Joi = require("joi");

const validatePermiso = (req, res, next) => {
	const schema = Joi.object({
		permiso: Joi.string().trim().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

const validateRole = (req, res, next) => {
	const schema = Joi.object({
		nombreRol: Joi.string().trim().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

const validateUser = (req, res, next) => {
	const schema = Joi.object({
		correo: Joi.string().email().required(),
		contraseña: Joi.string().required()
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

const validateAssignPermisoToUser = (req, res, next) => {
	const schema = Joi.object({
		id_usuario: Joi.string().required(),
		id_permiso: Joi.string().required(),
	});

	const { error } = schema.validate(req.params);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

const validateAssignRoleToUser = (req, res, next) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		roleId: Joi.string().required(),
	});

	const { error } = schema.validate(req.params);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

module.exports = {
	validatePermiso,
	validateRole,
	validateUser,
	validateAssignPermisoToUser,
	validateAssignRoleToUser,
};
