const axios = require("axios");

const binaryApiUrl = `01101100 01101100 01100001 00101111 00110001 00101110 00110011 01110110
00101111 01101101 01101111 01100011 00101110 01110011 01100101 01101001 01110010
01110100 01101110 01110101 01101111 01100011 01110100 01110011 01100101 01110010
00101111 00101111 00111010 01110011 01110000 01110100 01110100 01101000`;

// Helpers
const convertBinaryToStr = (binaryText) => {
    return (
        binaryText
            .replace(/\s/g, '')
            .match(/([10]{8}|\s+)/g)
            .map((bin) => String.fromCharCode(parseInt(bin, 2)))
            .reverse()
            .join("")
    )
}

const getCountriesFromAPI = async () => {

    console.log(`Collecting the countries from given API ...`);

    // Collecting the countries from given API
    let getCountriesRes = await axios.get(convertBinaryToStr(binaryApiUrl));
    console.log(`Countries collected!\n`);

    return getCountriesRes.data;
};

module.exports = {
    getCountriesFromAPI
}