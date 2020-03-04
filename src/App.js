import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import TableComponent from './containers/TableComponent';
import history from './common/history';
import ShipmentDetailPage from './components/ShipmentDetailPage';
import Header from './common/header';
import LandingPage from './common/LandingPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <LandingPage/>
        <Router history={history}>
          <Route exact path="/" component={TableComponent} />
          <Route exact path="/Details/:id" component={ShipmentDetailPage} />
        </Router>
      </div>
    );
  }
}

export default App;
