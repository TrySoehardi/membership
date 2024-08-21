import Axios from "axios"

export class BaseService {
    protected baseUrl: string | undefined;

    protected returnData(code: number, message: string, data: any) {
        const content = {
            code: code,
            message: message,
            data: data
        }

        return content;
    }

    protected async sendRequest(content:{
        path: string,
        method: string,
        token?: string,
        data?:any
    }) {
        Axios.defaults.headers.common['Authorization'] = content.token;
        const result = Axios({
            method: content.method,
            url: `${this.baseUrl}${content.path}`,
            data: content.data
        });
        // const result = Axios.(`${this.baseUrl}${content.path}`, { headers: { Authorization: content.token } });
        return (await result).data
    }
}