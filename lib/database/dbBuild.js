const db = require("./dbConnection");
const { getCountriesFromAPI } = require("../binaryAPI");

const refactorCountriesDetails = (countries) => {

    // Refactor countries details
    let countriesDetails = countries.map(({ name, cca2, cca3, ccn3, region, languages, currencies, latlng }) => {
        return { name, cca2, cca3, ccn3, region, languages, currencies, latlng };
    });

    return countriesDetails;
};

// Save countries in the database
getCountriesFromAPI()
    .then(async (countries) => {

        // Refactor countries details 
        let refactoredCountries = refactorCountriesDetails(countries);

        // Open db connection && get country collection
        const dbCollection = await db.collection("country");
        console.log(`Connection opened && start inserting countries in ${dbCollection.collectionName} table ...`);

        // Insert countries into connected database (countriesDb).
        let isCountriesInDb = await dbCollection.countDocuments() > 0;

        if (!isCountriesInDb) {
            await dbCollection.insertMany(refactoredCountries);
            console.log(`All countries saved in ${dbCollection.collectionName} table!`);
        } else {
            console.log(`Countries already exist, inseration process is skipped!`);
        }

        // Close the db connection
        await db.close();
        console.log("Connection closed!");

    }).catch((err) => {
        console.log(err);
    });