const Router = require("express").Router();
const PostService = require("../Services/postService");
const Models = require("../Models/tables");
const { setDefQueryParams } = require("../Utils");

Router.get("/boardlist", async (req, res, next) => {
  try {
    const result = await Models.board.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json({ success: true, response: result });
  } catch (error) {
    next(error);
  }
});

Router.get(
  "/:boardId/posts",
  setDefQueryParams({
    limit: 5,
  }),
  PostService.getPostsByBoard,
);

module.exports = Router;
