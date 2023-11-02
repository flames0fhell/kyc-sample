
require('dotenv').config();
const axios = require('axios')

const main = async () => {

    const url = "https://api.sandbox.izidata.co.id/v1/bankidcheck?token=" + process.env.TOKEN;
    const body = {
        id: '3275046210900007',
        name: 'Hitori',
        pob: 'jakarta',
        dob: '01-02-1992',
        mother_name: '4' 
    }
    const data = await axios.request(
        {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : body
        }
    )
    console.log(data.data)
}

main();