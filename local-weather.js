$(document).ready(function() {
  // location
  $.getJSON("https://freegeoip.net/json/?callback=?", function(json) {
    // convert F to C
    function convertToC(x) {
      return Math.round((x - 32) * (5 / 9));
    }

    // get location
    var cityName = json.city;
    var stateCode = json.region_code;
    var lon = json.longitude;
    var lat = json.latitude;

    // display location
    $("#location").append(" " + cityName + ", " + stateCode);

    // weatherAPI
    var API_KEY = "361ce41a4cc7acd7840389f9610e0f94";
    var weatherApi =
      "https://api.darksky.net/forecast/" + API_KEY + "/" + lat + "," + lon;

    $.getJSON(weatherApi + "?callback=?", function(data) {
      // get current weather report
      var tempF = Math.round(data.currently.temperature);
      var tempC = convertToC(data.currently.temperature);
      var currentIcon = data.currently.icon;
      var weatherSummary0 = data.currently.summary;

      // display current weather report
      $("#tempF0").html(tempF + "&deg;F");
      $("#tempC0").html(tempC + "&deg;C");
      $("#weatherSummary0").html(weatherSummary0);

      // get weekday
      function getWeekday(i) {
        var weekDayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        var weekDay = new Date();
        if (weekDay.getDay() + i < 7) {
          return weekDayNames[weekDay.getDay() + i];
        } 
        else return weekDayNames[i + weekDay.getDay() - 7];
      }

      // get day
      function getDay() {
        var day = new Date();
        return day.getDate();
      }

      // get month
      function getMonth() {
        var monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        var month = new Date();
        return monthNames[month.getMonth()];
      }

      // get year
      function getYear() {
        var year = new Date();
        return year.getFullYear();
      }

      // display current date
      $("#date").html(
        getWeekday(0) + ", " + getDay() + " " + getMonth() + " " + getYear()
      );

      // display weather icon
      function displayIcon(i, icon) {
        var skycons = new Skycons({ color: "white" });

        if (icon === "clear-day") {
          skycons.set("icon" + i, Skycons.CLEAR_DAY);
        }
        if (icon === "partly-cloudy-day") {
          skycons.set("icon" + i, Skycons.PARTLY_CLOUDY_DAY);
        }
        if (icon === "clear-night") {
          skycons.set("icon" + i, Skycons.CLEAR_NIGHT);
        }
        if (icon === "partly-cloudy-night") {
          skycons.set("icon" + i, Skycons.PARTLY_CLOUDY_NIGHT);
        }
        if (icon === "rain") {
          skycons.set("icon" + i, Skycons.RAIN);
        }
        if (icon === "snow") {
          skycons.set("icon" + i, Skycons.SNOW);
        }
        if (icon === "sleet") {
          skycons.set("icon" + i, Skycons.SLEET);
        }
        // animate weather icon
        skycons.play();
      }

      // display current weather icon
      displayIcon(0, currentIcon);

      // get daily weather report
      function getDailyWeatherReport(i) {
        var icon = data.daily.data[i].icon;
        var tempMaxF = Math.round(data.daily.data[i].temperatureMax);
        var tempMaxC = Math.round(convertToC(data.daily.data[i].temperatureMax));
        var tempMinF = Math.round(data.daily.data[i].temperatureMin);
        var tempMinC = Math.round(convertToC(data.daily.data[i].temperatureMin));
        var weekDay = "#wd" + i;
        $(weekDay).html("<p>" + getWeekday(i) + "</p>");
        var tempF = "#tempF" + i;
        $(tempF).html(tempMinF + "&deg;F | " + tempMaxF + "&deg;F");
        var tempC = "#tempC" + i;
        $(tempC).html(tempMinC + "&deg;C | " + tempMaxC + "&deg;C");
        return icon;
      }
      
      // display daily icons
      for (var i = 1; i < 6; i++) {
        displayIcon(i, getDailyWeatherReport(i));
      }

      // run display daily weather reports
      for (var i = 1; i < 6; i++) {
        getDailyWeatherReport(i);
      }
      
    }); // end getJSON weather function
  }); // end getJSON location function

  // switch current temperature
  $("#switchToF").click(function() {
    for (var i = 0; i < 6; i++) {
      document.getElementById("tempC" + i).style.display = "none";
      document.getElementById("tempF" + i).style.display = "unset";
    }
    $("#switchToF").addClass("active");
    $("#switchToC").removeClass("active");
  });

  $("#switchToC").click(function() {
    for (var i = 0; i < 6; i++) {
      document.getElementById("tempF" + i).style.display = "none";
      document.getElementById("tempC" + i).style.display = "unset";
    }
    $("#switchToC").addClass("active");
    $("#switchToF").removeClass("active");
  });
});
