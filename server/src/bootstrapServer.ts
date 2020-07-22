import {Server} from "./Server";
import * as path from "path";

let port = Number.parseInt(process.env.PORT || "8080");
let publicFolder = path.join(__dirname + '/../../client/build');

const server = new Server(publicFolder);
server.start(port);
