import { TaskManager } from "./tasks/manager.js"

/** E.F.
 * Declare the fields in an ApiResponse
 */
export interface ApiResponse extends Object {
    status: 0 | 1,
    message: string,
    data: any,
    refreshTime: number,
    startTime: number
}

/** E.F.
 * Declare the class that will be used to create an ApiResponse
 */
export default class {
    // Return the response data for an error
    public static Error(message: string): ApiResponse {
        return {
            status: 0,
            message: message,
            data: null,
            refreshTime: Date.now() - TaskManager.lastExecution().getMilliseconds(),
            startTime: Date.now() - TaskManager.startTime().getMilliseconds()
        }
    }

    // Return the response data for a successful request.
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