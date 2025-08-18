import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase.js';
import Nav from './components/Nav.jsx';
import RecipeCalculator from './components/RecipeCalculator.jsx';
import IngredientLibrary from './components/IngredientLibrary.jsx';
import Menus from './components/Menus.jsx';

export default function App() {
  const [view, setView] = useState('calculator');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, user => {
      if (!user) signInAnonymously(auth);
    });

    const unsubIngredients = onSnapshot(collection(db, 'ingredients'), snap => {
      setIngredients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubRecipes = onSnapshot(collection(db, 'recipes'), snap => {
      setRecipes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMenus = onSnapshot(collection(db, 'menus'), snap => {
      setMenus(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubAuth();
      unsubIngredients();
      unsubRecipes();
      unsubMenus();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav view={view} setView={setView} />
      {view === 'calculator' && (
        <RecipeCalculator ingredients={ingredients} menus={menus} />
      )}
      {view === 'ingredients' && <IngredientLibrary ingredients={ingredients} />}
      {view === 'dishes' && <Menus recipes={recipes} menus={menus} />}
    </div>
  );
}
