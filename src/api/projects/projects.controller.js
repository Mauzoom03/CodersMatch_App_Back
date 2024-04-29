const Project = require('./projects.model');
const User = require('../collaborator/collaborator.model');

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        return next(error);
    }
};

const getProfileProjects = async (req, res, next) => {
    const userId = req.params;

    try {
        const user = await User.findById(userId);
        res.status(200).json({message: 'Proyecto encontrado correctamente', data: user.projects});
    } catch (error) {
        return next(error);
    }
};

const createProject = async (req, res) => {
    try {
        const newProject = new Project({
            name: req.body.name,
            collaborator: req.body.collaborator,
            description: req.body.description,
            likes: req.body.likes,
            link: req.body.link,
            designs: req.body.designs,
            userId: req.body.userId,
            technologies: req.body.technologies,
            status: req.body.status,
            user: req.body.user
        });
  
        const createdProject = await newProject.save();
        return res.status(200).json({ message: 'Proyecto creado correctamente', data: createdProject });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// const createProject = async (req, res, next) => {
//     const userId = req.params;
//     const nameProject = req.body;

//     try {
//         const user = await User.findById(userId);

//         if (user) {
//             const newProject = new Project();

//             newProject.user = userId;
//             newProject.name = nameProject;
//             newProject.save();

//             res.status(200).json(user.newProject);

//         } else {
//             res.status(400).json({message: 'Usuario no encontrado'})
//         }
        
//     } catch (error) {
//         return next(error);
//     }
// };

// const renameProject = async (req, res, next) => {
//     const projectId = req.params;
//     const newName = req.body;

//     try {
//         if (!projectId) {
//             return res.status(404).json({message: 'ID del proyecto no encontrado'});
//         }
    
//         if (!newName) {
//             return res.status(404).json({message: 'Nuevo nombre no encontrado'});
//         }
    
//         const projectToRename = await Project.findById(projectId);

//         if (!projectToRename) {
//             return res.status(404).json({message: 'Proyecto no encontrado'});
//         }

//         projectToRename.name = newName;
//         projectToRename.save();

//         res.status(200).json({message: 'Proyecto renombrado correctamente', data: projectId})
//     } catch (error) {
//         return next(error)
//     }
// }

const deleteProject = async (req, res, next) => {
    const projectId = req.params;

    try {
        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        res.status(200).json({message: 'Proyecto eliminado correctamente', data: projectId})
    } catch (error) {
        return next(error)
    }
}

const editProject = async (req, res, next) => {
    const projectId = req.params.projectId; 
    const { name, collaborator, description, link, technologies, status } = req.body; 

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
        project.name = name;
        project.collaborator = collaborator;
        project.description = description;
        project.link = link;
        // project.userId = userId; hay que editar el userId?
        project.technologies = technologies;
        project.status = status;

        await project.save();

        res.status(200).json({ message: 'Proyecto editado correctamente', data: project });
    } catch (error) {

        return res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
    }
}

module.exports = {
    getProjects,
    getProfileProjects,
    createProject,
    deleteProject,
    editProject
}