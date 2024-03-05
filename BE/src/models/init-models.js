import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comment from  "./comment.js";
import _picture from  "./picture.js";
import _savePicture from  "./savePicture.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const comment = _comment.init(sequelize, DataTypes);
  const picture = _picture.init(sequelize, DataTypes);
  const savePicture = _savePicture.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  picture.belongsToMany(user, { as: 'userId_users', through: savePicture, foreignKey: "pictureId", otherKey: "userId" });
  user.belongsToMany(picture, { as: 'pictureId_pictures', through: savePicture, foreignKey: "userId", otherKey: "pictureId" });
  comment.belongsTo(picture, { as: "picture", foreignKey: "pictureId"});
  picture.hasMany(comment, { as: "comments", foreignKey: "pictureId"});
  savePicture.belongsTo(picture, { as: "picture", foreignKey: "pictureId"});
  picture.hasMany(savePicture, { as: "savePictures", foreignKey: "pictureId"});
  comment.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(comment, { as: "comments", foreignKey: "userId"});
  picture.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(picture, { as: "pictures", foreignKey: "userId"});
  savePicture.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(savePicture, { as: "savePictures", foreignKey: "userId"});

  return {
    comment,
    picture,
    savePicture,
    user,
  };
}
