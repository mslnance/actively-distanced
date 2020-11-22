// import all models
const Activity = require('./Activity');
const User = require('./User');
const Comment = require('./Comment');
const Likes = require('./Likes');

// create associations

User.hasMany(Activity, {
  foreignKey: 'user_id'
});

Activity.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// User.belongsToMany(Activity, {
//   through: Likes,
//   as: 'liked_activities',

//   foreignKey: 'user_id',
//   onDelete: 'SET NULL'
// });

// Activity.belongsToMany(User, {
//   through: Likes,
//   as: 'liked_activities',
//   foreignKey: 'activity_id',
//   onDelete: 'SET NULL'
// });




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
