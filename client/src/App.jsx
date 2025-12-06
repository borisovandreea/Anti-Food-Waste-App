import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', bestBefore: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(BACKEND_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addProduct(e) {
    e.preventDefault();
    try {
      await axios.post(BACKEND_URL, { ...form });
      setForm({ name: '', category: '', bestBefore: '' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: 'Arial' }}>
      <h1>Anti Food Waste</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Add product</h2>
        <form onSubmit={addProduct}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={{ marginLeft: 8 }}
          />
          <input
            type="date"
            value={form.bestBefore}
            onChange={e => setForm({ ...form, bestBefore: e.target.value })}
            style={{ marginLeft: 8 }}
          />
          <button style={{ marginLeft: 8 }} type="submit">Add</button>
        </form>
      </section>

      <section>
        <h2>Products</h2>
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>BestBefore</th>
              <th>Shareable</th>
              <th>ClaimedBy</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.bestBefore}</td>
                <td>{p.shareable ? 'Yes' : 'No'}</td>
                <td>{p.claimedBy || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
