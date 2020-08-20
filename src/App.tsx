import React from "react";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Category from "./pages/Category/Category";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App(props: any) {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/categoria/:category_name"
                    component={Category}
                />
                <Route exact path="/busca" component={Search} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
