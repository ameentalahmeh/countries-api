const fs = require('fs');
const { getCountriesFromAPI } = require("./binaryAPI");

// Save countries in the database
getCountriesFromAPI()
    .then(async (countries) => {
        
        console.log("Storing countries in countries.json file ...");

        // Write countries to local file (countries.json). 
        await fs.writeFileSync('./data/countries.json', JSON.stringify(countries));

        console.log("All countries saved in countries.json file!\n");
    }).catch((err) => {
        console.log(err);
    });