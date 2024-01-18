const express = require("express");
const router = express.Router();
const DroneService = require("../services/droneService");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const drones = await DroneService.getAllDrones();
    res.status(200).json(drones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch drones" });
  }
});

router.get("/:droneId", async (req, res) => {
  const droneId = req.params.droneId;
  try {
    const drone = await DroneService.getDroneById(droneId);
    if (!drone) {
      res.status(404).json({ error: "Drone not found" });
    } else {
      res.status(200).json(drone);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch drone" });
  }
});

router.post("/", verifyToken, async (req, res) => {
    console.log(req.body);
    const newDrone = req.body;
    try {
      const result = await DroneService.createDrone(newDrone);
      res.status(201).json({ message: 'Drone created successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new drone' });
    }
});

router.put("/:droneId", async (req, res) => {
    const droneId = req.params.droneId;
  const updatedDrone = req.body;
  try {
    const result = await DroneService.updateDrone(droneId, updatedDrone);
    res.status(200).json({ message: 'Drone updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the drone' });
  }
});

module.exports = router;
