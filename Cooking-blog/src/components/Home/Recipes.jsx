import { useState, useEffect } from "react";
import NewItem from "./NewItem";
import Header from '../Header';

const Home = ({ category }) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://api.edamam.com/api/recipes/v2?type=public&q=recipes&category=${category}&app_id=2258a5db&app_key=e84c5066036cd8eb63ac46c3c18bb355`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setRecipes(data.hits);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
                    <Header />

            <h2 className="text-center">Discover Delicious<span className="badge bg-light text-dark fs-4">Recipes</span></h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recipes.map((recipe) => (
                    <NewItem
                        key={recipe.recipe.uri}
                        label={recipe.recipe.label}
                        image={recipe.recipe.image}
                        ingredientLines={recipe.recipe.ingredientLines}
                        url={recipe.recipe.url}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Home;











