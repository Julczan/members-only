const { Router } = require("express");
const { signUpFormGet } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/sign-up", signUpFormGet);

module.exports = indexRouter;
