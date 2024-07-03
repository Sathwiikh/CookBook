const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

// function to get Recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();


    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
    const button = document.createElement('button');
    button.textContent = 'View Recipe';
    recipeDiv.appendChild(button);

    // adding event listener to recipes
    button.addEventListener('click' , () => {
        openRecipePopUp(meal);
    })

    recipeContainer.appendChild(recipeDiv);
    })

} catch (error) {
        recipeContainer.innerHTML = "<h2>Error Fetching Recipes...</h2>"
}
}

const fetchIngredents = (meal) => {
    let ingredentsList = '';
    for(let i=1 ; i <= 20 ; i++){
        const ingredint = meal[`strIngredient${i}`];
        if(ingredint){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredint}</li>`
        }else{
            break;
        }
    }
    return ingredentsList
}

const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents :</h3>
    <ul class="ingredientsList">${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block"
}

recipeCloseBtn.addEventListener('click' , () => {
    recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the Search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
    console.log("Button Clicked")
})