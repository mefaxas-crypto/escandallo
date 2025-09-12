import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import Ingredients from './components/Ingredients';
import Recipes from './components/Recipes';
import Modal from './components/Modal';
import AddIngredientForm from './components/AddIngredientForm';
import './App.css';

// Helper function to calculate cost per gram
const calculateCostPerGram = (quantity, unit, cost) => {
  const CONVERSIONS = { g: 1, kg: 1000, lb: 453.592, oz: 28.3495, l: 1000, ml: 1 };
  if (unit === 'un.') {
    return cost / (quantity || 1);
  }
  const totalGrams = quantity * (CONVERSIONS[unit] || 0);
  return totalGrams > 0 ? cost / totalGrams : 0;
};


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    try {
      const ingredientsCollection = collection(db, 'ingredients');
      const querySnapshot = await getDocs(ingredientsCollection);
      const ingredientsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(ingredientsList);
    } catch (error) {
      console.error("Error fetching ingredients: ", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleAddNewIngredient = async (newIngredientData) => {
    try {
      // Calculate cost per gram before saving
      const costPerGram = calculateCostPerGram(newIngredientData.purchaseQuantity, newIngredientData.purchaseUnit, newIngredientData.purchaseCost);
      
      const docRef = await addDoc(collection(db, 'ingredients'), {
        ...newIngredientData,
        costPerGram
      });
      console.log("New ingredient added with ID: ", docRef.id);
      
      setIsModalOpen(false); // Close modal
      fetchIngredients(); // Refresh the master ingredient list
    } catch (error) {
      console.error("Error adding new ingredient: ", error);
      alert("Failed to add new ingredient.");
    }
  };


  return (
    <Router>
      <div className="container">
        <header className="app-header">
          <img src="/logo.png" alt="Hotel Logo" className="logo" />
        </header>
        <main>
          <Navbar />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Calculator masterIngredients={ingredients} onAddNewIngredient={() => setIsModalOpen(true)} />} />
              <Route path="/ingredients" element={<Ingredients masterIngredients={ingredients} loading={loading} />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddIngredientForm
          onSave={handleAddNewIngredient}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Router>
  );
}

export default App;