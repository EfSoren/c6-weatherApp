// General Variables
var currDate = moment().format('MMM Do YY')
var $dailyHeader = $('#dailyHeader')
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
var lat = ''
var long = ''
var querySearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&&units=imperial&appid=57890314ccf804f1bbbf259448e508f1
`
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=40.391617&lon=-111.850769&&units=imperial&appid=57890314ccf804f1bbbf259448e508f1
`)
.then((response)=> {
    return response.json();
})
.then((data)=>{
    i=0
    dataPos = data.list
    windSpeed = data.list[i].wind.speed
    temp = data.list[i].main.temp
    humidity = data.list[i].main.humidity
  
   
})

//Card Formatting
function formatToday(){
    for (let i = 0; i < 4; i++) {
        var today = $('<li>').attr('id', `header${i}`)
           $('#d1').append(today)
    }
    $('#header0').text(`${city}: ${currDate}`).attr('class', 'dailyHeader')
    $('#header1').text(`Temperature: ${temp} °`)
    $('#header2').text(`Wind: ${windSpeed} MPH`)
    $('#header3').text(`Humidity: ${humidity}%`)
}
function formatForecast(){
    $('#cards').remove('ul')
    for (let i = 0; i < 5; i++) {
        currDate = moment().add(i+1, 'days').format('MMM Do YY')
        dataArray = [`Date: ${currDate}`, `Temp: ${temp} °`, `Wind: ${windSpeed} MPH`, `Humidity: ${humidity}%`]
        console.log(dataArray[0]);
        console.log(dataArray[1]);
        console.log(dataArray[2]);
        console.log(dataArray[3]);
 
        dat = i*8
        rename = `${dataPos[dat]}`
        let $dayCard = $('<ul>').addClass('dayCard')
        for (var j = 0; j < 4; j++) {
           var dAP = dataArray[j]
            cardData = rename.dAP
            console.log(cardData);
            var forecast = $('<li>').attr('id', `${i}card${j}`).text(dAP)
            
            $dayCard.append(forecast)   
        }
        $('#cards').append($dayCard)
    }
    }
    $('#btnSearch').on('click', formatAll)

    function formatAll(){
        formatToday()
        formatForecast()
    }
//Local Storage Functions

text = dataPos[dat]