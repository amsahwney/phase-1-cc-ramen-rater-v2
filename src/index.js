// index.js

//GLOBAL CONSTANTS
const ramenMenu = document.querySelector("#ramen-menu")
const ramenDetail = document.querySelector('#ramen-detail')
const ramenImageDetail = ramenDetail.querySelector(".detail-image")
const ramenNameDetail = ramenDetail.querySelector(".name")
const ramenRestaurantDetail = ramenDetail.querySelector(".restaurant")
const ramenRatingDetail = document.querySelector("p")
const ramenCommentDetail = document.querySelector("#comment-display")
const newRamenForm = document.querySelector("#new-ramen")

//declaring constants for submit form
const nameInput = document.querySelector("#new-name")
const restaurantInput = document.querySelector("#new-restaurant")
const imageInput = document.querySelector("#new-image")
const ratingInput = document.querySelector("#new-rating")
const commentInput = document.querySelector("#new-comment")



// Callbacks
const handleClick = (ramen) => {
  // Add code
ramenImageDetail.src = ramen.image
ramenNameDetail.textContent = ramen.name
ramenRestaurantDetail.textContent = ramen.restaurant
ramenRatingDetail.textContent = `${ramen.rating}/10`
ramenCommentDetail.textContent = ramen.comment

};



const addSubmitListener = () => {
  // Add code
  async function submitNewRamen(event) {
  
  //FIRST: stop the page from reloading 
    event.preventDefault()

  //function to add the form submission to the ramen menu div - this is a callback function for the POST 
    function ramenToSite(ramen) {
      const newImgDiv = document.createElement("img")
      newImgDiv.src = ramen.image
      ramenMenu.append(newImgDiv)
    }
  
  //POST request add ramens to the backend - the db.json (so that we can add them to the front end (using ramen to site))
    const response = await fetch(`http://localhost:3000/ramens`, {
      method: "POST", 
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify( { 
        name: nameInput.value,
        restaurant: restaurantInput.value,
        image: imageInput.value,
        rating: ratingInput.value,
        comment: commentInput.value } )
    })
    const newRamen = await response.json()
    ramenToSite(newRamen)

  //so the ramen form resets after a submission 
    newRamenForm.reset() 
  }

//ITS EVENT LISTENER TIME BABY
  newRamenForm.addEventListener("submit", () => submitNewRamen(event))
}



const displayRamens = async() => {
  // Add code
 const response = await fetch('http://localhost:3000/ramens')
 const ramens = await response.json()
 
 ramens.forEach(ramen => {
  const imgDiv = document.createElement("img")
  imgDiv.src = ramen.image
  ramenMenu.append(imgDiv)

imgDiv.addEventListener('click', () => handleClick(ramen))
})

};



const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main()



// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
