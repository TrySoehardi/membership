import express, {NextFunction, Request, Response} from "express";
import { privateControllers, controllers } from "../controller";
import { protectedRoute } from "../middleware/protectedRoute";


export class Router {
    private controllers;
    private privateControllers;
    private router;
    private prefix = "/api";
    constructor() {
        this.router = express.Router();
        this.controllers = controllers;
        this.privateControllers = privateControllers
    }

    public getRouter() {
        for (const controller of this.controllers) {
            switch(true) {
                case controller.method == "GET" :
                    this.router.get(this.prefix+controller.path,(req, res, next)=>controller.api(req, res,next));
                case controller.method == "POST" :
                    this.router.post(this.prefix+controller.path,(req, res, next)=>controller.api(req, res,next));
                case controller.method == "PUT" :
                    this.router.get(this.prefix+controller.path,(req, res, next)=>controller.api(req, res,next));
                case controller.method == "DELETE" :
                    this.router.get(this.prefix+controller.path,(req, res, next)=>controller.api(req, res,next));
            }
        }

        //~~~~~~~~~~~~  private api controller ~~~~~~~~~~~~~~~~~//
        for (const controller of this.privateControllers) {
            switch(true) {
                case controller.method == "GET" :
                    this.router.get(this.prefix+controller.path, (Req, Res,Next)=>{protectedRoute(Req,Res,Next)},(req, res, next)=>controller.api(req, res,next));
                case controller.method == "POST" :
                    this.router.post(this.prefix+controller.path, (Req, Res,Next)=>{protectedRoute(Req,Res,Next)},(req, res, next)=>controller.api(req, res,next));
                case controller.method == "PUT" :
                    this.router.put(this.prefix+controller.path, (Req, Res,Next)=>{protectedRoute(Req,Res,Next)},(req, res, next)=>controller.api(req, res,next));
                case controller.method == "DELETE" :
                    this.router.delete(this.prefix+controller.path, (Req, Res,Next)=>{protectedRoute(Req,Res,Next)},(req, res, next)=>controller.api(req, res,next));
            }
        }

        return this.router
    }
}