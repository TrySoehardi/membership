import { NextFunction, Request, Response } from "express"
import { UserService } from "../../services/internal/userService"
import { Base } from "../baseController";
import multer from "multer";
import path from "path";
import { user } from "../../model/userModel";


export class PutImageProfile extends Base {
    public method = "PUT"
    public path = "/profile/image"
    private userService: UserService;
    private upload;

    constructor() {
        super();
        this.userService = new UserService;
        this.upload = multer({ dest: 'uploads/' });
    }

    public async api(Req: Request, Res: Response, Next: NextFunction) {
        let fileName: string;
        let user = Req.body;
        user.id = Req.userId; 
        
        const checkFileType = (file:any, cb:any)=>{
            const filetypes = /jpg|png/;
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
    
            if(mimetype && extname) {
                return cb(null, true);
            } else {
                this.response(Res,400,102,"Format tidak sesuai",null);
            }
        }


        const storage = multer.diskStorage({
            destination: './uploads/',
            filename: function(req, file, cb) {
                fileName = "profile-updated" + path.extname(file.originalname);
                user.image_profile = fileName;
              cb(null, fileName);
            }
          });

        const upload = multer({
            storage: storage,
            fileFilter: function(req, file, cb) {
              checkFileType(file, cb);
            }
        }).single('file');

        upload(Req, Res, (err) => {
            if(err) {
                console.error(err);
                return Res.status(500).json({ error: err });
            }
            if(!Req.file) {
                this.response(Res,400,102,"Format tidak sesuai",null);
             }
            // save
            this.userService.updateProfile(user).then((result)=>{
                this.response(Res,200,0,"Update Profile Image berhasil",result);
            });
         });
    }
}