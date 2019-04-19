function openNav() {
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


let arr = ["AL AZIZIYAH", "ACCRA", "ALEXANDRIA", "AMSTERDAM", "ANCHORAGE", "ANTALYA", "ATHENS", "BAGHDAD", "BALI", "BANGKOK", "BARCELONA", "BEIJING", "BERLIN"]
// for(let i =0; i<countryNames.length; i++ ){
//   let arr = countryNames.length;
// }

//
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

updateResult("")
