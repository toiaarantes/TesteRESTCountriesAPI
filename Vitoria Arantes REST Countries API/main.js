//Global Variables
const countriesList = document.getElementById("countries");
const regionsList = document.getElementById("regionslist");
let countries;
let cBR;

//Event Listeners
countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
    regionsList.selectedIndex = 0;
  displayCountryByName(event.target.value);
}

regionsList.addEventListener("change", newRegionSelection);

function newRegionSelection(event) {
  countriesList.selectedIndex = 0;
  displayCountryByRegion(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "<option value=null></option>";
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  countriesList.innerHTML = options;
}

function displayCountryByRegion(countryByRegion){
    if(countryByRegion == ""){
        let flagsNone = "";
        document.getElementById("countriesflags-container").innerHTML = flagsNone;
    } else{
        fetch(`https://restcountries.eu/rest/v2/region/${countryByRegion}`)
        .then(res => res.json())
        .then(data => initializecBR(data))
        .catch(err => console.log("Error:",err));
    }
}
function displayCountryByName(countryByName){
    if(countryByName == ""){
        let flagsNone = "";
        document.getElementById("countriesflags-container").innerHTML = flagsNone;
    } else{
        fetch(`https://restcountries.eu/rest/v2/alpha/${countryByName}`)
        .then(res => res.json())
        .then(data => initializecBN(data))
        .catch(err => console.log("Error:",err));
    }
}


function initializecBR(cBRData){
    cBR = cBRData;
    let flagscBR = "";
    cBR.forEach(cBR => flagscBR+=`<button type="submit" name="flag" value="${cBR.alpha3Code}"><img src="${cBR.flag}" alt="${cBR.name}"></button>`);        
    document.getElementById("countriesflags-container").innerHTML = flagscBR;
}
function initializecBN(cBNData){
    cBR = cBNData;
    let flagscBR = "";
    flagscBR+=`<button type="submit" name="flag" value="${cBR.alpha3Code}"><img src="${cBR.flag}" alt="${cBR.name}"></button>`;        
    document.getElementById("countriesflags-container").innerHTML = flagscBR;
}

