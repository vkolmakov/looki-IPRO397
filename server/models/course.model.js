export default (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      required: true,
    },
  })

  return course
}
