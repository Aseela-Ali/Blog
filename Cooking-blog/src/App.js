import React from 'react';
import Home from './components/Home/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './components/Upload/upload';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import SearchResults from './components/Home/SearchResults';
import contact from './components/Contact/contact';
import Footer from './components/Footer/footer';
import UpdateBlog from './components/Home/UpdateBlog';
import Alaa from './components/Alaa';
import list from './components/Home/list';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/upload">
            <Protected Cmp={Upload} />
          </Route>
          <Route path="/UpdateBlog/:id" element={<UpdateBlog />}>
            <Protected Cmp={UpdateBlog} />
          </Route>
          
          <Route path="/list">
            <Protected Cmp={list} />
          </Route>
          <Route path="/UpdateBlog">
            <Protected Cmp={UpdateBlog} />
          </Route>

          <Route path="/SearchResults">
            <Protected Cmp={SearchResults} />
          </Route>
          <Route path="/contact">
            <Protected Cmp={contact} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
