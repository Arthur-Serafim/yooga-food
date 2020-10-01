import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App(props: any) {
    return (
        <Router  basename={'marketplace'}>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
