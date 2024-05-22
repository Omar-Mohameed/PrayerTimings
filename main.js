// check if localStorage contains a value to city
if(localStorage.getItem("city")) {
  let city = localStorage.getItem("city");
  document.getElementById("towns").value =city;
  getPrayerDate(city);
}
else {
  getPrayerDate("cairo")
}

// get date from data api
function getDate(data) {
  document.querySelector(".hijri").innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`;
  document.querySelector(".milady").innerHTML = `${data.data.date.gregorian.weekday.en}, ${data.data.date.readable}`;
}

// fetch api to biring date of prayer
function getPrayerDate(city) {
  fetch(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    const timings = data.data.timings;
    fillTimePrayer("fajr", timings.Fajr , "AM")
    fillTimePrayer("sunrise", timings.Sunrise ,"AM")
    fillTimePrayer("dohr", timings.Dhuhr ,"PM")
    fillTimePrayer("asr", timings.Asr ,"PM")
    fillTimePrayer("maghrib", timings.Maghrib , "PM")
    fillTimePrayer("isha", timings.Isha , "PM")
    // bring the date
    getDate(data)
  }).catch((error)=> {
    console.log(error);
  });
}
// function to fill the data from the request
function fillTimePrayer(id,time,t) {
  document.getElementById(id).innerHTML = `${time} ${t}`;
}
// change everything when choose the city
let city = document.getElementById("towns");
city.onchange = function () {
  let content = `مواقيت الصلاة في ${city.value}`
  document.querySelector(".holder h2").innerHTML = content;
  // store the city in local storage
  localStorage.setItem("city", city.value);
  // sent the city as a parameter to the function getPrayerDate
  getPrayerDate(city.value);
  console.log(city.value);
}