import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = 'http://localhost:4000/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', bestBefore: '', shareable: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetches all products from the backend API
   * Sets error state if the request fails
   */
  async function fetchProducts() {
    try {
      setError('');
      const apiResponse = await axios.get(BACKEND_URL);
      setProducts(apiResponse.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error(err);
    }
  }

  /**
   * Handles form submission to add a new product
   * Clears the form after successful submission and refreshes the product list
   */
  async function addProduct(formEvent) {
    formEvent.preventDefault();

    // Validate that all fields are filled
    if (!form.name.trim() || !form.category.trim() || !form.bestBefore) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send product data to backend API including shareable status
      await axios.post(BACKEND_URL, {
        name: form.name,
        category: form.category,
        bestBefore: form.bestBefore,
        shareable: form.shareable,
      });

      // Reset form to initial state after successful submission
      setForm({ name: '', category: '', bestBefore: '', shareable: false });

      // Refresh the product list to show the newly added product
      fetchProducts();
    } catch (postError) {
      setError('Failed to add product. Please try again.');
      console.error(postError);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles claiming a product by sending a PATCH request to the backend
   * Updates the product's claimedBy field to "Student User" and refreshes the list
   * Only available for shareable products that haven't been claimed yet
   */
  async function handleClaim(productId) {
    // DEBUG: Log when button is clicked
    console.log('🔵 DEBUG: Claim button clicked for product ID:', productId);
    
    try {
      setError('');
      
      // DEBUG: Log before making the API request
      console.log('🔵 DEBUG: Sending PATCH request to:', `${BACKEND_URL}/${productId}`);
      
      // Send PATCH request to backend to claim the product
      const claimResponse = await axios.patch(`${BACKEND_URL}/${productId}`, {
        claimedBy: 'Student User',
      });

      // DEBUG: Log successful response
      console.log('✅ DEBUG: Claim successful! Response:', claimResponse.data);

      // Refresh the product list to immediately show the claimed status
      fetchProducts();
    } catch (claimError) {
      // DEBUG: Log error details
      console.error('❌ DEBUG: Claim failed! Error:', claimError);
      console.error('❌ DEBUG: Error message:', claimError.message);
      console.error('❌ DEBUG: Error response:', claimError.response);
      
      setError('Failed to claim product. Please try again.');
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <h1>♻️ Anti Food Waste App</h1>
        <p style={{ marginBottom: '20px', color: 'var(--text-light)' }}>
          Reduce waste, share food, save resources
        </p>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button
            onClick={() => setError('')}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '20px',
              padding: '0',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Add Product Form Section */}
      <section className="mt-40 mb-40">
        <h2>Add New Product</h2>

        <form onSubmit={addProduct} className="form-card">
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              className="input-field"
              type="text"
              placeholder="e.g., Tomatoes, Milk, Bread"
              value={form.name}
              onChange={(inputEvent) =>
                setForm({ ...form, name: inputEvent.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-category">Category</label>
            <input
              id="product-category"
              className="input-field"
              type="text"
              placeholder="e.g., Vegetables, Dairy, Bakery"
              value={form.category}
              onChange={(inputEvent) =>
                setForm({ ...form, category: inputEvent.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-date">Best Before Date</label>
            <input
              id="product-date"
              className="input-field"
              type="date"
              value={form.bestBefore}
              onChange={(inputEvent) =>
                setForm({ ...form, bestBefore: inputEvent.target.value })
              }
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              id="product-shareable"
              className="checkbox-input"
              type="checkbox"
              checked={form.shareable}
              onChange={(checkboxEvent) =>
                setForm({ ...form, shareable: checkboxEvent.target.checked })
              }
            />
            <label htmlFor="product-shareable" className="checkbox-label">
              Mark as Shareable
            </label>
          </div>

          <button
            className="btn-add btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : '+ Add Product'}
          </button>
        </form>
      </section>

      {/* Products List Section */}
      <section className="mt-40">
        <h2>Products in Your Fridge</h2>

        {products.length === 0 ? (
          <div className="alert alert-info">
            <p style={{ margin: 0 }}>
              No products yet. Add your first product above!
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Best Before</th>
                  <th>Shareable</th>
                  <th>Claimed By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((productItem) => (
                  <tr key={productItem.id}>
                    <td>
                      <span style={{ fontWeight: '600', color: 'var(--primary-green)' }}>
                        #{productItem.id}
                      </span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '15px' }}>{productItem.name}</strong>
                    </td>
                    <td>{productItem.category}</td>
                    <td>
                      {productItem.bestBefore ? (
                        <span>{productItem.bestBefore}</span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                          Not set
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          backgroundColor: productItem.shareable
                            ? '#C8E6C9'
                            : '#FFCDD2',
                          color: productItem.shareable
                            ? '#1B5E20'
                            : '#B71C1C',
                          fontWeight: '600',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {productItem.shareable ? '✓ Yes' : '✕ No'}
                      </span>
                    </td>
                    <td>
                      {productItem.claimedBy ? (
                        <span style={{ fontWeight: '500' }}>{productItem.claimedBy}</span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                          —
                        </span>
                      )}
                    </td>
                    <td>
                      {/* Show Claim button only if product is shareable and not claimed */}
                      {productItem.shareable && !productItem.claimedBy ? (
                        <button
                          className="btn-claim"
                          onClick={() => handleClaim(productItem.id)}
                          title="Claim this product"
                        >
                          Claim
                        </button>
                      ) : productItem.claimedBy ? (
                        /* Show "Claimed" badge if product is already claimed */
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#E8F5E9',
                            color: '#2E7D32',
                            fontWeight: '600',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                          }}
                        >
                          ✓ Claimed
                        </span>
                      ) : (
                        /* Show disabled message if product is not shareable */
                        <span
                          style={{
                            color: 'var(--text-light)',
                            fontSize: '12px',
                            fontStyle: 'italic',
                          }}
                        >
                          Not shareable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
