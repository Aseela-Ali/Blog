const NewItem = ({ label, image, ingredientLines, url }) => {
    return ( 
        <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth: "345px" }}>
      <img src={image} style={{height : "200px", width :"330px"}} className="card-img-top" alt={label} />
  <div className="card-body">
  <h5 className="card-title">{label.slice(0,50)}</h5>
  <p className="card-text">Ingredients: {ingredientLines.join(", ")}</p>
  <a href={url} className="btn btn-primary" target="_blank" rel="noreferrer">
          View Recipe
        </a>  </div>
</div>
     );
}

export default NewItem;