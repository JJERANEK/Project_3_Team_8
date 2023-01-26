import numpy as np
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_mongoengine import MongoEngine

# Database Setup
# Find corret setup for MongoDB

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save reference to the table
# Passenger = Base.classes.test

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
conn = 'mongodb://localhost:27017'
client - pymongo.MongoClient(conn)
db = client.project_3_db

# app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase" #CHANGE WHEN DATABASE NAME IS CONFIRMED
# mongodb_client = PyMongo(app)
# db = mongodb_client.db
#mongo = PyMongo(app, uri="mongodb://localhost:27017/myDatabase")


# app.config['MONGODB_SETTINGS'] = {
#     'db': 'your_database',
#     'host': 'localhost',
#     'port': 27017
# }
# db = MongoEngine()
# db.init_app(app)

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
    data = db.find()
    return jsonify([i for i in data])
    #return mongo.send_file(file) - WOULD NEED TO INCLUDE FILE - DB.FIND(FILE)
    # SET UP A RETURN OF THE JSON FILE FOR THE CORRECT THING

if __name__ == '__main__':
    app.run(debug=True)
