const express = require("express");
const router = express.Router();
const connection = require('../config/db')

router.get('/api/search', async (req, res) => {
    const { searchTerm } = req.query;
  
    try {
      
      const searchQuery = `
        SELECT * FROM DroneInventory
        WHERE drone_name LIKE ?
      `;
      const [results] = await connection.query(searchQuery, [`%${searchTerm}%`]);
     
      res.json(results);
    } catch (error) {
      console.error('Error executing search query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;