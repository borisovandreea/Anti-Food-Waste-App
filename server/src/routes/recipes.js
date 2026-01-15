// Import required modules for HTTP requests, routing, and environment variables
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

/**
 * GET route to fetch recipes filtered by ingredients from Spoonacular API
 * This endpoint acts as a backend proxy to securely call the external Spoonacular service
 * without exposing the API key to the frontend client.
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters from the URL
 * @param {string} req.query.ingredients - Comma-separated list of ingredients to search for (required)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function for centralized error handling
 * @returns {Promise<void>} JSON response containing array of recipes matching the provided ingredients
 * @throws {Error} If API request fails, ingredients parameter is missing, or network error occurs
 *
 * @example
 * // Request: GET http://localhost:4000/api/recipes?ingredients=tomato,cheese
 * // Response: [{ id: 123, title: "Tomato Pasta", image: "...", missedIngredientCount: 0 }, ...]
 */
router.get('/', async (req, res, next) => {
  try {
    // Extract the ingredients query parameter from the request URL
    const { ingredients } = req.query;

    // Validate that ingredients parameter was provided by the frontend
    if (!ingredients) {
      return res.status(400).json({ error: 'ingredients query parameter is required' });
    }

    // Make HTTP GET request to Spoonacular API endpoint to fetch recipes
    // This external API call finds recipes that match the user's ingredient list
    const spoonacularApiResponse = await axios.get(
      'https://api.spoonacular.com/recipes/findByIngredients',
      {
        params: {
          // Use the secure environment variable to authenticate with Spoonacular
          apiKey: process.env.SPOONACULAR_API_KEY,
          ingredients: ingredients,
        },
      }
    );

    // Return the filtered recipe data to the frontend
    res.json(spoonacularApiResponse.data);
  } catch (err) {
    // Pass error to centralized error handling middleware for logging and proper response
    next(err);
  }
});

module.exports = router;
