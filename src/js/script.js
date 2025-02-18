"use strict";

let courses = [];
let sortedCourse = [];
let codeEl = document.getElementById("code");
let courseNameEl = document.getElementById("courseName");
let progressionEl = document.getElementById("progression");

//Funktion som körd när sidan laddas
window.onload = () => {
    loadCourses();

    //Händelselyssnare som filtrerar
    document.querySelector("#search").addEventListener("input", filterData);
    document.querySelector("#code").addEventListener("onClick", sortCode);
    document.querySelector("#courseName").addEventListener("onClick", sortCoursename);
    document.querySelector("#progression").addEventListener("onClick", sortProgression);
}

//Funktion för felhantering och hämntning av data
async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");

        if (!response.ok) {
            throw new Error("Fel vid hämtning av data.")
        }
        courses = await response.json();
        printCourses(courses);

    } catch (error) {
        console.log(error);
        document.querySelector(".error").innerHTML = "<p>Fel vid hämtning; prova igen senare!</p>"
    }
}

function printCourses(data) {

    //Variabler
    const table = document.querySelector("#table");

    sortedCourse.sort((a, b) => a.name > b.name ? 1 : -1);

    //Rensar DOM
    table.innerHTML = "";

    //Skrivs ut till DOM
    data.forEach(course => {
        table.innerHTML +=
            `<tr><td>${course.code}</td><td>${course.coursename}</td><td>${course.progression}</td></tr>`;
    });
}

function filterData() {
    const searchPhrase = document.querySelector("#search").value;
    
    //Funktion att söka efter kurskod, kursnamn eller progression med både stora och små boktäver
    const filteredData = courses.filter(course =>
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.progression.toLowerCase().includes(searchPhrase.toLowerCase())
    );

    printCourses(filteredData);
}