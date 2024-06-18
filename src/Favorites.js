import React from 'react';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div>
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite.city}
            <button onClick={() => onRemove(favorite)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;