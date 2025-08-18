import React from 'react';

export default function Nav({ view, setView }) {
  return (
    <nav className="bg-white shadow mb-4">
      <ul className="flex p-4 space-x-4">
        <li>
          <button
            className={view === 'calculator' ? 'font-bold' : ''}
            onClick={() => setView('calculator')}
          >
            Calculadora
          </button>
        </li>
        <li>
          <button
            className={view === 'ingredients' ? 'font-bold' : ''}
            onClick={() => setView('ingredients')}
          >
            Ingredientes
          </button>
        </li>
        <li>
          <button
            className={view === 'dishes' ? 'font-bold' : ''}
            onClick={() => setView('dishes')}
          >
            Menús
          </button>
        </li>
      </ul>
    </nav>
  );
}
