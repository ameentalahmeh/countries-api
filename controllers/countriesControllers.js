const db = require("../lib/database/dbConnection");

const getCountries = async (req, res) => {
    try {
        let noCountriesFound = { "message": "No countries found match your query search!" };
        let searchQueryResult = [];

        // Access the provided search query parameters
        let searchQuery = req.query;
        let searchParam = Object.keys(searchQuery)[0];

        // Find the match countries
        if (searchQuery) {
            if (searchParam == "name") {
                searchQueryResult = await db.collection("country").find({ $or: [{ "name.common": searchQuery['name'] }, { "name.official": searchQuery['name'] }] }).toArray();
            } else {
                searchQueryResult = await db.collection("country").find(searchQuery).toArray();
            }
        } else {
            searchQueryResult = await db.collection("country").find({}).toArray();
        }

        return res.status(200).json(searchQueryResult.length > 0 ? searchQueryResult : noCountriesFound);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getCountryCurrenciesByCca2 = async (req, res) => {
    try {
        // Access the provided country' cca2
        let countryCca2 = req.params.cca2;

        // Find the country currencies
        let searchQueryResult = await db.collection("country").aggregate([
            { $match: { "cca2": countryCca2 } },
            { $project: { _id: 0, country: "$name.common", currencies: "$currencies" } }
        ]).toArray();

        let inValidCCA2 = { "message": `No countries belongs to CCA2 (${countryCca2}) code!` };

        return res.status(200).json(searchQueryResult.length > 0 ? searchQueryResult : inValidCCA2);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const groupCountries = async (req, res) => {
    try {
        let noCountriesFound = { "message": "No countries found match your query search!" };
        let searchQueryResult = [];

        // Access the provided search query parameters
        let searchQuery = req.query;
        let searchParam = Object.keys(searchQuery)[0];

        // Find the match countries
        if (searchParam == "region") {
            searchQueryResult = await db.collection("country").aggregate([
                { $match: searchQuery },
                { $group: { _id: "$region", num_countries: { $sum: 1 }, countries: { $push: "$name.common" } } }
            ]).toArray();
        } else if (searchParam == "lang") {
            searchQueryResult = await db.collection("country").aggregate([
                { $project: { _id: 0, country: "$name.common", langs: { $objectToArray: "$languages" } } },
                { $unwind: "$langs" },
                { $match: { "$expr": { "$eq": ["$langs.v", searchQuery['lang']] } } },
                { $group: { _id: "$langs.v", num_countries: { $sum: 1 }, countries: { $push: "$country" } } }
            ]).toArray();
        }

        return res.status(200).json(searchQueryResult.length > 0 ? searchQueryResult : noCountriesFound);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const downloadCountriesFile = async (req, res) => {
    try {
        let isAdmin = req.headers && req.headers["x-admin"] && req.headers["x-admin"] == "1";
        if (isAdmin) {
            let countriesFile = `${__dirname}/../data/countries.json`;
            res.download(countriesFile);
        } else {
            return res.status(401).json({ error: "Unauthorized access!" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { getCountries, getCountryCurrenciesByCca2, groupCountries, downloadCountriesFile };