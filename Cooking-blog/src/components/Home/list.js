import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import './BlogList.css'; // Import CSS file for BlogList styling
import { Link } from 'react-router-dom';
import Header from '../Header';



const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

function deleteopration(id){

  fetch(`http://localhost:8000/api/delete/${id}`, { method: 'DELETE' })
  .then(response => {
      if (response.ok) {
        getData();
          alert("The blog has been deleted");
      } else {
          throw new Error("Failed to delete blog");
      }
  })
  .catch(error => {
      console.error("Error deleting blog:", error);
  });
}
function getData(){
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/list");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}

  return (
    <><Header />
    <h1 className="text-xl font-bold underline text-center">
      View All Recipe on table format
    </h1>
    <div className='col-sm-8 offset-sm-2'>
      
      <h5>Product List</h5>
      <Table responsive condensed hover >
      <tbody >
          <tr>
      <td>id</td>
      <td>Title</td>
      <td>Ingrediant</td>
      <td>author</td>
      <td>Image</td>
      <td>Opration</td>

      
    </tr>
    </tbody>
    {
    data.map((item)=>
    <tbody>
          <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.body}</td>
      <td>{item.author}</td>
      <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path}/></td>
      <td><span className='delete' onClick={()=>deleteopration(item.id)}> Delete </span></td>
      <td><Link to={"UpdateBlog/"+item.id}><span className='update' > Update </span></Link></td>


      
    </tr>
    </tbody>
   ) }
        </Table>

      
       
    </div>
    </>
  );
}

export default List;
