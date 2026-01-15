import { useState } from 'react';

/**
 * RecipeFinder Component
 * A React component that allows users to search for recipes based on ingredients.
 * Communicates with the backend API (which proxies requests to Spoonacular) to fetch
 * matching recipes and displays them in a responsive grid layout.
 */
export default function RecipeFinder() {
  // State for storing the user's ingredient input (comma-separated list)
  const [ingredients, setIngredients] = useState('');
  
  // State for storing the list of recipes returned from the API
  const [recipes, setRecipes] = useState([]);
  
  // State for tracking loading status to show "Searching..." feedback to the user
  const [loading, setLoading] = useState(false);
  
  // State for storing and displaying error messages to the user
  const [error, setError] = useState('');

  /**
   * Fetches recipes from the backend API based on user-provided ingredients
   * This function validates input, calls the backend proxy endpoint, handles errors,
   * and updates component state with results or error messages
   */
  const handleFindRecipes = async () => {
    // Validate that the user has entered at least one ingredient
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    // Set loading state to true to show "Searching..." feedback and disable button
    setLoading(true);
    // Clear any previous error messages before new search
    setError('');
    // Clear previous results to avoid confusion with old data
    setRecipes([]);

    try {
      // Construct the API URL with ingredient query parameter (URL-encoded for safety)
      // This calls the local backend which securely proxies to Spoonacular API
      const backendApiUrl = `http://localhost:4000/api/recipes?ingredients=${encodeURIComponent(
        ingredients
      )}`;
      
      // Make HTTP GET request to the backend endpoint
      const fetchResponse = await fetch(backendApiUrl);

      // Check if the HTTP response status indicates success (200-299)
      if (!fetchResponse.ok) {
        throw new Error('Failed to fetch recipes from backend API');
      }

      // Parse the JSON response body containing recipe array
      const recipeDataArray = await fetchResponse.json();
      
      // Update the recipes state with the fetched results for rendering
      setRecipes(recipeDataArray);
    } catch (fetchError) {
      // Display error message to the user for debugging purposes
      setError(
        fetchError.message || 'An error occurred while fetching recipes'
      );
      // Log full error to browser console for developer inspection
      console.error(fetchError);
    } finally {
      // Set loading state to false regardless of success/failure to re-enable UI
      setLoading(false);
    }
  };

  /**
   * Handles keyboard events in the input field
   * Allows users to trigger recipe search by pressing Enter key
   */
  const handleKeyPress = (keyboardEvent) => {
    if (keyboardEvent.key === 'Enter') {
      handleFindRecipes();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Recipe Finder</h1>

      {/* Search input and button section */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(inputEvent) => setIngredients(inputEvent.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleFindRecipes}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>
      </div>

      {/* Display error message if API call fails */}
      {error && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {/* Display loading spinner/message while API request is in progress */}
      {loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '18px',
            color: '#666',
          }}
        >
          Searching...
        </div>
      )}

      {/* Display recipes in responsive grid layout when results are available */}
      {recipes.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Map through recipe array and render a card for each recipe */}
          {recipes.map((recipeItem) => (
            <div
              key={recipeItem.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(hoverEvent) => {
                hoverEvent.currentTarget.style.transform = 'translateY(-4px)';
                hoverEvent.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(leaveEvent) => {
                leaveEvent.currentTarget.style.transform = 'translateY(0)';
                leaveEvent.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Display recipe image */}
              <img
                src={recipeItem.image}
                alt={recipeItem.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              {/* Display recipe details (title and missed ingredient count) */}
              <div style={{ padding: '15px' }}>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: '10px',
                    fontSize: '18px',
                    color: '#333',
                  }}
                >
                  {recipeItem.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#666',
                  }}
                >
                  <strong>Missed Ingredients:</strong> {recipeItem.missedIngredientCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display message when search has been performed but no recipes found */}
      {!loading && recipes.length === 0 && ingredients && !error && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '16px',
            color: '#999',
          }}
        >
          No recipes found. Try different ingredients!
        </div>
      )}
    </div>
  );
}
