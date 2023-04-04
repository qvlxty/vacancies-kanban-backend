import { diskStorage } from "multer"

export const createLocalFsStorage = diskStorage({
    filename: function (_, file, cb) {
        const fileName = `${Math.random().toString(36).substr(2, 9)}${Date.now()}`
        cb(null, 'userpic-' + fileName + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    },
    destination: (_, __, cb) => {
        cb(null, process.env.FILES_PATH)
    }
})