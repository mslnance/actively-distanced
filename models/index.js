// import all models
const Activity = require('./Activity');
const User = require('./User');
const Like = require('./Like');
const Comment = require('./Comment');
const Activity_Type = require('./Activity_Type');

// create associations
User.hasMany(Activity, {
  foreignKey: 'user_id'
});

Activity.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Activity, {
  through: Like,
  as: 'liked_activities',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Activity.belongsToMany(User, {
  through: Like,
  as: 'liked_activities',
  foreignKey: 'activity_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(Activity, {
  foreignKey: 'activity_id',
  onDelete: 'SET NULL'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Activity.hasMany(Like, {
  foreignKey: 'activity_id'
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

Activity.belongsTo(Activity_Type, {
    foreignKey: 'activity_type_id'
});

Activity_Type.hasMany(Activity, {
    foreignKey: 'activity_type_id'
});

module.exports = { User, Activity, Like, Comment,Activity_Type };
