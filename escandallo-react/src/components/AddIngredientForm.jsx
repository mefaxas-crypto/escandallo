import React, { useState } from 'react';

function AddIngredientForm({ onSave, onCancel }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [cost, setCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIngredient = {
      materialCode: parseInt(code),
      name,
      purchaseQuantity: parseFloat(quantity),
      purchaseUnit: unit,
      purchaseCost: parseFloat(cost),
      // costPerGram will be calculated on save
    };
    onSave(newIngredient);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ color: '#604029', marginBottom: '1.5rem' }}>Añadir Nuevo Ingrediente</h3>
      <div className="form-grid">
        <input type="number" placeholder="Código de Material (SAP)" value={code} onChange={(e) => setCode(e.target.value)} required />
        <input type="text" placeholder="Nombre del Ingrediente" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Cantidad de Compra" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="lb">lb</option>
          <option value="l">l</option>
          <option value="un.">un.</option>
        </select>
        <input type="number" placeholder="Costo del Paquete ($)" value={cost} onChange={(e) => setCost(e.target.value)} required step="0.01" />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-save">Guardar Ingrediente</button>
      </div>
    </form>
  );
}

export default AddIngredientForm;