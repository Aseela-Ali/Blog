// BlogList Component
import { Link } from 'react-router-dom';
import './BlogList.css'; // Import CSS file for BlogList styling
import './Recipes';

const BlogList = ({ blogs }) => {
  const user = JSON.parse(localStorage.getItem('user-info'));

  const handleDelete = (id) => {
    // Add logic to delete the blog post with the specified id
    fetch(`http://localhost:8000/api/delete/${id}`, { method: 'DELETE' })
      .then(response => {
          if (response.ok) {
              alert("The blog has been deleted");
          } else {
              throw new Error("Failed to delete blog");
          }
      })
      .catch(error => {
          console.error("Error deleting blog:", error);
      });
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', cursor: 'pointer', marginTop: '10px', padding: '10px', '@media(min-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)', padding: '15px' }, '@media(min-width: 1024px)': { padding: '32px' } }}>

      {blogs.map(blog => (
        <div key={blog.id} style={{ borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <Link to={`/UpdateBlog/${blog.id}`}> {/* Include the blog id in the link */}
          <div style={{ overflow: 'hidden' }}>
            <img style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={"http://localhost:8000/" + blog.file_path} alt={blog.title} />
          </div>

          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px' }}>{blog.title}</h2>
            <p style={{ marginBottom: '10px' }}>Ingredient: {blog.body}</p>
            <p style={{ marginBottom: '10px' }}>Written by: {blog.author}</p>
            {user && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => handleDelete(blog.id)} style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Delete</button>
                <button style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Update</button>
              </div>
            )}
          </div>
          </Link>
        </div>
      ))}

    </div>
  );
}

export default BlogList;
