import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch'
import './BlogDetails.css'; // Import CSS file for BlogDetails styling
import Header from '../Header';


const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/api/list/' + id);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/api/list/${blog.id}`, {
        method: 'DELETE'
      });
      // Optional: Provide feedback to the user upon successful deletion
      history.push('/');
    } catch (error) {
      // Handle any errors that occur during deletion
      console.error('Error deleting blog:', error);
    }
  }

  return (
    <><Header/>
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div></>
  );
}

export default BlogDetails;
