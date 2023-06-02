let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5,
    mood: 'tolerant'
  }
  let inKittens = false
  for (i = 0; i < kittens.length; i++) {
    if (kittens[i].name == kitten.name) {
      inKittens = true
    }
  }
  if (inKittens == false) {
    kittens.push(kitten)
    saveKittens()
  }
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  storedKittens = window.localStorage.getItem("kittens")
  storedKittens = JSON.parse(storedKittens)
  if (storedKittens) {
    kittens = storedKittens
    getStarted()
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let drawnCats = document.getElementById("kittens")
  drawnCats.innerHTML = ''
  kittens.forEach(kitten => {
    drawnCats.innerHTML += `
    <div class="kitten">
      <div class="card text-center kitten ${kitten.mood}">
        <h3>${kitten.name}</h3>
        <img src="catcard.webp" width="300" alt="cat">
          <div>
            <h5>mood: ${kitten.mood}</h5>
            <button onclick="pet('${kitten.id}')">pet</button>
            <button onclick="catnip('${kitten.id}')">catnip</button>
          </div>
      </div>
      <button class="btn-cancel" onclick="removeKitten('${kitten.id}')">Delete</button>
    </div>
    `
  })
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let foundKitten = {}
  for (i = 0; i < kittens.length; i++) {
    if (kittens[i].id == id) {
      return kittens[i];
    }
  }
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let foundKitten = findKittenById(id);
  randNum = Math.random();
  if (randNum > .5) {
    foundKitten.affection++;
  } else {
    foundKitten.affection--;
  }
  setKittenMood(foundKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  foundKitten = findKittenById(id);
  foundKitten.affection = 5;
  setKittenMood(foundKitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  let affect = kitten.affection;
  if (affect < 5 && affect > 3) {
    kitten.mood = 'angry'
  } else if (affect <= 3) {
    kitten.mood = 'gone'
  } else if (affect > 5) {
    kitten.mood = 'happy'
  } else {
    kitten.mood = 'tolerant'
  }
  saveKittens()
}

/**
 * Removes a kitten from the array
 * @param {string} id
 */
function removeKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id === id);
  kittens.splice(index,1)
  saveKittens()
}
/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();