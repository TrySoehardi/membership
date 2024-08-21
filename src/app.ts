import bodyParser from "body-parser";
import express from "express";
import { Router } from './routes';


export class Apps {
    public app;
    private router: Router;
    constructor() {
        this.router = new Router();
        this.app = express();

        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());
        // this.app.use(state);
        // this.app.use(logging);
        this.app.use(this.router.getRouter());
        // this.app.use(errorHandler);
        this.app.use(function(req, res) {
            res.status(404)
            res.send({
                message: "path not found"

            });
        });
    }

    public async getApp() {
        return this.app
    }
}