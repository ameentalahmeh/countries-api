# Description
Rest API based on Node Js (Express) for countries, which allows users to search on countries' details. Plus, it allows admins to download the countries as a Json file.

# Functionality
 - Get all countries.
 - Search by country CCA2/CCA3/CCN3, and name (common name or official name).
 - Get country currencies by CCA2.
 - Group countries by region/language.
 - Download countries (json file) by admins.
 
# Used Technologies
 - **Backend:** NodeJs (Express).
 - **DB:** MongoDB.

# Getting Started
How to get the project up and run it on your local machine.

_Please ensure you have this software **installed and running** on your local machine **before** you attempt to run this API._

>**Node** (via nvm) see: https://github.com/creationix/nvm

### Setup

**1. Clone the repo:**

```$ git clone https://github.com/ameentalahmeh/nadsoft-task.git```

**2. Install dependencies**

```
$ cd nadsoft-task
$ npm i
```
**3. Create your MongoDB**

_You have two options for create a mongoDB:_
> **Local mongoDB** see:  https://docs.mongodb.com/manual/installation/#mongodb-installation-tutorials.

>**Cloud mongoDB (Atlas)** see: https://docs.atlas.mongodb.com/getting-started/ 


**4. Add initial environment Variables**

 Create a `.env` file in the root directory.

   - _Add the following line to make your database works by inserting your username and password._

          DB_URL = mongodb://[username:password@][host]:[port]/[databasename]

   - _Add server port_

          PORT=<ANY_FREE_PORT>

**5. Build countries.json file**

     $ npm run jsonFileBuild


**6. Build MongoDB**

    $ npm run dbBuild

**7. Run the server**

    $ npm run server

# API Documentaion
- ## API Endpoints

  - **Get all countries**:  

        http://<base_api_url>/countries/

  - **Search by CCA2**:  

        http://base_api_url/countries/?cca2=<Country_CCA2>

  - **Search by CCA3**:  

        http://base_api_url/countries/?cca3=<Country_CCA3>

  - **Search by CCN3**:  

        http://base_api_url/countries/?ccn3=<Country_CCN3>

  - **Search by name**:  

        http://base_api_url/countries/?name=<Country_Common_Name or Country_Official_Name>

  - **Get country currencies by CCA2**:

        http://base_api_url/countries/<Country_CCA2>/currencies

  - **Group countries by region**:

        http://base_api_url/countries/group/?region=<Country_Region>

  - **Group countries by language**:

        http://base_api_url/countries/group/?lang=<Country_language>

  - **Download countries (Admins)**:

        http://base_api_url/countries/download


- ## API Requests Examples
  - [Postman collection](./data//countries_api.postman_collection.json)
