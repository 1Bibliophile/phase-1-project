const BASE_URL = "http://localhost:3000/data";
const artList = document.getElementById("art-list")
//Every artwork should have "likes": 0 property

let artData = [];

const results = document.getElementById("results-artwork")


const returnNone = () => {
    const div = document.createElement("div")
    div.className = "art-warning"
    div.style = `padding: 20px; margin: 20px;`

    const header = document.createElement("h3");
    header.textContent = "No Artworks Found";

    div.appendChild(header)

}


const makeArtworkTile = (artwork) => {
    const div = document.createElement("div");
    div.id = `art-card-${artwork.id}`
    div.className = "art-card";

    div.style = 
    `
    padding: 20px; margin: 20px; text-align: center;
    border: 2px; color: #800000; font-family: Lato;
    width: 500px; display: flex; flex-direction: column;
    `
    
    const artName = document.createElement("h2");
    artName.textContent = artwork.title;

    const p = document.createElement("p")
    p.id = `art-info-${artwork.title}`
    p.className = `art-info`

    p.style = 
    `
        background-color: #800000; color: #fff; display: flex;
        height: 120px; vertical-align: middle;
        width: auto;
    `


    p.innerHTML = 
    `   

        Artist: ${artwork.artist_title} ∙
        Date: ${artwork.date_display} ∙
        Category: ${artwork.department_title} ∙
        Classification: ${artwork.classification_title} ∙
        <br>
        <br>
    `
    
    //p.innerText.replaceAll('...', '\n')

    const artImage = document.createElement("img") 
    artImage.src = artwork.image;
    //artImage.innerHTML = `<img src=${artwork.image}/>;`
    
    /*const span = document.createElement("h1");
    span.artName = "art-details"
    span.textContent = 
    `
    
    `
    */

    const likeButton = document.createElement("span")
    likeButton.id = "likeButton"

    let likes = artwork.likes
    likeButton.textContent = `♥ ${likes}`


    

    likeButton.style = 
    `
        cursor: pointer; 
        font-size: 18px;
    `

    likeButton.addEventListener('click', () =>
    {
        //++likes;
        likeButton.style = 
        `
            transform: scale(1.2);
            color: #FF0000;
        `
        likeButton.textContent = `♥ ${++likes}`
    })

    likeButton.addEventListener('transitionend', () =>
    {
        likeButton.style = 
        `
            transform: scale(1);
        `
    })


    div.append(artName, artImage, p, likeButton);
   //div.appendChild(artImage)
    results.appendChild(div);
    
}

/*
function getArtworkByArtName(artName){
    fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then((jsonData) => {
        const res = jsonData.map(data => data.title)
        makeArtworkTile(res)
        //console.log(res)
    })
}
*/
/*
const searchArt = (e) => {
    e.preventDefault();

    const search = e.target[0].value;
    e.target.reset()
    
}
*/
artList.addEventListener("submit", searchArt)

const displayArtworks = (artworks) => {
    results.innerHTML = ""
    if(artworks.length > 0){
    
        artworks.forEach(artwork => makeArtworkTile(artwork))
        
    }
    else 
    {
        returnNone();
    }
}


const handleErrorDisplay = () => {

}


const fetchArtworks = () => {
    
    
    fetch(BASE_URL)
    .then(response => response.json())
    .then(artworks => {
        artData = artworks;
        displayArtworks(artworks)
    })
    .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
    })
    
}

const handlePageLoaded = () => {
    fetchArtworks();
}




function searchArt(e)
{
    

    e.preventDefault();
    
    const query = e.target[0].value;

    if(query === 0 || query === '')
    {
        displayArtworks(artData)
    }
    else
    {
        const artName = artData.filter(object => object.title.includes(query));
        const artDate = artData.filter(object => object.date_end === parseInt(query));
        const artist = artData.filter(object => object.artist_title.includes(query));
        
        displayArtworks([...artName, ...artDate, ...artist])

        //const url = `https://api.artic.edu/api/v1/artworks/search?q=`
        //fetch(`${url}?fields=${query}`)
        //.then(response => response.json())
        /*.then((jsonData) => 
        {
            const res = jsonData.map(element => element.title)
            displayArtworks(res)
            document.getElementById("errorMessage").innerHTML = ""
        })
        */
       /*
       .then(jsonData => displayArtworks(jsonData.data))
        .catch((error) =>
        {
            document.getElementById("errorMessage").innerHTML = error;
        })
        */
        
    }


    /*
    const renderResults = (results) =>
    {
        const list = document.getElementById("results-artwork")
        list.innerHTML = ""
        results.forEach(result =>
        {
            displayArtworks(result)
        })
    }
    */
    }


document.addEventListener("DOMContentLoaded", fetchArtworks);
//document.addEventListener("DOMContentLoaded", searchArt);