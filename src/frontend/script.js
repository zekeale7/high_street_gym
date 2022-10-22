import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import "./style.css"


const app = document.getElementById("app");
ReactDOM.render( <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter>, 
    app

);