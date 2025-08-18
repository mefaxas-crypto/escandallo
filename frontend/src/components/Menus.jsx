import React from 'react';

export default function Menus({ recipes, menus }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Menús</h2>
      {menus.map(menu => (
        <div key={menu.id} className="mb-4">
          <h3 className="font-bold">{menu.name}</h3>
          <ul className="list-disc ml-6">
            {recipes
              .filter(r => r.menuId === menu.id)
              .map(r => (
                <li key={r.id}>{r.name}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
