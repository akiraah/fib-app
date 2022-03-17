import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [indexes, setIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get('/api/values/current');
      console.log(values);
      setValues(values.data);
    };

    const fetchIndexes = async () => {
      const indexes = await axios.get('/api/values/all');
      setIndexes(indexes.data);
    };

    fetchValues().catch(console.error)
    fetchIndexes().catch(console.error)
  }, []);

  const renderValues = (event) =>
    Object.keys(values).map((key) => {
      return (
        <div key={key}>
          For index {key} I've calculated {values[key]}
        </div>
      );
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex({ index: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(event)=> setIndex(event.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes i've seen</h3>
      {indexes.map((index) => (
        <p>{index}</p>
      ))}
      <h3>Calculated values</h3>
      {renderValues}
    </div>
  );
};

export default Fib;
