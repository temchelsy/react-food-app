import React, { useState, useEffect } from "react";
import Mealitem from "./MealItem";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Meal = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [Mymeal, setMeal] = useState([]);

  useEffect(() => {
    const searchMeal = async () => {
      if (search.length > 0) {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          );
          const data = await response.json();
          setMeal(data.meals || []);
        } catch (error) {
          console.error("Error fetching meal data:", error);
        }
      }
    };

    
    const timeoutId = setTimeout(() => {
      searchMeal();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const showClick = () => {
    navigate("/Favorites", { replace: true });
  };

  return (
    <div className="main">
      <div className="heading">
        <h1>Search Your Food Recipe</h1>
        <h4>Chelsy food</h4>
      </div>
      <div className="searchBox">
        <input
          type="search"
          className="search-bar"
          placeholder="Search your meal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {Mymeal.length === 0 ? (
          <p className="notSearch">Not found</p>
        ) : (
          Mymeal.map((res) => <Mealitem key={res.idMeal} data={res} />)
        )}
      </div>
      <div>
        <button className="favorite" onClick={showClick}>
          View your favorites
        </button>
      </div>
    </div>
  );
};

export default Meal;
