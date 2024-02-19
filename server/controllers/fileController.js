const FileModel = require("../models/dataSchema");

const dataUpload = async (req, res) => {
    try {
        console.log(req.body);
        const userId = req.user._id
        const { itemNameEnglish, itemNameArabic, price, type, variantAvailable, vatMethod } = req.body;
        const files = req.files;
        // const categories = req.body.category.split(',');
        const categories = req.body.category;
        const variantAvailableObject = JSON.parse(variantAvailable)


        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files provided for upload." })
        }

        const dataDetails = await FileModel.create(files.map(file => ({
            userId,
            itemNameEnglish,
            itemNameArabic,
            price,
            type,
            variantAvailable: variantAvailableObject,
            category: categories,
            vatMethod,
            filename: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            filePath: file.path,
        })))

        res.json(dataDetails)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = dataUpload;



















// const FileModel = require("../models/dataSchema");

// const dataUpload = async (req,res) => {
//     try {
//         console.log(req.body);
//         const userId = req.user._id
//         const { itemNameEnglish, itemNameArabic, price, type, variantAvailable,  vatMethod } = req.body;
//         const files = req.files;
//         // const categories = req.body.category.split(',');
//         const categories = req.body.category;
//         const variantAvailableObject = JSON.parse(variantAvailable)


//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: "No files provided for upload." })
//         }

//         const dataDetails = await FileModel.create({
//             userId,
//             itemNameEnglish,
//             itemNameArabic,
//             price,
//             type,
//             variantAvailable: variantAvailableObject,
//             category: categories,
//             vatMethod,
//             files: files.map(file => ({
//                 filename: file.originalname,
//                 fileType: file.mimetype,
//                 fileSize: file.size,
//                 filePath: file.path,
//             }))
//         });

//         res.json(dataDetails)

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }

// }

// module.exports = dataUpload;








