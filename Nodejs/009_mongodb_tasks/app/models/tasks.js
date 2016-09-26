'use strict';
const mongoose = require('mongoose');

module.exports = {
  users: mongoose.model('users', {
                                  firstName: String,
                                  lastName: String,
                                  update:{type: Date, default: Date.now}
  }),
  tasks: mongoose.model('tasks', {
                                  taskName: String,
                                  status: String,
                                  usersid:[mongoose.Schema.Types.ObjectId],
                                  update:{type: Date, default: Date.now}
  })
}
