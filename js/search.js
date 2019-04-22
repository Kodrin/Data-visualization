function openNav() {
  getCountries(); //get all the countries
  document.getElementById("searchBar").style.display = "block";
  controls.enabled = false; //disbale orbit controls
}

function closeNav() {
  document.getElementById("searchBar").style.display = "none";
  controls.enabled = true; //re-enable orbit controls
}

function openAbout() {
  document.getElementById("aboutPage").style.display = "block";
  controls.enabled = false; //disbale orbit controls
}

function closeAbout() {
  document.getElementById("aboutPage").style.display = "none";
  controls.enabled = true; //re-enable orbit controls
}


let arr = []; //array to store that list of country naes

//fetch all the countries from countrynames list
function getCountries(){
  for(var i =0; i<countryNames.length; i++ ){
    arr[i] = countryNames[i].cityname;
  }
  updateResult(""); //update the query results
}

// allows for querying
const updateResult = query => {
	let resultList = document.querySelector(".result");
	resultList.innerHTML = "";

	arr.map(algo =>{
		query.split(" ").map(word =>{
			if(algo.toUpperCase().indexOf(word.toUpperCase()) != -1){
				resultList.innerHTML += `<li class="listClass">${algo}</li>`;
			}
		})
	})
}

updateResult(""); //update the results
