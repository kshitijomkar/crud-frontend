import React, { useState, useEffect } from 'react';

const BACKEND_URL = 'https://crud-backend.onrender.com'; // use the actual URL after deploy

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '' });

  useEffect(() => {
    fetch(`${BACKEND_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = () => {
    fetch(`${BACKEND_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(item => setItems([...items, item]));
  };

  return (
    <div>
      <h1>CRUD App Frontend</h1>
      <input
        placeholder="ID"
        value={newItem.id}
        onChange={e => setNewItem({ ...newItem, id: e.target.value })}
      />
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.id}: {item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
