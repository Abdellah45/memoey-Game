//Create Start Game function 
document.querySelector(".control_buttons span").onclick = function () {
  
  //set prompt variable
  let yourname = prompt("What is your name?");
  
  if(yourname == null || yourname == ""){
    
    //set Unknown value
    document.querySelector(".name span").textContent = "Unknown";
    
  }else{
    
    //set Your name value
    document.querySelector(".name span").textContent = yourname;
    
  }
  
  //remove control_buttons from Dom Object
  document.querySelector(".control_buttons").remove();
}



let duration = 1000;

let record = document.querySelector(".Record span");

let blocksCont = document.querySelector(".memory_game");

let blocks = Array.from(document.querySelectorAll(".memory_game .block"));

let rangeBlock = [...Array(blocks.length).keys()];

let ties = document.querySelector(".wrongs span");

let mylen = [];

let myRan = [];

function generate() {
  for (let n = 0; n < localStorage.length; n++) {
    if (isNaN(localStorage.key(n))) {
  
    } else {
      mylen.push(localStorage.key(n));
    }
  }
}
generate();

shufte(rangeBlock);


record.innerHTML = Math.min(...mylen);

blocks.forEach((block,index) => {
  block.style.order = rangeBlock[index];
  
  block.addEventListener("click",function () {
    flip(block);
    if (blocks.filter(f => f.classList.contains("rotate-S")).length === blocks.length){
      setTimeout(() => {
      let back = document.createElement("div");
      back.classList.add("backgr");
      let span = document.createElement("span");
      let text = document.createTextNode("Replay");
      span.appendChild(text);
      back.appendChild(span);
      document.body.appendChild(back);
      
      localStorage.setItem(ties.innerHTML,ties.innerHTML);
      document.querySelector(".backgr").addEventListener("click",function () {
        document.querySelector(".backgr").remove();
        shufte(myRan);
        generate();
        record.innerHTML = Math.min(...mylen);
        blocks.forEach((blo,ind) => {
          blo.style.order = myRan[ind];
        });
        returnall();
      });
      }, duration);
    }
  });
});



function returnall() {
  blocks.forEach(rem => {
    rem.classList.remove("rotate-S");
    ties.innerHTML = 0;
  })
}


function shufte(arry){
  let current = arry.length,
      temp,
      random;
  
  while(current > 0) {
    random = Math.floor(Math.random() * current);
    
    current--;
    
    [arry[current],arry[random]] = [arry[random],arry[current]];
  
  }
  myRan = arry;
return arry;
}

function flip(blockElement) {
  blockElement.classList.add("rotate");
  
  let flipedBlock = blocks.filter(fil => fil.classList.contains("rotate"));
  
  if (flipedBlock.length === 2) {
    stopflip();
    check(flipedBlock[0],flipedBlock[1]);
  }

}

function stopflip() {
  blocksCont.classList.add("no-click");
  
  window.setTimeout(() => {
    blocksCont.classList.remove("no-click");
  },1000)
}

function check(first,second) {
  
  
  if (first.dataset.techno === second.dataset.techno) {
    first.classList.remove("rotate");
    second.classList.remove("rotate");
    
    first.classList.add("rotate-S");
    second.classList.add("rotate-S");
    
    document.getElementById("success").play();
  }else{
    ties.innerHTML = parseFloat(ties.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("rotate");
      second.classList.remove("rotate");
    },duration);
    
    document.getElementById("fail").play();
  }
}

