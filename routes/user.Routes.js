const router = require("express").Router();
const ctrl = require("../controller/Usercontroller.js");

router.get("/", ctrl.getUsers);
router.get("/:id", ctrl.getUserById);
router.post("/", ctrl.createUser);

module.exports = router;
