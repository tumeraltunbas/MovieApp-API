import multer from "multer";
import rootPath from "app-root-path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${rootPath.path}/public`);
    },
    filename: function(req, file, cb)
    {
        const extension = file.mimetype.split("/")[1];
        const randomText = crypto.randomBytes(10).toString("hex");
        const fileName = "image_" + randomText + "." + extension;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) =>
{
    const allowedMimetypes = ['image/jpg', "image/jpeg", "image/png"];
    if(!allowedMimetypes.includes(file.mimetype))
    {
        return cb(new CustomError(400, "Unsupported file type. Just use jpg, jpeg or png types"), false);
    }
    cb(null, true);   
}

const upload = multer({storage:storage, fileFilter:fileFilter});
export default upload;