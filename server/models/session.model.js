export default (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    date: {
      type: DataTypes.DATE,
      required: true,
    },
  })

  return session
}
