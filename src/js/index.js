import axios from "axios";
import Search from "./model/search";

let search = new Search("pasta");
search.doSerach().then(r => console.log(r));
