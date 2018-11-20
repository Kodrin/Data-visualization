function generateListView(){
  console.log(countryNames);
  for(let i =0; i<countryNames.length; i++ ){
    let divCity = document.createElement("div");
    divCity.className = "city";
    divCity.textContent = countryNames[i].countryname;
    document.getElementsByClassName("listContainer")[0].appendChild(divCity);
  }
  // document.getElementById("listview").style.overflowY = "scroll";
}
