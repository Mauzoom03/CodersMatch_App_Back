const Project = require('./projects.model');
const User = require('../users/users.model');

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
        res.status(200).json({message: 'Proyecto creado correctamente', data: user.projects});
    } catch (error) {
        return next(error);
    }
};

const addProject = async (req, res, next) => {
    const userId = req.params;
    const nameProject = req.body;

    try {
        const user = await User.findById(userId);

        if (user) {
            const newProject = new Project();

            newProject.user = userId;
            newProject.name = nameProject;
            newProject.save();

            res.status(200).json(user.newProject);

        } else {
            res.status(400).json({message: 'Usuario no encontrado'})
        }
        
    } catch (error) {
        return next(error);
    }
};

const renameProject = async (req, res, next) => {
    const projectId = req.params;
    const newName = req.body;

    try {
        if (!projectId) {
            return res.status(404).json({message: 'ID del proyecto no encontrado'});
        }
    
        if (!newName) {
            return res.status(404).json({message: 'Nuevo nombre no encontrado'});
        }
    
        const projectToRename = await Project.findById(projectId);

        if (!projectToRename) {
            return res.status(404).json({message: 'Proyecto no encontrado'});
        }

        projectToRename.name = newName;
        projectToRename.save();

        res.status(200).json({message: 'Proyecto renombrado correctamente', data: projectId})
    } catch (error) {
        return next(error)
    }
}

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

const addDesignToProject = async (req, res, next) => {
    const { projectId, designId } = req.params;

    try {
        const design = await Design.findById(designId);
        if (!design) {
            return res.status(404).json({ message: 'Diseño no encontrado.' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        project.designs.addToSet(design);

        await project.save();

        res.status(200).json({ message: 'Diseño añadido correctamente al proyecto', data: designId });
    } catch (error) {
        return next(error);
    }
};

const deleteDesignToProject = async (req, res, next) => {
    const { projectId, designId } = req.params;

    try {
        const design = await Design.findById(designId);
        if (!design) {
            return res.status(404).json({ message: 'Diseño no encontrado.' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        project.designs.remove(design);

        await project.save();

        res.status(200).json({ message: 'Diseño eliminado correctamente al proyecto', data: designId });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getProjects,
    getProfileProjects,
    addProject,
    renameProject,
    deleteProject,
    addDesignToProject,
    deleteDesignToProject
}