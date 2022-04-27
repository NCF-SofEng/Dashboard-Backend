import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
import fetch from "node-fetch";
import { Logger } from "../libs/logging.js";

export default function(_db: Database): Router {
    const router = Router();

    const sensorTypes = ["salinity", "chlorophyll", "temperature_f", "waterquality"];
    router.get("/data", async (req, res) => {
        // Get the 'type' query parameter.
        const type = req.query.type;
        if (!type || !sensorTypes.includes(type as string)) {
            return res.json(ApiResponse.Error(`Missing or invalid sensor type. Possible values: ${sensorTypes.join(", ")}`));
        };

        try {
            const r = await fetch("https://recon.sccf.org/api/charts?sites%5B%5D=56&sites%5B%5D=11&sites%5B%5D=13&sites%5B%5D=53&sites%5B%5D=18&yValues%5B%5D=" + type)
                .then((r) => r.json());

            Logger.info("Got data from recon.sccf.org for type: " + type);
            return res.json(ApiResponse.Response(r));
        } catch {
            Logger.error("Error getting data from recon.sccf.org");
            return res.json(ApiResponse.Error("Error fetching data."));
        }
    });

    return router;
}