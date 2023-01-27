from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo
import json
import pandas as pd
from pymongo import MongoClient

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app)

# app.config['JSON_SORT_KEYS'] = False

conn = 'mongodb+srv://project_3_team:pass@cluster0.gkjcbhn.mongodb.net/test'
client = pymongo.MongoClient(conn)
db = client.project_3_db
collection = db.usda_data

#################################################
# Flask Routes
#################################################

@app.route("/")
@app.route("/index")
@app.route("/index.html")
def homepage():
    """List all available API routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/usda_data<br/>"
    )

@app.route("/api/v1.0/usda_data")
def getdata():
    data = collection.find()
    return jsonify([i for i in data])

if __name__ == '__main__':
    app.run(debug=True)
