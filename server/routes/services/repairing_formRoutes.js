const express = require("express");
const router = express.Router();
const RepairService = require("../../services/services/repairing_formService");

router.get("/", async (req, res) => {
  try {
    const forms = await RepairService.getAllRepairForms();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

router.get("/:formId", async (req, res) => {
  const formId = req.params.formId;
  try {
    const form = await RepairService.getRepairFormsById(formId);
    if (!form) {
      res.status(404).json({ error: "Form not found" });
    } else {
      res.status(200).json(form);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});

router.get("/form/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await RepairService.getRepairFormsByUserId(userId);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch userForms" });
  }
});

router.post("/", async (req, res) => {
  const newForm = req.body;
  try {
    const result = await RepairService.createRepairForms(newForm);
    res.status(201).json({ message: 'Your request have been submitted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new form' });
  }
});

router.put("/update_status/:repairId", async (req, res) => {
  const repairId = req.params.repairId;
  const { repairStatus } = req.body;
  try {
    const result = await RepairService.updateRepairForms(repairId, repairStatus);
    console.log(repairId, repairStatus)
    res.status(200).json({ message: 'Form updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the form' });
  }
});

router.delete("/delete_form/:repairId", async (req, res) => {
  const repairId = req.params.repairId;
  try {
    const result = await RepairService.deleteRepairForms(repairId);
    res.status(200).json({ message: 'Form deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the form' });
  }

});

router.put("/cancel_request/:repairId", async (req, res) => {
  const repairId = req.params.repairId;
  try {
    const result = await RepairService.cancelRepairForms(repairId);
    res.status(200).json({ message: 'Form cancelled successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the form' });
  }
});

module.exports = router;
