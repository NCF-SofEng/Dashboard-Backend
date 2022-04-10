export interface ApiResponse extends Object {
    status: 0 | 1,
    message: string,
    data: any,
}

export default class {
    public static Error(message: string): ApiResponse {
        return {
            status: 0,
            message: message,
            data: null
        }
    }

    public static Response(data: any, message = "") {
        return {
            status: 1,
            message: message,
            data: data
        }
    }
}