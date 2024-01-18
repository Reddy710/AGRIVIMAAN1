const express = require('express');
const searchService = require('../services/searchService')
const router = express.Router();

router.get('/', async (req, res) => {
 
    try {
      const searchTerm = req.query.term; // Assuming the client sends the search term as a query parameter
    console.log(searchTerm)
      // Construct and execute queries for each table
      const droneResults = await searchService.searchInTable('DroneInventory', searchTerm)
    //   const repairResults = await searchInTable('repairtable', searchTerm);
    //   const sprayResults = await searchInTable('chemicalspray', searchTerm);
  
      // Combine results into a unified format
      const searchResults = {
        drones: droneResults,
        // repairtable: repairResults,
        // chemicalspray: sprayResults,
        // Add more tables as needed
      };
  
      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router

