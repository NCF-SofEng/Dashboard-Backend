import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

/**
 * This static class exists to add shortcuts and configurable logging to the application.
 * Different log levels are available, and the log level can be changed at runtime.
 */
export class Logger {
    public static LoggingLevel = 3;
    public static info(data: string) {
        if (Logger.LoggingLevel > 1) {
            console.log(
                chalk.green("[LOG]:"),
                chalk.white(data)
                );
            }
        }
        
        public static warn(data: string) {
            if (Logger.LoggingLevel > 2) {
                console.log(
                chalk.yellow("[WARNING]:"),
                chalk.white(data)
            );
        }
    }

    public static error(data: string) {
        if (Logger.LoggingLevel > 0) {
            console.log(
                chalk.red("[ERROR]:"),
                chalk.white(data)
            );
        }
    }

    public static init(level: 0 | 1 | 2 | 3) {
        Logger.LoggingLevel = level;
    }
}

export function MiddlewareLogger(req: Request, res: Response, next: NextFunction) {
    Logger.info("Request: " + req.method + " " + req.url + "\n\t User Agent: " + req.get("User-Agent"));
    next();
}