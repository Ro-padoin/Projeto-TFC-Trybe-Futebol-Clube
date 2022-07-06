module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    displayName: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING },
    password: { allowNull: false, type: DataTypes.STRING },
    image: { allowNull: false, type: DataTypes.STRING },
  }, { timestamps: false });

  return user;
};
