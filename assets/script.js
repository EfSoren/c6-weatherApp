//PREFACE - Clicking a recent search button has some flaws i was unable to figure out. 
//IT WORKS ONCE AND ONLY IF YOU HAVEN'T SEARCHED ON THAT SESSION YET.
//after clicking a recent search it will populate the weather for that location.
//clicking a different recent search after will no longer work without refreshing the browser


// General Variables
var currDate = moment().format('MMM Do YY')
var $citySearch = $('#citySearch')
var $dailyHeader = $('#dailyHeader')
var incData = []
var city = ''
var dataArray;
let keyID = 0

// API Calls
//Weather keywords .wind.speed .main.temp .main.humidity
function getWeather(){
    city = $citySearch[0].value
    var geo = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=57890314ccf804f1bbbf259448e508f1`
    fetch(geo).then((response)=> {return response.json();}).then((info)=>{console.log(info)
        if(info.cod != 200){return}
            var lat = info.city.coord.lat
            var long = info.city.coord.lon
            console.log(lat , long);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&&units=imperial&appid=57890314ccf804f1bbbf259448e508f1`).then((response)=> {return response.json();}).then((data)=>{incData = []
        for (let i = 0; i < 33; i+=8) {
            incData.push(data.list[i])
        }
    formatAll()
        ;})})
}
        

//Card Formatting
function formatToday(){
    let $d1 = $('<ul>').addClass('d1')
    let forecastEl = $('<h1>').text("5 Day Forecast")

    $('#divider').children().remove()
    $('#divider').append(forecastEl)
    for (i = 0; i < 4; i++) {
        var today = $('<li>').attr('id', `header${i}`)
           $('.d1').append(today)
    }
    console.log(incData);
    var currDate = moment().format('MMM Do YY')
    $('#header0').text(`${city}: ${currDate}`).attr('class', 'dailyHeader')
    $('#header1').text(`Temperature: `+ incData[0].main.temp +  `°`)
    $('#header2').text(`Wind: `+ incData[0].wind.speed +  `MPH`)
    $('#header3').text(`Humidity: `+ incData[0].main.humidity +  `%`)
}
function formatForecast(){
    
    for (let i = 0; i < 5; i++) {
        currDate = moment().add(i, 'days').format('MMM Do YY')
        dataArray = [`Date: ${currDate}`,
                     `Temp: `+ incData[i].main.temp +  `°`,
                     `Wind: `+ incData[i].wind.speed +  `MPH`,
                     `Humidity: `+ incData[i].main.humidity +  `%`]

        let $dayCard = $('<ul>').addClass('dayCard')
            for (var j = 0; j < 4; j++) {
                var dAP = dataArray[j]
                var forecast = $('<li>').attr('id', `${i}card${j}`).text(dAP)

        $dayCard.append(forecast)   
        }
        $('#cards').append($dayCard)
    }
}
    $('#btnSearch').on('click', getWeather)

function resetCards(){
    $('section').children().remove()

}  
//Local Storage Functions
function getStorage(){
     $('#searchList').children().remove()
        for (let i = 0; i < 10; i++) {
            let itemGet = localStorage.getItem(`key${i}`)
            
        if(itemGet == null){return}
            let recentSearches = $('<li>').addClass('rS')
            recentSearches.append(itemGet)
            $('#searchList').append(recentSearches)   
        }
    }

 getStorage()

 function searchStorage(){
     let searchText = $citySearch[0].value
    if(searchText == ''){
        return
    }else{
        let keyName = `key${keyID}`
        keyID++
        localStorage.setItem(`${keyName}`, searchText)
    }
        $citySearch[0].value = ''
 } 

function formatAll(){
    resetCards()
    formatToday()
    formatForecast()
    searchStorage()
    getStorage()
}

//Search weather from recent tabs


function savedSearch(recent){
    recText = `${recent.target.innerText}`
    $citySearch[0].value = recText
    getWeather()

}

$('.rS').on('click', savedSearch)