// const express = require("express");
// const Router = express.Router();
// const axios = require("axios");
// require("dotenv").config(); // Make sure this is at the TOP

// const API_KEY = process.env.AVIATIONSTACK_API_KEY;

// Router.get("/search", async (req, res) => {
//   const { from, to, date } = req.query;

//   try {
//     const response = await axios.get("https://api.aviationstack.com/v1/flights", {
//       params: {
//         access_key: API_KEY,
//         dep_iata: from,
//         arr_iata: to,
//         flight_date: date,
//       },
//     });

//     if (!response.data || !response.data.data) {
//       return res.status(404).json({ error: "No flight data found" });
//     }

//     const flights = response.data.data.filter(flight =>
//       flight.departure.iata === from && flight.arrival.iata === to
//     );

//     res.json(flights);
//   } catch (err) {
//     console.error("Flight API Error:", err.message);
//     res.status(500).json({ error: "Flight search failed" });
//   }
// });

// module.exports = Router;



// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();

// // Amadeus API credentials
// const client_id = process.env.AMADEUS_CLIENT_ID;
// const client_secret = process.env.AMADEUS_CLIENT_SECRET;

// let accessToken = null;
// let tokenExpiry = null;

// // Get Amadeus access token
// async function getAccessToken() {
//   if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
//     return accessToken;
//   }

//   const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', null, {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     params: {
//       grant_type: 'client_credentials',
//       client_id,
//       client_secret,
//     },
//   });

//   accessToken = response.data.access_token;
//   tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
//   return accessToken;
// }

// // Flight search endpoint
// router.get('/api/flight-search', async (req, res) => {
//   try {
//     const { from, to, date, adults } = req.query;

//     const origin = from?.trim().toUpperCase();
//     const destination = to?.trim().toUpperCase();

//     if (!origin || !destination || origin.length !== 3 || destination.length !== 3 || !date) {
//       return res.status(400).json({ error: "Please use valid 3-letter IATA codes for 'from' and 'to'" });
//     }

//     const token = await getAccessToken();

//     const amadeusResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         originLocationCode: origin,
//         destinationLocationCode: destination,
//         departureDate: date,
//         adults: adults || 1,
//         max: 5,
//       },
//     });

//     res.json(amadeusResponse.data);
//   } catch (err) {
//     console.error('Flight Search Error:', err.response?.data || err.message);
//     res.status(500).json({ error: 'Flight search failed', detail: err.response?.data });
//   }
// });

// export default router;

// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();

// const router = express.Router();
// const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
// const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// // Step 1: Get Access Token
// async function getAccessToken() {
//     try {
//         const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
//             new URLSearchParams({
//                 grant_type: 'client_credentials',
//                 client_id: AMADEUS_API_KEY,
//                 client_secret: AMADEUS_API_SECRET
//             }),
//             { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//         );
//         return response.data.access_token;
//     } catch (err) {
//         console.error("Token Error:", err.response?.data || err.message);
//         throw new Error("Amadeus token failed");
//     }
// }

// // Step 2: Get IATA Code
// async function getIATACode(city, accessToken) {
//   try {
//     const res = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
//       params: {
//         keyword: city,
//         subType: 'CITY,AIRPORT', // 🟢 Updated
//         'page[limit]': 1
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     });

//     const data = res.data.data;
//     return data.length ? data[0].iataCode : null;
//   } catch (err) {
//     console.error(`Error getting IATA code for ${city}:`, err.response?.data || err.message);
//     return null;
//   }
// }


// // Step 3: Flight Search Route
// router.get('/search', async (req, res) => {
//     const { origin, destination, departureDate, returnDate, adults } = req.query;

//     try {
//         const accessToken = await getAccessToken();

//         // Convert city names to IATA codes
//         const originCode = await getIATACode(origin, accessToken);
//         const destCode = await getIATACode(destination, accessToken);

//        if (!originCode || !destCode) {
//   console.error("Invalid location(s):", { originCode, destCode });
//   return res.status(400).json({ error: "Could not resolve city to airport code" });
// }


//         // Now fetch flight offers
//         const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
//             params: {
//                 originLocationCode: originCode,
//                 destinationLocationCode: destCode,
//                 departureDate,
//                 returnDate,
//                 adults,
//                 currencyCode: "USD",
//                 max: 10
//             },
//             headers: { Authorization: `Bearer ${accessToken}` }
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error("Flight search failed:", error.response?.data || error.message);
//         res.status(500).json({ error: error.response?.data || "Internal server error" });
//     }
// });

// module.exports = router;


const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;



module.exports = router;