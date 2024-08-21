require("dotenv").config({ path: "../../.env" });
const express = require("express");
const eventsRouter = express.Router();

const apiKey = process.env.TICKETMASTER_API_KEY;

// const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=family&city=London&apikey=${apiKey}`;

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

eventsRouter.get("/", async (req, res) => {
  const keyword = req.query.keyword;

  const baseUrl = "https://app.ticketmaster.com/discovery/v2/";
  try {
    const result = await apiClient(baseUrl, "/events.json", {
      // params - doesn't display events with postalCode + radius... look into geoPoint
      // if keyword is provided, add it to query - else default to empty object
      // ...(keyword ? { keyword } : {}),
      // classificationName: "Family",
      city: "London",
      includeFamily: "yes",
      // onsaleEndDateTime: "2024-12-25T12:30:00Z",
      // endDateTime: "2024-12-25T12:30:00Z",
      // keyword: "Dungeon",
      // latlong: "51.513561,-0.137706",
      // radius: 10,
      size: 200,
      apikey: apiKey,
    });

    // find _embedded within result, then find events within _embedded - to only get events from result and not links + pages
    // default to empty array if no events found instead of undefined
    const events = result?.["_embedded"]?.events || [];

    return res.status(200).json(events);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to retrieve events", err });
  }
});

module.exports = eventsRouter;
