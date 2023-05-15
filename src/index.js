console.log('%c HI', 'color: firebrick')

const container = document.querySelector("#dog-image-container")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const ulContainer = document.querySelector("#dog-breeds")
const dropDown = document.querySelector('#breed-dropdown')
let breedsArray = []


ulContainer.addEventListener('click', handleClick);
dropDown.addEventListener('change', handleChange)

// Add JavaScript that:

// - on page load, fetches the images using the url above ⬆️
// - parses the response as `JSON`
// - adds image elements to the DOM **for each** 🤔 image in the array

function getImages(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
        const imgs = images.message
    // take this array of images
    // turn it into img elements
        let imgsArray = createImgElement(imgs)
        renderElement(imgsArray)
        })
}
    // append each img element to the DOM
    

function createImgElement(imgs){
    return imgs.map((img) => {
        let i = `<img src = ${img}>`
        return i
    })
}

function renderImg(imgsArray){
    imgsArray.forEach(element => {
        renderElement(element)
    })
}

function renderElement(element){
    ulContainer.innerHTML += element
}

// When you inspect breeds.message below, it returns an object instead of an array, so you need to use Object.keys() to turn the properties of that object into an array.
function getBreeds(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedsArray = Object.keys(breeds.message)
        const breedsLis = createLiElement(breedsArray)
        renderLis(breedsLis)
    //     const imgs = images.message
    // // take this array of images
    // // turn it into img elements
    //     let imgsArray = createImgElement(imgs)
    //     renderImg(imgsArray)
    
        })
}

function createLiElement(breedsArray){
    return breedsArray.map((breed) => {
        let li = `<li>${breed}</li>`
        return li
    })
}

function renderLis(breedsLis){
    breedsLis.forEach(element => {
        renderElement(element)
    })
}

//Challenge 3: add Event Listener. Going to wrap it around the ul b/c if we change the element on our dom we also lose the event listener. If that's the case you want to move your event listener to a greater scope where it won't be lost.

function handleClick(e){
// This will toggle a color back and forth for each click on it between red and black.
    if(e.target.nodeName === 'LI'){
        if (e.target.style.color === 'red'){
            e.target.style.color = 'black'
        } else {
        e.target.style.color = 'red'
        }
    }
}

// Challenge 4: Once we are able to load _all_ of the dog breeds onto the page, add JavaScript
// so that the user can filter breeds that start with a particular letter using a
// [dropdown]

function handleChange(e) {
    const letter = e.target.value
    // filter out the breeds that start with the letter
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filteredBreedsLis = createLiElement(filteredBreeds);
    ulContainer.innerHTML = ''
    renderLis(filteredBreedsLis)

}

getImages();
getBreeds();

