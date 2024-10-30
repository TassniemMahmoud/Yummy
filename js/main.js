 $(document).ready(()=>{
    firstPage("").then(()=>{
        $(".loading-screen").fadeOut(500);
    })
   
 })
 
 /*---nav ---*/
 function openNav(){
    $(".open").on("click", function(){
        $(".nav-menu").css("left", "0");
       $(".close").removeClass("d-none");
       $(".open").addClass("d-none");
     
    })
    $(".nav-menu").animate({
        "left": "0"
    }, 500)

   
}

openNav()
 
 function closeNav(){
    $(".close").on("click", function(){
        $(".nav-menu").css("left", "-270px");
        $(".close").addClass("d-none");
        $(".open").removeClass("d-none");
       
    })
    $(".nav-menu").animate({
        "left": "-270px"
    }, 500)
   
}
closeNav()


 
 /*-----*/
 let search = document.getElementById("search");
 let categories = document.getElementById("categories");
 let catMeal = document.getElementById("catMeal")
 let area = document.getElementById("area");
 let Ingredients = document.getElementById("ingredients");
 let contactUs = document.getElementById("contactUs");
 let submitBtn;
 let meals = []

 /*----fisrt page---*/
async function firstPage(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json()
   /* console.log(data);*/
    displayMeals(data.meals)
}
firstPage()
/*------displayMeals for details section------*/
function displayMeals(meals){
    let cartona =``;
    for(let i = 0 ; i< meals.length ; i++){
        cartona += `<div class="col-md-3 ">
   <div class="meal position-relative rounded-2 overflow-hidden" onClick="getMealDetails('${meals[i].idMeal}')" >
    <img src="${meals[i].strMealThumb}" class="w-100 rounded-2 overflow-hidden"/>
    <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black text-center ">
        <h3>${meals[i].strMeal}</h3>
    </div>
</div>
       </div>`
    }
    document.getElementById("rowData").innerHTML = cartona
}


 async function getMealDetails(id){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
 /*   console.log(data);*/
    displayDetails(data.meals[0])
}
 function displayDetails(meals){
    let ingredients=''
   for( let i =1 ; i <= 20 ; i++){
    if(meals[`strIngredient${i}`]){
        ingredients += `<li class=" alert alert-info m-3 p-1">${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`
    }
   }
   let tags = meals.strTags?.split(",");
   if(!tags) tags =[]
   let tagsStr=""
   for(let i = 0 ; i <tags.length; i++){
tagsStr += `<li class=" alert alert-danger m-3 p-1"> ${tags[i]}</li>`
   }
     let cartona =`<div class="col-md-4 ">
        <img class="w-100 rounded-3 " src="${meals.strMealThumb}"
            alt="">
            <h2>${meals.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meals.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meals.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meals.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
     ${ingredients}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tagsStr}
        </ul>

        <a target="_blank" href="${meals.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meals.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
    document.getElementById("rowData").innerHTML = cartona
 }
                        /*!-----------------search..................!*/
 search.addEventListener("click" , function(){
    showSearchInputs();
    document.getElementById("rowData").innerHTML=""
    closeNav()
 })
 function showSearchInputs(){
    document.getElementById("searchPlace").innerHTML= `<div class="row ">
     
        <div class="col-md-6 text-white">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup ="searchByFletter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
   
    </div>`

 }
 
 async function searchByName(term){
    $(".inner-loading-screen").fadeIn(300)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
   let data = await response.json();
/*console.log(data);*/
data.meals ? displayMeals(data.meals) : displayMeals([])
$(".inner-loading-screen").fadeOut(300);
}
 async function searchByFletter(term){
   term == "" ? term = "a" : "";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
   let data = await response.json();
   console.log(data);
   data.meals ? displayMeals(data.meals) : displayMeals([])
}
                        /*------------categories----------------*/
 categories.addEventListener("click", function(){
    getCategory()
closeNav()

 })               
 async function getCategory(){
 $(".inner-loading-screen").fadeIn(300)
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
  /*  console.log(data);*/
    displayCategory(data.categories);
    $(".inner-loading-screen").fadeOut(300)
 }

function displayCategory(meals){
     document.getElementById("searchPlace").innerHTML=""
let cartona = ``;
for (let i = 0 ; i < meals.length ; i ++){
   cartona += `<div class="col-md-3">
   <div class="meal position-relative rounded-2 overflow-hidden cursor-pointer" onclick="getCategoryMeals('${meals[i].strCategory}')" >
    <img src="${meals[i].strCategoryThumb}" class="w-100 rounded-2 overflow-hidden"/>
    <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black text-center ">
        <h3>${meals[i].strCategory}</h3>
        <p>${meals[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
    </div>
</div>
            </div>`
   document.getElementById("rowData").innerHTML = cartona
}
}
 async function getCategoryMeals(cat){
    $(".inner-loading-screen").fadeIn(300)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
   let data = await response.json();
 /* console.log(data);*/
  displayMeals(data.meals.slice(0,20))
  $(".inner-loading-screen").fadeOut(300)
}



                       /*-------------Area----------------*/
area.addEventListener("click", function(){
   getArea();
   closeNav()
})
 async function getArea(){
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   let data = await response.json()
  /* console.log(data);*/
   displayArea(data.meals)
}
function displayArea(meals){
     document.getElementById("searchPlace").innerHTML=""
let cartona = ``
for (let i = 0 ; i <=20 ; i++){
   cartona +=`<div class="col-md-3 text-center cursor-pointer" onclick="displayAreaMeals('${meals[i].strArea}')">
   
            <i class="fa-solid fa-house-laptop text-white display-4  text-center" ></i>
            <h3 class="text-white">${meals[i].strArea}</h3>
           </div>`
           document.getElementById("rowData").innerHTML= cartona
}
}
 async function displayAreaMeals(area){
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json()
   /* console.log(data);*/
    displayMeals(data.meals.slice(0,20));
    $(".inner-loading-screen").fadeOut(300)
}


                  /*------------ingredients----------------*/
Ingredients.addEventListener("click", function(){
   getIng();
   closeNav()
})
 async function getIng(){
    $(".inner-loading-screen").fadeIn(300)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   let data = await response.json();
  /* console.log(data);*/
   displayIng(data.meals)
   $(".inner-loading-screen").fadeOut(300)
}
function displayIng(meals){
     document.getElementById("searchPlace").innerHTML=""
   let cartona = ``;
   for( let i = 0 ; i <= 20; i++){
      cartona += `<div class="col-md-3">
                <div class="text-center cursor-pointer text-white" onClick="displayIngMeals('${meals[i].strIngredient}')">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${meals[i].strIngredient}</h3>
                    <p>${meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
               </div>`
   }
   document.getElementById("rowData").innerHTML= cartona
}

 async function displayIngMeals(ing){
    $(".inner-loading-screen").fadeIn(300)
let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
let data = await response.json()
displayMeals(data.meals.slice(0,20));
$(".inner-loading-screen").fadeOut(300)

}
   /*----------contactus---------------*/

contactUs.addEventListener("click", showContact)

function showContact(){
    closeNav()
     document.getElementById("searchPlace").innerHTML=""
   document.getElementById("rowData").innerHTML = ` <div class="contact d-flex align-items-center justify-content-center min-vh-100">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="emailInput" type="email" class="form-control" placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="phoneInput" type="text" class="form-control" placeholder="Enter Your phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="ageInput" type="number" class="form-control" placeholder="Enter Your age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="passInput" type="password" class="form-control" placeholder="Enter Your password">
                            <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input onkeyup="inputsValidation()" id="repassInput" type="password" class="form-control" placeholder="Repassword">
                            <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword 
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div>
            </div>`
          
             submitBtn = document.getElementById("submitBtn")
             document.getElementById("nameInput").addEventListener("focus", ()=>{
                nameInputTouched = true
            })
             document.getElementById("emailInput").addEventListener("focus", ()=>{
                emailInputTouched = true
            })
             document.getElementById("phoneInput").addEventListener("focus", ()=>{
                phoneInputTouched = true
            })
             document.getElementById("ageInput").addEventListener("focus", ()=>{
                ageInputTouched= true
            })
             document.getElementById("passInput").addEventListener("focus", ()=>{
                passInputTouched = true
            })
             document.getElementById("repassInput").addEventListener("focus", ()=>{
                repassInputTouched = true
            })
}

let nameInputTouched = false;
let emailInputTouched = false; 
let phoneInputTouched = false;
let ageInputTouched = false;
let passInputTouched = false;
let repassInputTouched = false;

function inputsValidation(){
    if(nameInputTouched){
        if (nameValidation()){
            document.getElementById("nameAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("nameAlert").classList.replace("d-none","d-block")
        }
    }
    if(emailInputTouched){
        if(emailValidation()){
            document.getElementById("emailAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("emailAlert").classList.replace("d-none","d-block")
        }
    }
    if(phoneInputTouched){
        if(phoneValidation()){
            document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        }
    }
    if(ageInputTouched){
        if(ageValidation()){
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
        }
    }
    if(passInputTouched){
        if(passValidation()){
            document.getElementById("passAlert").classList.replace("d-block","d-none")
        }else{
            document.getElementById("passAlert").classList.replace("d-none","d-block")
        }
    }
   if(repassInputTouched){
    if(rePassValidation()){
        document.getElementById("repassAlert").classList.replace("d-block","d-none");
    }else{
        document.getElementById("repassAlert").classList.replace("d-none","d-block");
    }
   }
    
  if(nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passValidation() &&
  rePassValidation())  {
submitBtn.removeAttribute("disabled")
  } else{
    submitBtn.setAttribute("disabled",true)
  }
}
function nameValidation(){
    return(/^[a-zA-Z\s]+$/.test(document.getElementById("nameInput").value))
}
     
function emailValidation(){
return(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById("emailInput").value))
  
}
function phoneValidation(){
    return(/^\d{11,}$/.test(document.getElementById("phoneInput").value))

}

function ageValidation(){
return(/^\d{11,}$/.test(document.getElementById("ageInput").value))
}
function passValidation(){
return(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passInput").value))

}

function rePassValidation(){
    return document.getElementById("repassInput").value == document.getElementById("passInput").value
  
}





 
 
     