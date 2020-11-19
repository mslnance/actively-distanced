const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
// create our Activity model
class Activity extends Model {
    static uplike(body, models) {
      return models.Like.create({
        user_id: body.user_id,
        activity_id: body.activity_id
      }).then(() => {
        return Activity.findOne({
          where: {
            id: body.activity_id
          },
          attributes: [
            'id',
            'image_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'),
              'like_count'
            ]
          ],
          include: [
            {
              model: models.Comment,
              attributes: ['id', 'activity_id','comment',  'user_id', 'created_at'],
              include: {
                model: models.User,
                attributes: ['username']
              }
            }
          ]
        });
      });
    }
  }
  

// create fields/columns for Post model
Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id'
          }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isURL: true
          }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Unknown'
        },
        group_size: {
          type: DataTypes.STRING,
          allowNull: true
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true
        },
        date: {
            //type: DataTypes.STRING,
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            //type: DataTypes.STRING,
            type: DataTypes.TIME,
            allowNull: false
        },
        activity_type_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'activity_type',
            key: 'id'
          }
        }
        
        
        
    
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'activity'
    }
);

module.exports = Activity;
