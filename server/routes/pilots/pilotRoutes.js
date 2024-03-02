const express = require("express");
const router = express.Router();
const PilotService = require("../../services/pilots/pilotService");
const { registerValidation, loginValidation } = require('../../utils/validation');

const verifyToken = require("../../middleware/verifyToken");

// Pilot Routes

router.get("/pilots", async (req, res) => {
  try {
    const pilots = await PilotService.getAllPilots();
    res.status(200).json(pilots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pilots" });
  }
});

router.get("/pilots/:pilotId", async (req, res) => {
  const pilotId = req.params.pilotId;
  try {
    const pilot = await PilotService.getPilotById(pilotId);
    if (!pilot) {
      res.status(404).json({ error: "Pilot not found" });
    } else {
      res.status(200).json(pilot);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pilot" });
  }
});

router.post("/register", async (req, res) => {
  // const { error } = registerValidation.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }
  const newPilot = req.body;
  // console.log(newPilot)
  try {
    
    
    const result = await PilotService.createPilot(newPilot);
    res.status(201).json({ message: 'Pilot created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new pilot' });
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  // const { error } = loginValidation.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }
  try {
    const { email, Password } = req.body;
 
    const result = await PilotService.loginUser(email, Password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});



router.put("/pilots/:pilotId", async (req, res) => {
  const pilotId = req.params.pilotId;
  const updatedPilot = req.body;
  try {
    const result = await PilotService.updatePilot(pilotId, updatedPilot);
    res.status(200).json({ message: 'Pilot updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the pilot' });
  }
});

module.exports = router