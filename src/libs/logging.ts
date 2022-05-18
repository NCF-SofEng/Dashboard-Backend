import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

/** E.F.
 * This static class exists to add shortcuts and configurable logging to the application.
 * Different log levels are available, and the log level can be changed at runtime.
 */
export class Logger {
    public static LoggingLevel = 3;
    /**
     * Logs it with a green color!
     * @param data The data to log.
     */
    public static info(data: string) {
        if (Logger.LoggingLevel > 1) {
            console.log(
                chalk.green("[LOG]:"),
                chalk.white(data)
                );
            }
        }

    /**
     * Logs it with a yellow color!
     * @param data The data to log.
     */
    public static warn(data: string) {
        if (Logger.LoggingLevel > 2) {
            console.log(
                chalk.yellow("[WARNING]:"),
                chalk.white(data)
            );
        }
    }

    /**
     * Logs it with a spooky & scary red color!
     * @param data The data to log.
     */
    public static error(data: string) {
        if (Logger.LoggingLevel > 0) {
            console.log(
                chalk.red("[ERROR]:"),
                chalk.white(data)
            );
        }
    }

    /**
     * Controls what type of log data is sent.
     * @param level The level to set the logging level to.
     */
    public static init(level: 0 | 1 | 2 | 3) {
        Logger.LoggingLevel = level;
    }
}

/**
 * Intercepts any incoming request and logs it to the console.
 * @param req The request object.
 * @param res The response object.
 * @param next The function to call after the interception is done.
 */
export function MiddlewareLogger(req: Request, res: Response, next: NextFunction) {
    Logger.info("Request: " + req.method + " " + req.url + "\n\t User Agent: " + req.get("User-Agent"));
    next();
}