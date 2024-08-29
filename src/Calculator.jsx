import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function add(numbers) {
    if (numbers === '') return 0;

    // Handle delimiter
    let delimiter = ',';
    if (numbers.startsWith('//')) {
      const delimiterEnd = numbers.indexOf('\n');
      delimiter = numbers.substring(2, delimiterEnd);
      numbers = numbers.substring(delimiterEnd + 1);
    }
    const parts = numbers.split(new RegExp(`[${delimiter}\n]`));
    let total = 0;
    const negatives = [];

    for (const part of parts) {
      const num = parseInt(part, 10);
      if (num < 0) {
        negatives.push(num);
      } else {
        total += num;
      }
    }

    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    return total;
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const result = add(input);
      setResult(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleChange}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <h2>Result: {result}</h2>}
      {error && <h2 style={{ color: 'red' }}>Error: {error}</h2>}
    </div>
  );
};

export default Calculator;