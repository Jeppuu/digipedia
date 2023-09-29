import React from "react";
import { Router, Route, Switch, Link } from 'wouter';
import "./styles/styles.css"; // Import your styles.css
import Home from "./components/Home";
import DigimonDetail from "./components/DigimonDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/digimon/:id" component={DigimonDetail} />
    </Switch>
      <Footer/>
    </Router>
    
  );
}

export default App;
