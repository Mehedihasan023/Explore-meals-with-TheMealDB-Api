// fetch data from api
const loadData =(search)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMeals(data.meals))
//    handle error 
   .catch(error=>{
      alert('There is something  wrong with your search text or data is not loaded');
      loadData('');
   });
}
//  use display function to display loaded data
const displayMeals=(meals)=>{
  const mealsContainer = document.getElementById('meals-container');
//   clear the previous element
  mealsContainer.innerHTML=``;
  meals.forEach(meal=>{
    // create html div element to show data dynamically
    const mealDiv = document.createElement('div');
    mealDiv.classList=('col')
    mealDiv.innerHTML=`
    <div class="card hover-effect" onclick="loadMealDetails(${meal.idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
      </div>
     
    </div>
    `;
  mealsContainer.appendChild(mealDiv);

  })
}
// fetch single meal data by id
const loadMealDetails=(idMeal)=>{
  
  const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res=>res.json())
    .then(data=> showMealDetails(data.meals[0]))

}
//  use showMealDetails function to display single meal ddetails in modal
const showMealDetails=(meal)=>{

    const showDetails = document.getElementById('show-details');
     showDetails.innerHTML=``;
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="modal-content">
        <div class="modal-header border-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
        </div>
        <div class="modal-body">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="">
         <h4 class="mt-3">${meal.strMeal}</h4>
         <h4>Country:${meal.strArea}</h4>
         <h4>Category:${meal.strCategory}</h4>
         <a href="${meal.strYoutube}" target="blank" class="btn btn-primary">How to make</a>
        </div>
  </div>
 
    `;
  
    showDetails.appendChild(div);
}
// call loadData function by user search text
const searchMeals=()=>{
  const inputField= document.getElementById('input-field');
  const inputText=inputField.value;
      loadData(inputText);
      inputField.value='';
}
// search by empty string if user doesn't give any input value
loadData('');