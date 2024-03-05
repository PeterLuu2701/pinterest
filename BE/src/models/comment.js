import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class comment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    commentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    pictureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'picture',
        key: 'pictureId'
      }
    },
    commentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    commentContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commentId" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "pictureId",
        using: "BTREE",
        fields: [
          { name: "pictureId" },
        ]
      },
    ]
  });
  }
}
