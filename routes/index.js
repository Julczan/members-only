const { Router } = require("express");
const {
  signUpFormGet,
  signUpFormPost,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/sign-up", signUpFormGet);
indexRouter.post("/sign-up", signUpFormPost);

module.exports = indexRouter;
