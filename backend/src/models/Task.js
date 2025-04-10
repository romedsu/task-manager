const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
title: { type: String, required: true },
completed: { type: Boolean, default: false },

// se añade campo userId
// userId: {type: String, default:null}

//el userId tiene que ser ub objeto para que se guarde al crear una tarea nueva
userId: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;