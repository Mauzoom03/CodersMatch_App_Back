// Librería para la gestión de ficheros
const multer = require('multer');
// Librería para trabjar con cloudinary
const cloudinary = require('cloudinary').v2
// Guardado en la store de Cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// COnfiguración de nuestra storage -> nuestra carpeta de imgs  : formatos permitidos
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
    }
})

// multer se encarga de gestionar dicha carpeta
const upload = multer({ storage });

module.exports = upload;