import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);
  console.log(favorites)

  const goBack = () => {
    navigate("/Home", { replace: true });
  };

  return (
    <div className="fav">
      <h2>My Favorite Page</h2>

      <pre>
        {JSON.stringify(favorites, null, 4)}
      </pre>
      {favorites.length > 0 ? (
                        favorites.map((favorites) => favorites.strMeal)
                ) : (
                    <p>No favorite recipes found.</p>
                )}
      <button id="back" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
