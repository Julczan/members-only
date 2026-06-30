const { Router } = require("express");
const {
  adminFormGet,
  adminFormPost,
} = require("../controllers/adminController");
const { isAuth, isMember } = require("./authMiddleware");

const adminRouter = Router();

adminRouter.get("/", isAuth, isMember, adminFormGet);
adminRouter.post("/", adminFormPost);

module.exports = adminRouter;
