import "dotenv/config";
import http from "http";
import { Apps } from "./app";

(async()=>{
    const app = new Apps();
    try {
        http.createServer(
            {},
            await app.getApp().then((app) => { return app; })
        ).listen(process.env.PORT);
        console.log("SERVER RUN IN PORT ", process.env.PORT);
    }catch(error) {
        console.log(error);
    }
})();