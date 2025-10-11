// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();



// nice select
$(document).ready(function () {
    $('select').niceSelect();
});

// slick slider

$(".slider_container").slick({
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    draggable: false,
    prevArrow: '<button class="slick-prev"> </button>',
    nextArrow: '<button class="slick-next"></button>',
    responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                adaptiveHeight: true,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }
    ]
});
async function showRecipeSectionHome() {
    const ingredients = document.getElementById("ingredients").value;
    const response = await fetch("/search", {
        method : "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({ ingredients })
    });
    data = await response.json();
    recipes = data.recipes;
    document.getElementById("popular_recipe_containter").style.display = "block";
    for (let i = 0; i < recipes.length; i++) {
        document.getElementById(`recipe_title${i+1}`).textContent=recipes[i].title;
        document.getElementById(`recipe_img${i+1}`).src = recipes[i].img;
        document.getElementById(`recipe_link${i+1}`).href=`/recipe/${recipes[i].id}`;
        localStorage.setItem(`recipeTitle${recipes[i].id}`, recipes[i].title);
        localStorage.setItem(`recipeImg${recipes[i].id}`, recipes[i].img);
        
    };
}

