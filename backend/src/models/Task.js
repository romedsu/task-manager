const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
title: { type: String, required: true },
completed: { type: Boolean, default: false },

// se añade campo userId
userId: {type: String, default:null}
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;