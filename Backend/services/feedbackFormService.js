const FeedbackForm = require('../models/feedbackFormModel');

class FeedbackFormService {
  static async getAllFeedbackForms() {
    try {
      return await FeedbackForm.getAllFeedbackForms();
    } catch (error) {
      throw error;
    }
  }

  static async getFeedbackFormById(feedbackId) {
    try {
      return await FeedbackForm.getFeedbackFormById(feedbackId);
    } catch (error) {
      throw error;
    }
  }

  static async createFeedbackForm(feedbackData) {
    try {
      const newFeedback = {
        UserID: feedbackData.UserID,
        FeedbackText: feedbackData.FeedbackText,
        Rating: feedbackData.Rating,
        FeedbackDate: feedbackData.FeedbackDate,
      };

      const createdFeedback = await FeedbackForm.createFeedbackForm(newFeedback);
      return createdFeedback;
    } catch (error) {
      throw error;
    }
  }

  static async updateFeedbackForm(feedbackId, updatedFeedback) {
    try {
      return await FeedbackForm.updateFeedbackForm(feedbackId, updatedFeedback);
    } catch (error) {
      throw error;
    }
  }

  static async deleteFeedbackForm(feedbackId) {
    try {
      return await FeedbackForm.deleteFeedbackForm(feedbackId);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await FeedbackForm.createFeedbackFormTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FeedbackFormService;
