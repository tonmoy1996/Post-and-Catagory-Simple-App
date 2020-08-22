import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import PostComponent from './components/PostComponent';
import Navbar from './components/Navbar';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/post' component={PostComponent} />
          <Route exact path='/post-create' component={PostCreate} />
          <Route exact path='/post-edit/:id' component={PostEdit} />
          <Redirect exact to='/post' />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
