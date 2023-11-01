const izi = require("./izi/client")
const fs = require('fs');
require('dotenv').config();

function convertToBase64(filename) {
    const data = fs.readFileSync(filename, "base64");
    // const base64Data = data.toString('base64');
    return data;
    
}

const main = async () => {

    const client = new izi(process.env.API_KEY, process.env.SECRET_KEY)
    const url = "https://apihub.izi.credit/v1/officialfacecompare";
    const body = {
        img:  convertToBase64("tes.jpeg"),
		nik:  "3275046210900007",
		pob:  "BEKASI",
		dob:  "20-01-1994",
		name: "HITORI ACHMAD"
    }
    const data = await client.Request(url, body)
}

main();