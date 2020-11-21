// import all models
const Post = require('./Post');
const User = require('./User');
<<<<<<< HEAD
=======
const Comment = require('./Comment');
// const Likes = require('./Likes');
>>>>>>> develop

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'
});

<<<<<<< HEAD
module.exports = { User, Post };
=======
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Likes.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'SET NULL'
// });

// Likes.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'SET NULL'
// });

// User.hasMany(Likes, {
//     foreignKey: 'user_id'
// });

// Post.hasMany(Likes, {
//     foreignKey: 'post_id'
// });

module.exports = { User, Post, Comment };
>>>>>>> develop
