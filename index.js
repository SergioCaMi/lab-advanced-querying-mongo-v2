// importar el módulo
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sergiocami84:Msg--300183@cluster0.mo4mc0w.mongodb.net/?retryWrites=true&w=majority";

// Crear una instancia de MongoDB Client para conectarnos más tarde
const client = new MongoClient(uri);

// Crear una función asíncrona
async function connection() {
  // conectamos a nuestra base de
  try {
    await client.connect(); // Conectamos al cliente

    const db = client.db("companiesDB"); // Seleccionamos la base de datos
    const companies = db.collection("companies"); // Seleccionamos la colección

    // All the companies whose name match 'Babelgum'. Retrieve only their name field.
    let results = await companies.find({ name: "Babelgum" }, { projection: { name: 1, _id: 0 } }).toArray(); // Realizamos una consulta a la colección
    console.log(
      'All the companies whose name match "Babelgum". Retrieve only their name field.\n', results
    );

    // All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by number of employees.
 results = await companies
  .find({ number_of_employees: { $gt: 5000 } }, { projection: { name: 1, number_of_employees: 1 } })
  .limit(20)
  .sort({ number_of_employees: 1 })
  .toArray();
    console.log(
      "All the companies that have more than 5000 employees. Limit the search to 20 companies and sort them by number of employees.\n ", results
    );

    // All the companies founded between 2000 and 2005, both years included. Retrieve only the name and founded_year fields.
    results = await companies
      .find(
        {
          $and: [
            { founded_year: { $gte: 2000 } },
            { founded_year: { $lte: 2005 } },
          ],
        },
        {
          projection: { name: 1, founded_year: 1, _id: 0 }
        }
      )
      .limit(5)
      .toArray(); // <-- Añade esto
    console.log(
      "All the companies founded between 2000 and 2005, both years included. Retrieve only the name and founded_year fields.\n ",
      results
    );



    // All the companies that had a IPO Valuation Amount of more than 100,000,000 and have been founded before 2010. Retrieve only the name and ipo fields.

    // All the companies that don't include the partners field.

    // All the companies that have a null type of value on the category_code field.

    // Order all the companies by their IPO price in descending order.

    // Retrieve the 10 companies with the most employees, order by the number of employees.

    // All the companies founded in the second semester of the year (July to December). Limit your search to 1000 companies.

    // All the companies that have been founded on the first seven days of the month, including the seventh. Sort them by their acquisition price in descending order. Limit the search to 10 documents.
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close(); // Cerramos la conexión
  }
}

connection();
