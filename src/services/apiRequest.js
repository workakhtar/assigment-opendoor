import {api} from "./axios";

export const apiRequest = async ( method ,url, data,) =>{
    try {
        const response = await api ({
            method,
            url,
            data,
        })
        return response
    } catch (error) {
        throw error
    }
}