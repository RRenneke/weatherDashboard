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
//functions will set tht city list and current city into local storage
function storedCityArray() {
    localStorage.setItem("cities", JSON.stringify(cityList));
    }
function storedCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityName));
}
      
// Click event handler for city search button (example in class activity 6.8)
$("#citySearchBtn").on("click", function(event){
//always add preventDefault when there is an event to prevent default behavior
    event.preventDefault();
//Grab the input from the enter city text box
    cityName = $("#userCity").val().trim();
//alert user if no city was entered
    if(cityName === ""){
        alert("Please enter a city to look up")
    }else{
// Add the city from the text box to our array
    cityList.push(cityName);
    }
 //call the functions to handling updating the city and the corresponding weather   
    storedCurrentCity();
    storedCityArray();
    displayCities();
    displayWeather();
    displayFiveDay();
});


//function displays the weather with Open Weather API
async function displayWeather() {
    //create a variable that says where to get the data from
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=1e14f105f335994533ed9aca6312a5c8";
    //AJAX call with the url and method. 
        var response = await $.ajax({
            url: queryURL,
    //method is GET since all the data can be pulled from that API
            method: "GET"
          })
    //create a element /div to hold the data point / current weather
    var weatherDiv = $("<div class='card-body' id='currentWeather'>");
    
    //variables for date (tutor help)
            var date = new Date();
            var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
            
    //Get the icon response and a place to hold it, waiting to push to page until the element I want it next to has been pushed
            var weatherIcon = response.weather[0].icon;
            var displayIcon = $("<img src = http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png />");
    
    //Get and display the city 
    //variable to hold the city name
            var responseCity = response.name;
    //create an H3 to hold the responses value
            var cityNameEl = $("<h3 class = 'card-body'>").text(responseCity+" ("+val+")");
    //append the icon to the city name
            cityNameEl.append(displayIcon);
    //append the city name to the div
            weatherDiv.append(cityNameEl);
    
    //Get and display the temperature
    //used to fixed so there is no decimal
            var getTemp = response.main.temp.toFixed(0);
            var tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
            weatherDiv.append(tempEl);
            
    //Get and display the humidity
            var humidity = response.main.humidity;
            var humidityEl = $("<p class='card-text'>").text("Humidity: "+humidity+"%");
            weatherDiv.append(humidityEl);
            
    //Get and display the wind speed
            var windSpeed = response.wind.speed.toFixed(1);
            var windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+windSpeed+" mph");
            weatherDiv.append(windSpeedEl);
            
            var getLong = response.coord.lon;
            var getLat = response.coord.lat;
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=1e14f105f335994533ed9aca6312a5c8&lat="+getLat+"&lon="+getLong;
            var uvResponse = await $.ajax({
                url: uvURL,
                method: "GET"
            })

    //UV Index color settings
        var UVIndex = uvResponse.value;
        var UVValue = $("<span>");
    //setting color based on value
        if (UVIndex < 1.99){
            UVValue.addClass("low");
        }else if(UVIndex >= 2.00 && UVIndex <= 4.99){
            UVValue.addClass("moderate");
        }else {
            UVValue.addClass("high");
        }

        