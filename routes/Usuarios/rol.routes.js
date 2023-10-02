const express = require("express");
const {
	validatePermiso,
	validateRole,
	validateAssignPermisoToUser,
	validateAssignRoleToUser,
} = require("../../validations/sesionValidations");
const rolController = require("../../controllers/rolController");
const router = express.Router();
const Controller = new rolController();

router.get("/roles", Controller.getRoles.bind());
router.get("/permisos", Controller.getPermision.bind());
router.get("/lista-roles-usuarios", Controller.getUserRolesList.bind());
router.get("/permision/:id/users", Controller.getUsuariosWithPermision.bind());
router.get(
	"/lista-permisos-usuarios",
	Controller.getUsuariosPermisosList.bind()
);
router.post("/roles", validateRole, Controller.createRol.bind());
router.post("/permisos", validatePermiso, Controller.createPermision.bind());
router.post(
	"/usuarios/:id_usuario/permisos/:id_permiso",
	validateAssignPermisoToUser,
	Controller.givePermisionToUser.bind()
);
router.post(
	"/usuarios/:id_usuario/roles/:roleId",
	validateAssignRoleToUser,
	Controller.giveRoleToUser.bind()
);
router.delete(
	"/usuarios/:userId/permisos/:permisoId",
	Controller.removePermision.bind()
);
router.delete("/usuarios/:userId/roles", Controller.revokeRoleFromUser.bind());
router.get("/usuarios/:userId/permisos", Controller.getPermisosfromUser.bind());
router.get("/role/:id", Controller.getRolByID.bind());
router.put("/role/:id", validateRole, Controller.editRole.bind());
router.get("/permision/:id", Controller.editPermision.bind());
router.put("/permision/:id", validatePermiso, Controller.getPermisoByID.bind());
router.delete("/role/:id", Controller.deleteRole.bind());
router.delete("/permiso/:id", Controller.deletePermision.bind());

module.exports = router;
