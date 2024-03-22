import { useState } from "react";
import { useHistory } from "react-router-dom";
import './upload.css';
import Header from '../Header';


const Upload = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Alaa');
  const [file, setFile] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('body', body);
    formData.append('author', author);
  
    fetch('http://localhost:8000/api/blog', {
      method: 'POST',
      body: formData
    }).then(() => {
      history.push('/');
    });
    alert("Data has been sent");
  };

  return (
    <>
                  <Header />
    <div id="upload">

      <h2 className="formTitle">Add a New Recipe</h2>
      <form className='uploadForm' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="Recipe-title" 
          placeholder="Recipe Title" 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          required 
          className="Description" 
          placeholder="Description" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        ></textarea>
         <input 
            type="file" 
            className="Recipe-title" 
            required 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        <input type="text"
          className="Blog-author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
          
        <button className="uploadBtn">Upload Recipe</button>
      </form>
      
    </div>
    </>

  );
};
 
export default Upload;
