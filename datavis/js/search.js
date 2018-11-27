function openNav() {
  document.getElementById("searchBar").style.display = "block";
}

function closeNav() {
  document.getElementById("searchBar").style.display = "none";
}

function openAbout() {
  document.getElementById("aboutPage").style.display = "block";
}

function closeAbout() {
  document.getElementById("aboutPage").style.display = "none";
}

let arr = ["Valerie", "Codrin", "Rochelle"]

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
