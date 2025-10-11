from flask import Flask, render_template, request, jsonify
import requests
app = Flask(__name__)
API_KEY = "c55977c391cd4736af7961fb4e863a84"
@app.route("/")
def home():
    return render_template("index.html")