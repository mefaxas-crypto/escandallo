import React, { useState } from 'react';

export default function RecipeCalculator({ ingredients, menus }) {
  const [recipeItems, setRecipeItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState('');

  const addItem = () => {
    const ing = ingredients.find(i => i.id === selected);
    if (!ing || !quantity) return;
    setRecipeItems([...recipeItems, { ingredient: ing, quantity: parseFloat(quantity) }]);
    setSelected('');
    setQuantity('');
  };

  const totalCost = recipeItems.reduce((sum, item) => {
    const pricePerUnit = item.ingredient.cost / item.ingredient.quantity;
    return sum + pricePerUnit * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Calculadora de Recetas</h2>
      <div className="flex space-x-2 mb-4">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="border p-1 flex-1"
        >
          <option value="">Seleccione ingrediente</option>
          {ingredients.map(i => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Cantidad"
          className="border p-1 w-24"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-2">Añadir</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {recipeItems.map((item, idx) => (
            <tr key={idx}>
              <td>{item.ingredient.name}</td>
              <td>{item.quantity}</td>
              <td>
                {(
                  (item.ingredient.cost / item.ingredient.quantity) * item.quantity
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 font-bold">Costo total: {totalCost.toFixed(2)}</div>
    </div>
  );
}
