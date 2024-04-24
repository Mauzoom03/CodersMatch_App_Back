const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { register, login, logout, confirm,  newPassword, isAdmin} = require('./users.controllers');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.get('/is-admin', isAdmin);
UserRoutes.get("/confirm-user/:token", confirm);
UserRoutes.get('/logout', [isAuth], logout);
UserRoutes.patch('/newPassword/:token', newPassword); // Actualización de contraseña de usuario
UserRoutes.get('/is-admin', [isAuth], isAdmin); // Verificación de si el usuario es administrador (requiere autenticación)
UserRoutes.get('/user/:id', getOneUser); // Obtener información de usuario por token (requiere autenticación)
UserRoutes.patch('/user/:id', [isAuth, upload.single('image')], patchUser); // Actualizar información de usuario por ID (requiere autenticación)
UserRoutes.get('/allUsers', getAllUsers); // Obtener información de todos los usuarios (requiere autenticación)
UserRoutes.delete('/user/:id', [isAuth], deleteUser); // Borrar usuario por ID (requiere autenticación)

module.exports = UserRoutes;