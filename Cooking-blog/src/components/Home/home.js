import React from 'react';
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import BlogDetails from "./BlogDetails";
import List from './list'
import './RecipeSearch.css'; // Import your CSS file for styling
import SearchBlog from './SearchResults';
import Header from '../Header';
import banner from '../../assets/banner.png'





const RecipeSearch = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/api/list');

  return (
<>
<Header />

    <section id="RecipeSearch">
      <div className="RecipeSearch-content">
      <img src={banner} className='rounded-6xl ' />

        <h1 className="RecipeSearch-title">Explore delicious recipes from around the world!</h1>
        <p className="RecipeSearch-description">
          Welcome to our culinary hub, where flavors from around the world meet to inspire your kitchen adventures.
          Explore a collection of mouthwatering recipes, expert tips, and culinary insights. From easy weekday meals
          to gourmet delights, our blog is your go-to resource for all things food. Join us on a journey of taste and
          discovery as we celebrate the art of cooking together!
        </p>
      </div>

      <div className="RecipeSearch">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs} />}
      </div>
    </section>
    </>
  );
};

export default RecipeSearch;