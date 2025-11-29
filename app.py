from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__)
API_KEY = "790d47bbf67d42688eb4542cb2e83949"
@app.route("/")
def home():
    food_trivia_texts = []
    for i in range(3):
        #used another api key just for fun facts because it took too many points :(
        random_trivia_txt = requests.get("https://api.spoonacular.com/food/trivia/random?apiKey=c55977c391cd4736af7961fb4e863a84").json()["text"]
        food_trivia_texts.append(random_trivia_txt)
    return render_template("index.html", food_trivia_texts=food_trivia_texts)
@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    ingredients = data.get("ingredients", "")
    recipes = []
    get_recipes = requests.get(f"https://api.spoonacular.com/recipes/complexSearch?includeIngredients={ingredients}&number=3&sort=popularity&apiKey={API_KEY}").json()["results"]
    for i in get_recipes:
        recipe_dict = {
            "title" : i["title"],
            "img" : i["image"],
            "id" : i["id"]
        }
        recipes.append(recipe_dict)
    return jsonify({"recipes" : recipes})
@app.route("/recipe/<int:recipe_id>")
def recipe_detail(recipe_id):
    response = requests.get(f"https://api.spoonacular.com/recipes/{recipe_id}/analyzedInstructions?apiKey={API_KEY}").json()[0]["steps"]
    instructions = ""
    for i in response:
        instructions += i["step"] + " "
    return render_template("recipe.html", instructions=instructions, recipe_id=recipe_id)
    
