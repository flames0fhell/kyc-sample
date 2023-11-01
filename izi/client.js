
const {genAuthPrefix, genSignKey, genSignature, genBody, genHeaders, genMsg} = require("./utils")
const axios = require("axios")
class Client{
    constructor(ak, sk){
        this.ak = ak;
        this.sk = sk;
    }
    async Request(url,data){
        const body = genBody(data)
        const headers = genHeaders(body)
        const msg = genMsg("POST", url, body, headers);
        const authPrefix = genAuthPrefix(this.ak)
        const signKey = genSignKey(this.sk, authPrefix)
        const signature = genSignature(signKey, msg)
        
        const axiosReq = {
            method: "POST",
            url: url,
            data: body.toString("utf8"),
            headers: {
                ...headers,
                "Authorization": `${authPrefix}//${signature}`,
            }
        }
        const response = await axios(axiosReq)

        return response
    }
}

module.exports = Client;