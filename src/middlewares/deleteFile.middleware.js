const cloudinary = require('cloudinary').v2

// Pasamos una URL y la borra de CLoudinary
const deleteImgCloudinary = (imgUrl) => {
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited[imgSplited.length - 1].split('.')
    const folderSplited = imgSplited[imgSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
}

module.exports = { deleteImgCloudinary }