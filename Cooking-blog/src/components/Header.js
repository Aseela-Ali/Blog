import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import React, { useState } from 'react';
import './Alaa';
import logo from '../assets/logo.svg';

const Header = () => {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    history.push(`/SearchResults?query=${title}`);
  }

  function Logout() {
    localStorage.clear();
    history.push('/register');
  }

  return (
    <Navbar className="custom-navbar" style={{backgroundColor: 'white', color: 'black'}}>
      <Container>
        <Navbar.Brand href="/">Cooking-Blog</Navbar.Brand>
        <Nav className="me-auto navbar_wrapper">
          {localStorage.getItem('user-info') ? (
            <>
              <div className='flex justify-between items-center'>
                <ul className='hidden md:flex gap-4 md:gap-14'>
                  <Link to="/" className='hover:font-bold cursor-pointer text-red-500'>Home</Link>
                  <Link to="/upload" className='hover:font-bold cursor-pointer text-red-500'>Add Blog</Link>
                  <Link to="/list" className='hover:font-bold cursor-pointer text-red-500'>Blogs</Link>
                  <Link to="/contact" className='hover:font-bold cursor-pointer text-red-500'>Contact Us</Link>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="py-6">
                <Link to="/Login"  style={{Color: 'red'}}>Login</Link>
                <Link to="/Register"  style={{Color: 'red'}}>Register</Link>
              </div>
            </>
          )}
        </Nav>
        <Form className="d-flex" onSubmit={handleFormSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </Container>
      {localStorage.getItem('user-info') ? (
        <Nav>
          <NavDropdown title={user && user.name} style={{backgroundColor: 'red'}}> {/* Red background */}
            <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : null}
    </Navbar>
  );
};

export default Header;
