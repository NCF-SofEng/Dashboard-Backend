import { Router } from "express";
import ApiResponse from "../ApiResponse.js";
import { Database } from "../libs/database.js";
import fetch from "node-fetch";
import { Logger } from "../libs/logging.js";

/** E.F.
 * Generates the router for the sensor api..
 * @param _db The database to use
 * @returns The router for the sensor data.
 */
export default function(_db: Database): Router {
    const router = Router();

    // List of the possible sensor types.
    const sensorTypes = ["salinity", "chlorophyll", "temperature_f", "waterquality"];

    router.get("/data", async (req, res) => {
        // Get the 'type' query parameter.
        const type = req.query.type;

        // If it's not in our listed types, error.
        if (!type || !sensorTypes.includes(type as string)) {
            return res.json(ApiResponse.Error(`Missing or invalid sensor type. Possible values: ${sensorTypes.join(", ")}`));
        };

        try {
            // Fetch the data from the API
            const r = await fetch("https://recon.sccf.org/api/charts?sites%5B%5D=56&sites%5B%5D=11&sites%5B%5D=13&sites%5B%5D=53&sites%5B%5D=18&yValues%5B%5D=" + type)
                .then((r) => r.json());

            // Print that it worked
            Logger.info("Got data from recon.sccf.org for type: " + type);
            
            // Return the data.
            return res.json(ApiResponse.Response(r));
        } catch {
            // If it didn't work, return an error.
            Logger.error("Error getting data from recon.sccf.org");
            return res.json(ApiResponse.Error("Error fetching data."));
        }
    });

    return router;
}