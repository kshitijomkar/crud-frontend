import React, { useState, useEffect } from 'react';

const API_URL = 'https://crud-backend-z808.onrender.com/items';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '' });

  // Fetch items on load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Add new item
  const addItem = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data]);
        setNewItem({ id: '', name: '' });
      });
  };

  // Delete item
  const deleteItem = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CRUD App Frontend</h1>

      <input
        placeholder="ID"
        value={newItem.id}
        onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
      />
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.id}: {item.name}
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '1rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
