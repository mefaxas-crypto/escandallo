import React from 'react';

export default function IngredientLibrary({ ingredients }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Biblioteca de Ingredientes</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad Compra</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id}>
              <td>{ing.name}</td>
              <td>{ing.quantity} {ing.unit}</td>
              <td>{ing.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
