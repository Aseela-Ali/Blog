import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateBlog() {
  const { id } = useParams();
  const [data, setData] = useState({ title: "", body: "", author: "", file_path: "" }); // Initial state with properties
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetch(`http://localhost:8000/api/blog/${id}`, {
          method: 'GET', // Specify GET method for fetching data
          headers: {
            'Content-Type': 'application/json', // Optional header for JSON data
            // Add authorization headers if required by your API
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching blog data: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission for updating the blog
  const handleUpdate = async (event) => {
    event.preventDefault();

    // Extract updated data from form fields
    const updatedData = {
      title: event.target.elements.title.value,
      body: event.target.elements.body.value,
      author: event.target.elements.author.value,
      // Handle file upload (implementation depends on your backend)
      file_path: event.target.elements.file_path.files[0] ? event.target.elements.file_path.files[0] : data.file_path, // Access first selected file or retain existing path
    };

    setIsLoading(true); // Set loading state during update
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:8000/api/UpdateBlog/${id}`, {
        method: 'PUT', // Use PUT for updating data
        headers: {
          'Content-Type': 'application/json', // Required for sending JSON data
          // Add authorization headers if required by your API
        },
        body: JSON.stringify(updatedData), // Send updated data in the body
      });

      if (!response.ok) {
        throw new Error(`Error updating blog: ${response.statusText}`);
      }

      // Handle successful update (e.g., display success message, redirect)
      console.log('Blog updated successfully!');
      // Optionally, fetch the updated data again to display
      // setData(await response.json()); // Replace with actual logic
    } catch (error) {
      console.error('Error updating blog:', error);
      setError(error.message || 'Error updating blog');
    } finally {
      setIsLoading(false); // Clear loading state after update attempt
    }
  };

  return (
    <div>
      <h5>Update Blog</h5>
      {isLoading && <p>Loading blog data...</p>}
      {error && <p>Error: {error}</p>}
      {data.id && ( // Display fields only when data is available and error is null
        <form onSubmit={handleUpdate}>
          <input type="text" value={data.title} name="title" onChange={(e) => setData({ ...data, title: e.target.value })} /><br />
          <br />
          <input type="text" value={data.body} name="body" onChange={(e) => setData({ ...data, body: e.target.value })} /><br />
          <br />
          <input type="text" value={data.author} name="author" onChange={(e) => setData({ ...data, author: e.target.value })} /><br />
          <br />
          <input type="file" name="file_path" /> {/* Add file upload field */}
          <br />
          <img style={{ width: 100 }} src={"http://localhost:8000/" + data.file_path} />
          <br />
          <button type="submit">Update Blog</button>
        </form>
      )}
    </div>
  );
}

export default UpdateBlog;

