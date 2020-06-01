const text = document.getElementById('text')
const btn = document.getElementById('btn')
const listContainer = document.getElementById('list-container')
const mealContainer = document.getElementById('meal-container')
const ingredientsDOM = document.getElementById('ingredients')

let meals = [];


function fetchMeal(meal) {

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  .then(result => {
    return result.json();
  })
  .then(data => {

    data.meals.forEach((mealInfo) => {

    meals.push(mealInfo)
    console.log(meals)

    // Create new element
    const newMeal = document.createElement('div')
    // Append class to it
    newMeal.classList.add('list-container__meal')
    // Add its HTML
    newMeal.innerHTML = `
       <img src="${mealInfo.strMealThumb}" class="list-img" alt="photo">
       <h2 class="list-container__text btn" onclick="mealInfo(${mealInfo.idMeal})">${mealInfo.strMeal}</h2>
    `
    // Append to list container parent div
    listContainer.appendChild(newMeal);

    })

  })

  .catch(err => alert('Please enter proper meal :)'));
};


function mealInfo(id) {

  // Retrieve the meal info thanks to the ID from the meals array
  const mealInfo = meals
        .filter(meal => meal.idMeal == id)
        .shift()

  // Get ingredients
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(mealInfo[`strIngredient${i}`]) {
      ingredients.push(`${mealInfo[`strIngredient${i}`]} <br/> <strong style="color:white">${mealInfo[`strMeasure${i}`]}</strong>  `)
    } else {
      break
    }
  }

  mealContainer.innerHTML = "";

  mealContainer.innerHTML = `
  <img src="${mealInfo.strMealThumb}" class="meal-img" alt="photo">
  <h1>${mealInfo.strMeal}</h1>
  <h3>${mealInfo.strInstructions}</h3>
  <ul class="ingredients">
    ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
  </ul
  `
};


// Event Listeners


btn.addEventListener('click', (e) => {
  e.preventDefault();
  const meal = text.value

  if (meal.trim() === "") {
    alert('Please enter a meal :)')
  } else {
    fetchMeal(meal);
  }

  text.value = "";

});





