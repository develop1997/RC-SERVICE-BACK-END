const express = require("express");
const router = express.Router();
const { validateUser } = require("../../validations/sesionValidations");
const sesionController = require("../../controllers/sesionController");
const Controller = new sesionController();

router.post("/", validateUser, Controller.createUser);
router.get("/", Controller.getUsersNoPassword);
router.get("/all", Controller.getUsers);
router.get("/email/:correo", Controller.getByCorreo);
router.post("/login", validateUser, Controller.login);
router.post("/:rol", validateUser, Controller.createUserWithRole);
router.get("/id/:id", Controller.getUserByID);
router.put("/:id", validateUser, Controller.editUser);
router.put("/password/:correo", Controller.editPassword);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
