const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Departments extends Model { }

Departments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    }
);

module.exports = Departments;