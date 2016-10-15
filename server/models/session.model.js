export default (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    date: {
      type: DataTypes.DATE,
      required: true,
    },
  })

  return session
}
