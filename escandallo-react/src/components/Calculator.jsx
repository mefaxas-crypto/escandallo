import React, { useState, useMemo, useEffect } from 'react';
import IngredientSearch from './IngredientSearch';
import ToggleSwitch from './ToggleSwitch';
import { UNITS } from '../constants';
import './Calculator.css';

// The calculator now receives two functions as props from App.jsx
function Calculator({ masterIngredients, onAddNewIngredient }) {
  // --- STATE ---
  const [recipeName, setRecipeName] = useState('');
  const [recipeYield, setRecipeYield] = useState(1);
  const [yieldUnit, setYieldUnit] = useState('un.');
  const [ingredients, setIngredients] = useState([]);
  const [addName, setAddName] = useState('');
  const [addQuantity, setAddQuantity] = useState('');
  const [isFinalDish, setIsFinalDish] = useState(true);

  // --- EFFECTS ---
  useEffect(() => {
    document.title = recipeName || 'Recipe Costing Control';
  }, [recipeName]);

  // --- HANDLERS ---
  const handleAddIngredient = () => {
    const foundIngredient = masterIngredients.find(item => item.name.toLowerCase() === addName.toLowerCase());
    if (!foundIngredient || !addQuantity || addQuantity <= 0) {
      alert('Ingrediente o cantidad no válida.');
      return;
    }
    const newIngredient = { ...foundIngredient, idInRecipe: Date.now(), quantity: parseFloat(addQuantity), unit: 'g', totalCost: parseFloat(addQuantity) * (foundIngredient.costPerGram || 0) };
    setIngredients([...ingredients, newIngredient]);
    setAddName('');
    setAddQuantity('');
  };

  const handleRemoveIngredient = (idToRemove) => setIngredients(ingredients.filter(ing => ing.idInRecipe !== idToRemove));
  
  const handleClearRecipe = () => {
    setRecipeName('');
    setRecipeYield(1);
    setYieldUnit('un.');
    setIngredients([]);
    setIsFinalDish(true);
  };
  
  const handleSaveRecipe = () => {
    if (!recipeName || ingredients.length === 0) {
      alert('La receta debe tener un nombre y al menos un ingrediente.');
      return;
    }
    const recipeToSave = { name: recipeName, yield: recipeYield, yieldUnit, ingredients, totalCost, isFinalDish };
    console.log('RECIPE SAVED:', recipeToSave);
    alert(`Receta "${recipeName}" guardada en la consola.`);
  };

  // --- CALCULATIONS ---
  const costMP = useMemo(() => ingredients.reduce((sum, ing) => sum + ing.totalCost, 0), [ingredients]);
  const costPP = recipeYield > 0 ? costMP / recipeYield : 0;
  const imprevistos = costMP * 0.05;
  const totalCost = costMP + imprevistos;

  return (
    <div className="calculator-view">
      <div className="recipe-header">
        <div className="form-group recipe-name">
          <label htmlFor="recipe-name">Nombre de la Receta</label>
          <input type="text" id="recipe-name" placeholder="Ej: Caldo de Pollo" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
        </div>
        <div className="form-group recipe-yield">
          <label htmlFor="recipe-yield">Rendimiento</label>
          <input type="number" id="recipe-yield" value={recipeYield} onChange={(e) => setRecipeYield(e.target.value)} />
        </div>
        <div className="form-group recipe-unit">
          <label htmlFor="recipe-yield-unit">Unidad</label>
          <select id="recipe-yield-unit" value={yieldUnit} onChange={(e) => setYieldUnit(e.target.value)}>
            {UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tipo de Receta</label>
          <ToggleSwitch
            isOn={isFinalDish}
            handleToggle={() => setIsFinalDish(!isFinalDish)}
            offLabel="Producto Interno"
            onLabel="Plato Final"
          />
        </div>
        <div className="form-group">
          <button className="btn-clear" onClick={handleClearRecipe}>Limpiar Receta</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="header-cell">Código</th>
              <th className="header-cell" style={{width: '40%'}}>Ingredientes</th>
              <th className="header-cell">Cantidad</th>
              <th className="header-cell">Un.</th>
              <th className="header-cell">Precio Unitario</th>
              <th className="header-cell">Importe</th>
              <th className="header-cell"></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.length === 0 ? (
              <tr><td colSpan="7" className="empty-row">La receta está vacía.</td></tr>
            ) : (
              ingredients.map((ing) => (
                <tr key={ing.idInRecipe}>
                  <td className="table-cell">{ing.materialCode}</td>
                  <td className="table-cell">{ing.name}</td>
                  <td className="table-cell">{ing.quantity}</td>
                  <td className="table-cell">{ing.unit}</td>
                  <td className="table-cell">${(ing.costPerGram || 0).toFixed(2)}</td>
                  <td className="table-cell">${(ing.totalCost || 0).toFixed(2)}</td>
                  <td className="table-cell" style={{textAlign: 'right'}}><button className="btn-remove" onClick={() => handleRemoveIngredient(ing.idInRecipe)}>X</button></td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="add-ingredient-row">
              <td></td>
              <td>
                <IngredientSearch
                  masterIngredients={masterIngredients}
                  onSelect={(name) => setAddName(name)}
                  onAddNew={onAddNewIngredient} 
                />
              </td>
              <td><input type="number" placeholder="Gramos" style={{width: '8rem'}} value={addQuantity} onChange={(e) => setAddQuantity(e.target.value)} /></td>
              <td>g</td>
              <td></td>
              <td></td>
              <td style={{textAlign: 'right'}}><button className="btn-add" onClick={handleAddIngredient}>Añadir</button></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="summary-section">
        <div className="summary-column">
          <div className="summary-item"><span>Costo M.P.</span><span>${costMP.toFixed(2)}</span></div>
          <div className="summary-item"><span>Costo P/P</span><span>${costPP.toFixed(2)}</span></div>
          <div className="summary-item"><span>Imprevistos (5%)</span><span>${imprevistos.toFixed(2)}</span></div>
          <hr /><div className="summary-item total"><span>Costo Total</span><span>${totalCost.toFixed(2)}</span></div>
        </div>
        {isFinalDish && (
          <div className="summary-column">
            <div className="summary-item"><span>% de Costo</span><span>30%</span></div>
            <div className="summary-item"><span>Precio Sugerido</span><span>$0.00</span></div>
            <div className="summary-item"><span>ITBIS (18%)</span><span>$0.00</span></div>
            <hr /><div className="summary-item total"><span>Precio Factura</span><span>$0.00</span></div>
          </div>
        )}
        <div className="summary-column"><button className="btn-save" onClick={handleSaveRecipe}>{isFinalDish ? 'Guardar Plato Final' : 'Guardar Producto Interno'}</button></div>
      </div>
    </div>
  );
}

export default Calculator;