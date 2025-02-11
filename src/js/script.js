"use strict";

let codeEl = [];
let courseNameEl = [];
let progresionEl = [];

window.onload() => {
    loadCourses();

    //Händelselyssnare som filtrerar från sök
    document.querySelector("#search").addEventListener("input", filterData);
}