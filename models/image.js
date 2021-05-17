module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
      },
      uploadedBy: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false
      }
    });
    return Image;
  };