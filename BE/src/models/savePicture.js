import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class savePicture extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    pictureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'picture',
        key: 'pictureId'
      }
    },
    saveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'savePicture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "pictureId" },
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
