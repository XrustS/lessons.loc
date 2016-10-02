'use strict';
const mongoose = require('mongoose');


module.exports = {
  users: mongoose.model('users', {
                                  userName: String,                                  
                                  update:{type: Date, default: Date.now}
  }),
  tasks: mongoose.model('tasks', {
                                  taskName: String,
                                  isClose: Boolean,
                                  details: String,
                                  usersId:[mongoose.Schema.Types.ObjectId],
                                  update:{type: Date, default: Date.now}
  })
}
