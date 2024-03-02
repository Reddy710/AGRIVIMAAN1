const express = require('express');
const router = express.Router();
const FeedbackFormService = require('../../services/users/feedbackFormService');

router.get('/', async (req, res) => {
  try {
    const feedbackForms = await FeedbackFormService.getAllFeedbackForms();
    res.status(200).json(feedbackForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch feedback forms' });
  }
});

router.get('/:feedbackId', async (req, res) => {
  const feedbackId = req.params.feedbackId;
  try {
    const feedbackForm = await FeedbackFormService.getFeedbackFormById(feedbackId);
    if (!feedbackForm) {
      res.status(404).json({ error: 'Feedback form not found' });
    } else {
      res.status(200).json(feedbackForm);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch feedback form' });
  }
});

router.post('/', async (req, res) => {
  const newFeedbackForm = req.body;
  try {
    const result = await FeedbackFormService.createFeedbackForm(newFeedbackForm);
    res.status(201).json({ message: 'Feedback form created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new feedback form' });
  }
});

router.put('/:feedbackId', async (req, res) => {
  const feedbackId = req.params.feedbackId;
  const updatedFeedbackForm = req.body;
  try {
    const result = await FeedbackFormService.updateFeedbackForm(feedbackId, updatedFeedbackForm);
    res.status(200).json({ message: 'Feedback form updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the feedback form' });
  }
});

router.delete('/:feedbackId', async (req, res) => {
  const feedbackId = req.params.feedbackId;
  try {
    const result = await FeedbackFormService.deleteFeedbackForm(feedbackId);
    res.status(200).json({ message: 'Feedback form deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the feedback form' });
  }
});

router.post('/create-table', async (req, res) => {
  try {
    const result = await FeedbackFormService.createTable();
    res.status(200).json({ message: 'FeedbackForm table created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create FeedbackForm table' });
  }
});

module.exports = router;
