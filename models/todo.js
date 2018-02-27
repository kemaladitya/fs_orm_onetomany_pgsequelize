'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    userId: DataTypes.INTEGER,
    task: DataTypes.TEXT
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User,{foreignKey:"userId"})
  };
  return Todo;
};