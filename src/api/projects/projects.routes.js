const ProjectRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { getProjects, getProfileProjects, createProject,  editProject, deleteProject } = require('./projects.controller');

ProjectRoutes.get('/projects', getProjects);
ProjectRoutes.get('/profileProjects/:userId', [isAuth], getProfileProjects);
ProjectRoutes.post('/createProject/:userId', [isAuth], createProject);
ProjectRoutes.put('/editProject/:projectId', [isAuth], editProject);
ProjectRoutes.delete('/deleteProject/:projectId', [isAuth], deleteProject);

module.exports = ProjectRoutes;