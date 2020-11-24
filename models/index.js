// import all models
const Activity = require('./Activity');
const User = require('./User');
const Comment = require('./Comment');

// create associations

User.hasMany(Activity, {
  foreignKey: 'user_id'
});

Activity.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Activity, {
  foreignKey: 'activity_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Activity.hasMany(Comment, {
  foreignKey: 'activity_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Activity, {
  foreignKey: 'Activity_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});


module.exports = { User, Activity, Comment };
