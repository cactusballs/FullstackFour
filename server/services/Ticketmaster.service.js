require("dotenv").config({ path: "../../.env" });

// events

const apiKey = process.env.TICKETMASTER_API_KEY;

// const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=family&city=London&apikey=${apiKey}`;

const baseUrl = "https://app.ticketmaster.com/discovery/v2/";

const apiClient = async (baseUrl, path, queryParams) => {
  const url = new URL(`${baseUrl}${path}`);

  if (queryParams) {
    // pass query params as an object and convert to ?, & , string ... apikey should be at the end
    url.search = new URLSearchParams(queryParams).toString();
  }

  // using fetch (without node-fetch) & parse url as string
  const response = await fetch(url.toString(), { method: "GET" });
  console.log("url", url.toString());
  // checking response headers to see if it has content type = application/json
  const isResponseJson = response.headers
    .get("Content-Type")
    .includes("application/json");

  // if the response = json, execute the await response.json(), else make response = text
  const result = isResponseJson ? await response.json() : await response.text();

  return result;
};

// create endpoint receiving form data from frontend, backend uses this data to make request to external API, applying filter criteria
// on backend, parse user's input from the form submission. Include query params, form data, JSON payloads depending on how frontend sends the data.
//call external API with filters to build a query/modify request to external API, fetch data from external API using modified query
// process and return filtered data once receiving data from external API, return it to frontend.

module.exports = apiClient;
