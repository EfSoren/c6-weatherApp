// General Variables
var currDate = moment().format('MMM Do YY')
var $citySearch = $('#citySearch')
var $dailyHeader = $('#dailyHeader')
var incData = []
var cardData = ''
var rename = ''
var dat = ''
var city = ''
var windSpeed = ''
var temp = ''
var humidity = ''
var dataPos = ''
var dataArray;

// API Calls
//Weather keywords .wind.speed .main.temp .main.humidity
var lat = '40.391617'
var long = '-111.850769'
var querySearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&&units=imperial&appid=57890314ccf804f1bbbf259448e508f1
`
fetch(querySearch).then((response)=> {return response.json();}).then((data)=>{
    incData = []
    console.log(data);
    for (let i = 0; i < 33; i+=8) {
       incData.push(data.list[i])
    }

})

//Card Formatting
function formatToday(){
    let $d1 = $('<ul>').addClass('d1')
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
        dataArray = [`Date: ${currDate}`, `Temp: `+ incData[i].main.temp +  `°`, `Wind: `+ incData[i].wind.speed +  `MPH`, `Humidity: `+ incData[i].main.humidity +  `%`]
        let $dayCard = $('<ul>').addClass('dayCard')
            for (var j = 0; j < 4; j++) {
                var dAP = dataArray[j]
                 cardData = rename.dAP
                 var forecast = $('<li>').attr('id', `${i}card${j}`).text(dAP)
            $dayCard.append(forecast)   
        }
        $('#cards').append($dayCard)
    }
    }
    $('#btnSearch').on('click', formatAll)

 function resetCards(){
    $('section').children().remove()

 }  
 function name(){
    console.log($citySearch[0].value);

 } 
    function formatAll(){
        resetCards()
        formatToday()
        formatForecast()
        name()
    }
//Local Storage Functions

