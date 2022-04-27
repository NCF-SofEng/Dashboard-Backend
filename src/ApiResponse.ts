import { TaskManager } from "./tasks/manager.js"

export interface ApiResponse extends Object {
    status: 0 | 1,
    message: string,
    data: any,
    refreshTime: number,
    startTime: number
}

export default class {
    public static Error(message: string): ApiResponse {
        return {
            status: 0,
            message: message,
            data: null,
            refreshTime: Date.now() - TaskManager.lastExecution().getMilliseconds(),
            startTime: Date.now() - TaskManager.startTime().getMilliseconds()
        }
    }

    public static Response(data: any, message = "") {
        return {
            status: 1,
            message: message,
            data: data,
            refreshTime: Date.now() - TaskManager.lastExecution().getMilliseconds(),
            startTime: Date.now() - TaskManager.startTime().getMilliseconds()
        }
    }
}