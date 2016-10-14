export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },

    lastName: {
      type: DataTypes.STRING,
      required: true,
    },

    faceId: {
      type: DataTypes.STRING,
      required: true,
    },
  })

  return user
}

