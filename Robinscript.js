// Global variables
//empty city array for the user provided cities to be stored
//declaring a cityName variable to assign values later
var cityList = [];
var cityName;

// function to show the cities on the city box
function displayCities(){
//clears any previously entered cities
    $("#cityList").empty();
//puts the user provided city as the value in the empty string
    $("#userCity").val("");
//for loop to go through the cities (example in class actvity 6.9)
    for (i=0; i<cityList.length; i++){
//create an a tag to hold the cities
        var a = $("<a>");
//add class so previous provided cites can be clicked
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
//add both parameters to the function so we set data-name to the cities loop
        a.attr("data-name", cityList[i]);
//provide the city list
        a.text(cityList[i]);
//prepend the a tag to the city list
        $("#cityList").prepend(a);
    } 
}

//function to get cities from local storage
function storedCities() {
//create a variable to get the cities object from storage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
//if the value or type are not empty, use them as the city list
    if (storedCities !== null) {
        cityList = storedCities; 
    }
//call the previous function to get the user provided city
    displayCities();
    }

//function will show current city's, in local storage, weather
function currentCity() {
//create a variable to get the city as an object from local storage
    var storedWeather = JSON.parse(localStorage.getItem("currentCity"));
//if the value or type are not empty, show that cities weather
    if (storedWeather !== null) {
        cityName = storedWeather;
//call the function to show the weather
        displayWeather();
        displayFiveDay();
    }
}
