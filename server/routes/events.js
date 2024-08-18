import apiClient from "./services/Ticketmaster.service.js";

app.get("/events", async (req, res) => {
  const keyword = req.query.keyword;
  // try to add more queries

  try {
    const result = await apiClient(baseUrl, "/events.json", {
      // params - doesn't display events with postalCode + radius... look into geoPoint
      keyword,
      classificationName: "family",
      city: "london",
      // keyword: "Dungeon",
      // latlong: "51.513561,-0.137706",
      // radius: 10,
      size: 20,
      apikey: apiKey,
    });

    // find _embedded within result, then find events within _embedded - to only get events from result and not links + pages
    // default to empty array if no events found instead of undefined
    const events = result?.["_embedded"]?.events || [];

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to retrieve events", err });
  }
});
