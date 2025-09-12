import React from 'react';

// This is now a "presentational" component. It receives data as props and displays it.
function Ingredients({ masterIngredients, loading }) {

  if (loading) {
    return <div className="view-container"><h2>Cargando Ingredientes...</h2></div>;
  }

  if (!masterIngredients || masterIngredients.length === 0) {
    return <div className="view-container"><h2>No se encontraron ingredientes en la base de datos.</h2></div>;
  }

  return (
    <div className="view-container">
      <h2 style={{ marginBottom: '1.5rem' }}>Gestión de Ingredientes</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="header-cell">Código</th>
              <th className="header-cell">Nombre</th>
              <th className="header-cell">Costo de Compra</th>
              <th className="header-cell">Costo/g</th>
              <th className="header-cell" style={{textAlign: 'right'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {masterIngredients.map(ing => (
              <tr key={ing.id}>
                <td className="table-cell">{ing.materialCode}</td>
                <td className="table-cell">{ing.name}</td>
                <td className="table-cell">${(ing.purchaseCost || 0).toFixed(2)} / {ing.purchaseQuantity} {ing.purchaseUnit}</td>
                <td className="table-cell">${(ing.costPerGram || 0).toFixed(4)}</td>
                <td className="table-cell" style={{textAlign: 'right'}}>
                  <button className="btn-edit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ingredients;