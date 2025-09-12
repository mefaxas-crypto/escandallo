import React, { useState } from 'react';
import './IngredientSearch.css';

function IngredientSearch({ masterIngredients, onSelect, onAddNew }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filtered = masterIngredients.filter(ing =>
        ing.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (ingredientName) => {
    onSelect(ingredientName); // Pass the selected name back to the parent
    setQuery(ingredientName); // Show the full name in the input
    setResults([]); // Close the dropdown
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar o añadir ingrediente..."
        value={query}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setResults([]), 150)}
      />
      {results.length > 0 || query.length > 1 ? (
        <ul className="search-results">
          {results.map(ing => (
            <li key={ing.id} onClick={() => handleSelect(ing.name)}>
              {ing.name}
            </li>
          ))}
          {/* Add this special list item */}
          <li className="add-new-item" onClick={onAddNew}>
            + Añadir "{query}" como nuevo ingrediente
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default IngredientSearch;