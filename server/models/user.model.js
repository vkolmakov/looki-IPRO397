export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

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

