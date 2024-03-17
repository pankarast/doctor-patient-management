//const basePath = "/api/v1";
const basePathNoAuth = "/api";

export const baseUrl = `http://192.168.30.65:8081${basePathNoAuth}`;

export const getDashboard = (baseUrl, endPoint = "", parameters = {}) => {
    return {
        url: `${baseUrl}${endPoint}?` + new URLSearchParams(parameters).toString(),
        method: "GET",
        headers: {
            Authorization: `Bearer ${
                JSON.parse(sessionStorage.getItem("kc_tok"))
                ? JSON.parse(sessionStorage.getItem("kc_tok")).token
                : ""
            }`,
        },
    }
}