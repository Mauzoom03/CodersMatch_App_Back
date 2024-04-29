const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        likes: {type: Number, required: false, default: 0},
        link: {type: String, required: false},
        userId: {type: Schema.Types.ObjectId, ref: 'users'}, // userId es el creador del proyecto que hace referencia a users
        technologies: { type: String, requiered: true}, // TODO: AÑADIR LAS TECHS
        status: {
          type: String,
          enum: ["active", "inactive", "looking", "full"],
          default: "active",
        },
        collaborator: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "users",
            },
          ], 
    },

    { timestamps: true }
);

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
