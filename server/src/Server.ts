import express, {Express} from "express";
import expressStaticGzip from 'express-static-gzip';


export class Server {
    private readonly app: Express;
    constructor(publicFolder: string) {
        this.app = express();
        if (process.env.NODE_ENV !== "development") {
            this.app.use("/", expressStaticGzip(publicFolder, {
                enableBrotli: true,
                orderPreference: ['br'],
                serveStatic: {
                    setHeaders: (res: express.Response, path: string, stat: any) => {
                        if (path.indexOf("/client/static/") >= 0 || path.indexOf("synchro.js") >= 0 || path.indexOf("\\client\\static\\") > 0) {
                            res.setHeader("Cache-Control", "public max-age=31536000");
                        } else if (path.indexOf("\\client\\") >= 0 || path.indexOf("/client/")) {
                            res.setHeader("Cache-Control", "public max-age=86400"); ///cache clients for a day
                        }
                    }
                }
            }));
        }
    }


    start(port: number) {
        // @ts-ignore
        this.app.listen(port, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("server started on port " + port);
            }
        });


    }
}

