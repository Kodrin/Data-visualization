window.onload = function(){

  let changeParagraph = function (event){
    if(this.id == "c"){
      console.log("c was click again!");
      pText.style = "display:inline-block";
      pText.textContent = "This is the c block";
    } else if (this.id == "d") {
      console.log("d was click again!");
      pText.style = "display:inline-block";
      pText.textContent = "This is the d block";
    } else if (this.id == "e") {
      console.log("e was click again!");
      pText.style = "display:inline-block";
      pText.textContent = "This is the e block";
    } else if (this.id == "displayText") {
      pText.style = "display:none";
    }
  }

  let cBox = document.getElementById('c');
  cBox.addEventListener('click', changeParagraph);
  let dBox = document.getElementById('d');
  dBox.addEventListener('click', changeParagraph);
  let eBox = document.getElementById('e');
  eBox.addEventListener('click', changeParagraph);
  let pText = document.getElementById('displayText');
  pText.addEventListener('click', changeParagraph);

}
