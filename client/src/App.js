import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./Components/NavMain";
import Home from "./views/Home";
import Albums from "./views/Albums";
import Artists from "./views/Artists";
import ALbumsCreate from "./views/AlbumsCreate"
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/artists" component={Artists} />
        <Route path="/albums" component={Albums} />
        <Route path="/create-album" component={ALbumsCreate} />
      </Switch>
    </div>
  );
}

export default App;
