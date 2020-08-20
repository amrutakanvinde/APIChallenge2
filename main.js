const baseURL = 'https://superheroapi.com/api/3723965117617151/'; 
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
let body = document.querySelector('body');
let divContainer = document.querySelector('.container-fluid');
// const previousBtn = document.querySelector('#prev');
// const lnkPrev = document.getElementById('lnkPrev');
const lnkPrev = document.createElement('li');
const previousBtn = document.createElement('a');
const lnkNext = document.createElement('li');
const nextBtn = document.createElement('a');
// const nextBtn = document.getElementById('next');
const pagelnks = document.querySelectorAll('.page-number');
const ulTag = document.querySelector('ul');


console.log(pagelnks);


let colNumber = 0;
let rowNumber = 0;
let pageNumber = 1;
let pageSize = 21;
let heroCount = 731;
let fromId = 1;
let toId = fromId + pageSize;

const pageCount = heroCount/pageSize;



// pagelnks.forEach((pagelnk) => {
//     // pagelnk.addEventListener('click', pageEvent);
// })

loop(fromId, toId);

//previous button addition 
lnkPrev.setAttribute('class', 'page-item');
lnkPrev.classList.add('disabled');
previousBtn.setAttribute('class', 'page-link');
previousBtn.setAttribute('tabindex', '-1');
previousBtn.addEventListener('click',previousPage);
previousBtn.innerHTML = "Previous";
lnkPrev.appendChild(previousBtn);
ulTag.appendChild(lnkPrev);

for(let i = 0; i < pageCount; i++){
        let liTag = document.createElement('li');
        let aTag = document.createElement('a');
    
        liTag.setAttribute('class', 'page-item');
        aTag.setAttribute('class', 'page-link');
        aTag.classList.add('page-number');
        aTag.innerHTML = i + 1;
        aTag.addEventListener('click', pageEvent);
        
        liTag.appendChild(aTag);
        ulTag.appendChild(liTag);
}    

//next button addition here
lnkNext.setAttribute('class', 'page-item');
nextBtn.setAttribute('class', 'page-link');
nextBtn.addEventListener('click', nextPage);
nextBtn.innerHTML = "Next";
lnkNext.appendChild(nextBtn);
ulTag.appendChild(lnkNext);

function getData(id) {
    
    fetch(proxyURL + baseURL + id)
    .then(function(response){
        // console.log(response);
        // console.log("HERE");
        // console.log(response.status);
        return response.json();
    })
    .then(function(json){
        // console.log("NOW HERE");
        console.log(json);
        displayData(json);
    })
    .catch(function(err){
        console.log(err);
    })

    
}    



function pageEvent(e){
    console.log(e);
    pageNumber = e.srcElement.innerHTML;
    pageLogic();

}

function pageLogic(){
    fromId = ((pageNumber - 1) * pageSize) + 1;
    toId = fromId + pageSize;
    
    divContainer.innerHTML = "";
    colNumber = 0;
    rowNumber = 0;

    if(pageNumber === 1){
        lnkPrev.classList.add('disabled');
    }
    else {
        lnkPrev.classList.remove('disabled');
    }

    loop(fromId,toId);
}

function previousPage(e) {
    pageNumber--;
    pageLogic();
}

function nextPage(e) {
    pageNumber++;
    pageLogic();
}

function loop(fromId, toId){
    for(let i = fromId ; i < toId; i++){
        let randomid = i;//Math.floor(Math.random() * 731) + 1 ; 
        getData(randomid);          
    }

}


function displayData(json) {
    // console.log(json.image.url);
    let image = document.createElement('img');
    let textDiv = document.createElement('div');
    let lnkTag = document.createElement('a');
    let newCol = document.createElement('div');

    // console.log(json.image);
    image.src = json.image.url;
    image.alt = json.name;
    lnkTag.innerHTML = json.name;
    lnkTag.href = json.image.url;

    image.setAttribute('class', 'imageDisplay');
    newCol.setAttribute('class', 'col-sm-4');
    lnkTag.setAttribute('class', 'text');
    textDiv.setAttribute('class', 'textDiv');

    newCol.appendChild(image);
    textDiv.appendChild(lnkTag);
    newCol.appendChild(textDiv);

//Row Column logic --> every row has 3 columns, row number changes after col > 3.
    if(colNumber === 3){
        colNumber = 0;
        rowNumber++;
    }
    if(colNumber === 0){
        let newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        // console.log(newRow);
        divContainer.appendChild(newRow);
        newRow.appendChild(newCol);
    }
    else if(colNumber <= 2) {
        let newRow = document.querySelectorAll('.row')[rowNumber];
        // console.log(newRow,rowNumber);
        newRow.appendChild(newCol);
    }
    
    
    colNumber++;
    // rowNumber++;

}