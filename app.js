const myKey = "6babe2d35a014d1a87f81911242202";
let locationFrom;
let locationTo;
let locationArrival;
let date;
const locationNameFrom = document.getElementById("location-name-from");
const locationNameTo = document.getElementById("location-name-to");
const locationLocaltimeFrom = document.getElementById(
  "location-localtime-from"
);
const locationLocaltimeTo = document.getElementById(
  "location-localtime-to"
);
const currentTempCFrom = document.getElementById("current-temp_c-from");
const currentTempFFrom = document.getElementById("current-temp_f-from");
const currentTempCTo = document.getElementById("current-temp_c-to");
const currentTempFTo = document.getElementById("current-temp_f-to");

const conditionTextFrom = document.getElementById("condition-text-from");
const conditionTextTo = document.getElementById("condition-text-to");

const currentWindKphFrom = document.getElementById(
  "current-wind_kph-from"
);

const currentWindMphFrom = document.getElementById(
  "current-wind_mph-from"
);

const currentWindKphTo = document.getElementById("current-wind_kph-to");
const currentWindMphTo = document.getElementById("current-wind_mph-to");

const currentTempCToArrival = document.getElementById(
  "current-temp_c-to-arrival"
);
const currentTempFToArrival = document.getElementById(
  "current-temp_f-to-arrival"
);

const searchBtn = document.getElementById("button");
const from = document.querySelector(".search-input-from");
const to = document.querySelector(".search-input-to");

async function getData(
  url,
  name,
  time,
  temp_c,
  temp_f,
  conditionText,
  wind_k,
  wind_m
) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  console.log(data);

  date = data.location.localtime.split(" ")[0];
  console.log(date);
  name.innerText = data.location.name;
  time.innerText = data.location.localtime;
  temp_c.innerText = `${data.current.temp_c} C`;
  temp_f.innerText = `${data.current.temp_f} F`;
  conditionIcon = `${data.current.condition.icon}`;
  conditionText.innerText = data.current.condition.text;
  wind_k.innerText = `k/h ${data.current.wind_kph}`;
  wind_m.innerText = `m/h ${data.current.wind_mph}`;
}

async function getDataArrival(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  console.log(data);
}

searchBtn.addEventListener("click", (app) => {
  app.preventDefault();
  locationFrom = from.value;
  locationTo = to.value;
  let urlFrom = `http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${locationFrom}`;
  let urlTo = `http://api.weatherapi.com/v1/current.json?key=${myKey}&q=${locationTo}`;
  let urlToArrival = `http://api.weatherapi.com/v1/future.json?key=${myKey}&q=${locationTo}&dt=${date}`;

  getData(
    urlFrom,
    locationNameFrom,
    locationLocaltimeFrom,
    currentTempCFrom,
    currentTempFFrom,
    conditionTextFrom,
    currentWindKphFrom,
    currentWindMphFrom
  );

  getData(
    urlTo,
    locationNameTo,
    locationLocaltimeTo,
    currentTempCTo,
    currentTempFTo,
    conditionTextTo,
    currentWindKphTo,
    currentWindMphTo
  );

  getDataArrival(urlToArrival);
  from.value = "";
  to.value = "";
});
