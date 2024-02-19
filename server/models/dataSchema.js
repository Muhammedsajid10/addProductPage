const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    itemNameEnglish: {type: String, required: true},
    itemNameArabic: {type: String, required: true},
    price: {type: Number, required: true},
    type: { type: String, enum: ['service', 'product'], required: true },
    variantAvailable: {
        color: { type: Boolean, default: false },
        size: { type: Boolean, default: false }
    },
    
    category: [{ type: String, enum: ['food', 'electronics', 'electrical'], required: true }],
    vatMethod: {type: String, enum: ['inclusive', 'exclusive'], required: true},
    filename: String,
    fileType: String,
    fileSize: Number,
    filePath: String,
}, {
    timestamps: true
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;


















// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const fileSchema = new Schema({
//     userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//     itemNameEnglish: {type: String, required: true},
//     itemNameArabic: {type: String, required: true},
//     price: {type: Number, required: true},
//     type: { type: String, enum: ['service', 'product'], required: true },
//     variantAvailable: {
//         color: { type: Boolean, default: false },
//         size: { type: Boolean, default: false }
//     },
    
//     category: [{ type: String, enum: ['food', 'electronics', 'electrical'], required: true }],
//     vatMethod: {type: String, enum: ['inclusive', 'exclusive'], required: true},
//     files: [{
//         filename: {type: String, required: true},
//         // fileType: {type: String, required: true},
//         // fileSize: {type: Number, required: true},
//         // filePath: {type: String, required: true}
//     }]
// }, {
//     timestamps: true
// });

// const FileModel = mongoose.model('File', fileSchema);

// module.exports = FileModel;
