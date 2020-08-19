const baseURL = 'https://superheroapi.com/api/3723965117617151/'; 
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
let body = document.querySelector('body');
let divContainer = document.querySelector('.container-fluid');
const previousBtn = document.querySelector('.prev');
let fromId = 1;
let toId = 10;
// console.log(divContainer);
// let id = 5;
let url; 

// previousBtn.addEventListener('click',previousPage);

//comments to make thois 
//work

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
        // console.log(json);
        displayData(json);
    })
    .catch(function(err){
        console.log(err);
    })

    
}    

for(let i = fromId ; i < toId; i++){
    let randomid = i;//Math.floor(Math.random() * 731) + 1 ; 
    getData(randomid);          
}

let colNumber = 0;
let rowNumber = 0;

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