const ProjectRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { getProjects, getProfileProjects, addProject, renameProject, deleteProject, addDesignToProject, deleteDesignToProject } = require('./projects.controller');

ProjectRoutes.get('/projects', getProjects);
ProjectRoutes.get('/profileProjects/:userId', [isAuth], getProfileProjects);
ProjectRoutes.post('/addProject/:userId', [isAuth], addProject);
ProjectRoutes.put('/renameProject/:projectId', [isAuth], renameProject);
ProjectRoutes.delete('/deleteProject/:projectId', [isAuth], deleteProject);
ProjectRoutes.put('/addDesignToProject/:projectId/:designId', [isAuth], addDesignToProject);
ProjectRoutes.put('/deleteDesignToProject', [isAuth], deleteDesignToProject);

module.exports = ProjectRoutes;