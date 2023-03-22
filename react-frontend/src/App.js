import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListPostComponent from './components/ListPostComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePostComponent from './components/CreatePostComponent';
import UpdatePostComponent from './components/UpdatePostComponent';
import ViewPostComponent from './components/ViewPostComponent';

function App() {
  return (
    <div >
        <Router>
              <HeaderComponent />
                <div className="container full-height">
                    <Switch> 
                          <Route path = "/" exact component = {ListPostComponent}></Route>
                          <Route path = "/posts" component = {ListPostComponent}></Route>
                          <Route path = "/add-post/:id" component = {CreatePostComponent}></Route>
                          <Route path = "/view-post/:id" component = {ViewPostComponent}></Route>
                          { /*<Route path = "/update-post/:id" component = {UpdatePostComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
