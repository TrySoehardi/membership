import { Login } from "./auth/login";
import { Registration } from "./auth/registration";
import { Verif } from "./auth/verif";
import { GetBanner } from "./get/getBanner";
import { GetProfile } from "./get/getProfile";
import { PutImageProfile } from "./put/putImageProfile";
import { PutProfile } from "./put/putProfile";

// every controller must regist in here

//~~~~~~~~~~~~~~public api controller~~~~~~~~~~~~~~~
export const controllers = [
    new Registration,
    new Login,
    new GetBanner
];


//~~~~~~~~~~~~~~~private api controller~~~~~~~~~~~~~~
export const privateControllers = [
    new GetProfile,
    new PutProfile,
    new PutImageProfile,
    new Verif
];


