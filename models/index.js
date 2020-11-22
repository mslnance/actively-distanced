// import all models
const Activity = require('./Activity');
const User = require('./User');
const Likes = require('./Likes');
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
  through: Likes,
  as: 'liked_activities',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Activity.belongsToMany(User, {
  through: Likes,
  as: 'liked_activities',
  foreignKey: 'activity_id',
  onDelete: 'SET NULL'
});

Likes.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Likes.belongsTo(Activity, {
  foreignKey: 'activity_id',
  onDelete: 'SET NULL'
});

User.hasMany(Likes, {
  foreignKey: 'user_id'
});

Activity.hasMany(Likes, {
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

module.exports = { User, Activity, Likes, Comment,Activity_Type };
