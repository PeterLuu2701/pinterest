import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class picture extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pictureId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pictureName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pictureUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pictureDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'picture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pictureId" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
