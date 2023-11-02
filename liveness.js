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
    const url = "https://api.sandbox.izidata.co.id/";
    const body = {
        img:  convertToBase64("tes.jpeg"),
		
    }
    const data = await client.Request(url, body)
    console.log(data.data)
}

main();