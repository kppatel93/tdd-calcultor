import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  function add(numbers) {
    if (numbers === '') return 0;
    const parts = numbers.split(',');
    let total = 0;
    const negatives = [];

    console.log(parts);
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (num < 0) {
        negatives.push(num);
      } else {
        total += num;
      }
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
    } catch (err) {
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
    </div>
  );
};

export default Calculator;