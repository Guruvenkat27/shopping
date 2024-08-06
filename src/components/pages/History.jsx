import React, { useEffect, useState } from 'react';

const History = () => {
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('viewedItems')) || [];
    setViewedItems(items);
  }, []);

  return (
    <div>
      <h2>Recently Viewed Items</h2>
      <ul>
        {viewedItems.map(item => (
          <li key={item.data.asin}>
            <h3>{item.data.product_title}</h3>
            <img src={item.data.product_photo} alt={item.data.product_title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
