const express = require("express");
const router = express.Router();
const SprayingFormService = require("../services/spraying_formService");


router.get("/", async (req, res) => {
  try {
    const sprayingForms = await SprayingFormService.getAllSprayingForms();
    res.status(200).json(sprayingForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch spraying forms" });
  }
});

router.get("/:sprayingFormId", async (req, res) => {
  const sprayingFormId = req.params.sprayingFormId;
  try {
    const sprayingForm = await SprayingFormService.getSprayingFormById(sprayingFormId);
    if (!sprayingForm) {
      res.status(404).json({ error: "Spraying form not found" });
    } else {
      res.status(200).json(sprayingForm);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch spraying form" });
  }
});

router.post("/", async (req, res) => {
  const newSprayingForm = req.body;
  try {
    const result = await SprayingFormService.createSprayingForms(newSprayingForm);
    res.status(201).json({ message: 'Spraying form created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new spraying form' });
  }
});

router.put("/:sprayingFormId", async (req, res) => {
  const sprayingFormId = req.params.sprayingFormId;
  const updatedSprayingForm = req.body;
  try {
    const result = await SprayingFormService.updateSprayingForms(sprayingFormId, updatedSprayingForm);
    res.status(200).json({ message: 'Spraying form updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the spraying form' });
  }
});

router.delete("/:sprayingFormId", async (req, res) => {
  const sprayingFormId = req.params.sprayingFormId;
  try {
    const result = await SprayingFormService.deleteSprayingForms(sprayingFormId);
    res.status(200).json({ message: 'Spraying form deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the spraying form' });
  }
});

module.exports = router;
