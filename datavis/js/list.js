function generateListView(){
  // console.log(countryNames);
  for(let i =0; i<countryNames.length; i++ ){
    let divCity = document.createElement("div");
    divCity.className = "city";
    divCity.textContent = countryNames[i].cityname + " " + countryNames[i].countryname + "\r\n";
    divCity.textContent += countryNames[i].countrywind + " KM/HR" + "\r\n";
    divCity.textContent += countryNames[i].countrytemp + "°C ";
    divCity.textContent += countryNames[i].clouds + "\r\n";
    document.body.appendChild(divCity);
    divCity.style.whiteSpace = 'pre';
    divCity.style.textTransform = 'uppercase';
    document.getElementsByClassName("listContainer")[0].appendChild(divCity);
  }
}

// function generateListView(){
//   console.log(countryNames.length);
//   for(let i =0; i<countryNames.length; i++ ){
//     let divCity = document.createElement("div");
//     this.text =function(title,wind,temperature,scene){
//     divCity.className = 'city';
//     console.log(i);
//     divCity.textContent =  "CITY-" + countryNames[i].countryname + "\r\n";
//     // divCity.textContent +=  "WIND-" + countryNames[i].countryname + "\r\n";
//     // divCity.textContent +=  "TEMP-" + countryNames[i].countryname + "\r\n";
//     document.body.appendChild(divCity);
//     document.getElementsByClassName("listContainer")[0].appendChild(divCity);
//
//   }
//   }
// }
