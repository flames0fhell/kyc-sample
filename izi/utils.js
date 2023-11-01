const crypto = require('crypto');
const querystring = require('querystring');
const url = require('url');
const moment = require('moment');
const toByte = (string) => {
    
    return Buffer.from(string, "utf8")
}
const encrypt = (sk, msg) => {
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(msg);
    return hmac.digest('hex');
}

const genAuthPrefix = (ak) => {
    const version = 1;
    const expire = 1800;
    const ts = moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    return `credit-v${version}/${ak}/${ts}/${expire}`;  
}

const genSignKey = (sk, authPrefix) => {
    return encrypt(toByte(sk), toByte(authPrefix))
}
const genSignature = (signKey, msg) => {
    return encrypt(toByte(signKey), toByte(msg))
}

const genBody = (data) => {
    const d = {};
    Object.keys(data).sort().forEach(key => {
        d[key] = data[key]
    })
    const body = querystring.stringify(d);

    return toByte(body);

}

const genHeaders = (body) => {
    
    const headers = {};
    headers['Content-Length'] = body.toString("utf8").length.toString();

    const md5sum = crypto.createHash('md5');
    md5sum.update(body);
    headers['Content-MD5'] = md5sum.digest('hex');
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return headers;
}

const genMsg = (method, srcUrl, body, headers) => {

    let msg;

    msg = method + "\n";

    const urlObj = new URL(srcUrl);

    msg += urlObj.pathname + '\n';

    const urlVals = querystring.parse(urlObj.search.slice(1));
    const keys = Object.keys(urlVals).sort();
    let query = '';
    keys.forEach((k, i) => {
        if (i !== 0) {
        query += '&';
        }
        query += k + '=' + encodeURIComponent(urlVals[k]);
    });
    msg += query + '\n';


    const encHeaderKeys = ["Content-Length", "Content-Type", "Content-MD5"];
    Object.keys(headers).forEach((k) => {
    if (k.includes("credit-")) {
        encHeaderKeys.push(k);
    }
    });
    encHeaderKeys.sort();
    encHeaderKeys.forEach((k) => {
    const val = encodeURIComponent(headers[k].trim());
    msg += k.toLowerCase() + ':' + val + '\n';
    });

    msg = msg.trim();
    return msg
}

module.exports = {
    genAuthPrefix,
    genSignKey,
    genSignature,
    genBody,
    genHeaders,
    genMsg
}