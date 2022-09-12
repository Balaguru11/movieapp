const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../verifyToken");

const {
  addNewMovie,
  editMovie,
  deleteMovie,
} = require("../../controller/userController");

router.use(verifyToken);

router.post("/movie", addNewMovie);
router.put("/movie/:movId", editMovie);
router.delete("/movie/:movId", deleteMovie);

// router.route("/movie/:movId").put(editMovie).delete(deleteMovie);

module.exports = router;
