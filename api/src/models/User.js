// UNNUSED
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      plan: {
        type: DataTypes.ENUM("1", "2", "3", "none"),
        defaultValue: "none",
      },
      token: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,

      },
      email_verified: {
          type:DataTypes.BOOLEAN,
          defaultValue: false
      },
      registered:{
          type:DataTypes.BOOLEAN,
          defaultValue: false
      },
      rol: {
          type:DataTypes.ENUM("Admin", "User"),
          defaultValue: "User"
      },
      permissions: {
          type:DataTypes.ENUM("All", "Edit", "Watch", "Banned"),
          defaultValue: "Watch"
      },
      image: {
          type: DataTypes.TEXT,
          defaultValue: 'https://preview.redd.it/wfrjdds1h3b31.png?width=960&crop=smart&auto=webp&v=enabled&s=a241ea60836b489dcd400ac73edea93928ae1def'
      }
    },{
      timestamps: false,

    },
  );
};
