const express = require("express");
const router = express.Router();
const SprayingService = require("../../services/services/spraying_formService");

router.get("/", async (req, res) => {
  try {
    const sprayingForms = await SprayingService.getAllSprayingForms();
    res.status(200).json(sprayingForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch spraying forms" });
  }
});

router.get("/:sprayingFormId", async (req, res) => {
  const sprayingFormId = req.params.sprayingFormId;
  try {
    const sprayingForm = await SprayingService.getSprayingFormsById(sprayingFormId);
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

router.get("/form/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await SprayingService.getSprayingFormsByUserId(userId);
    if (!user) {
      res.status(404).json({ error: "Spraying form not found with this user" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch spraying form with this user" });
  }
});

router.post("/", async (req, res) => {
  const newSprayingForm = req.body;
  try {
    const result = await SprayingService.createSprayingForms(newSprayingForm);
    res.status(201).json({ message: 'Your request have been submitted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new spraying form' });
  }
});

router.put("/update_status/:sprayingId", async (req, res) => {
  const sprayingId = req.params.sprayingId;
  const {sprayingStatus} = req.body;
  try {
    const result = await SprayingService.updateSprayingForms(sprayingId, sprayingStatus);
    console.log(sprayingId, sprayingStatus)
    res.status(200).json({ message: 'Spraying form updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the spraying form' });
  }
});

router.delete("/delete_form/:sprayingFormId", async (req, res) => {
  const sprayingFormId = req.params.sprayingFormId;
  try {
    const result = await SprayingService.deleteSprayingForms(sprayingFormId);
    res.status(200).json({ message: 'Spraying form deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the spraying form' });
  }
});

router.put("/cancel_request/:sprayingId", async (req, res) => {
  const sprayingId = req.params.sprayingId;
  try {
    const result = await SprayingService.cancelSprayingForms(sprayingId);
    res.status(200).json({ message: 'Spraying request cancelled successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the spraying request' });
  }
});

module.exports = router;
