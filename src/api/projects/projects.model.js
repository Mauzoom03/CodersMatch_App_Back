const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: {type: String, required: true},
        designs: [{ type: Schema.Types.ObjectId, ref: 'designs', default: null }],
        userId: {type: Schema.Types.ObjectId, ref: 'user'}
    },

    { timestamps: true }
);

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;
