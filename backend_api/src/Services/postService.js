const Models = require("../Models/tables");
const { Op } = require("sequelize");

module.exports.getPostListByUser = async userId => {
  const result = await Models.post.findAll({
    where: { userId },
    attributes: ["title"]
  });
  return result;
};

module.exports.getPostDetail = async req => {
  const result = await Models.post.findOne({
    include: [
      {
        model: Models.user,
        attributes: ["userName"]
      }
    ],
    where: { id: req.params.pid },
    attributes: ["id", "title", "content", "updatedAt"]
  });
  return result;
};

module.exports.getPostList = async req => {
  const offset = 5 * (req.params.page - 1);
  const result = await Models.post.findAll({
    include: [
      {
        model: Models.user,
        attributes: ["userName"]
      }
    ],
    offset,
    limit: 5,
    attributes: ["id", "title", "content", "updatedAt"]
  });
  return result;
};
[{ name: "tag2" }];

module.exports.createPost = async req => {
  const existTags = await Models.hashtag.findAll({
    where: {
      name: { [Op.in]: [...req.body.hashtags.map(_ => _.name)] }
    },
    attributes: ["id", "name"]
  });

  const result = await Models.post.create(
    {
      userId: req.user.id,
      title: req.body.title,
      content: [...req.body.content],
      hashtags: existTags.map(_ => _.dataValues.name).length
        ? req.body.hashtags.filter(_ => {
            const ss = existTags.map(_ => _.dataValues.name);
            return !ss.includes(_.name);
          })
        : req.body.hashtags
    },
    {
      include: [
        {
          model: Models.hashtag
        }
      ]
    }
  );

  if (existTags.length) {
    result.addHashtag(existTags.map(({ dataValues }) => dataValues.id));
  }
  return result;
};

module.exports.updatePost = async req => {
  const result = await Models.post.update(
    {
      title: req.body.title,
      content: [...req.body.content]
    },
    {
      where: { id: req.body.pid }
    }
  );
  return result;
};

module.exports.deletePost = async req => {
  const result = await Models.post.destroy({
    where: { id: req.body.pid }
  });
  return result;
};
