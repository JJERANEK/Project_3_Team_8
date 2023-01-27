import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text

from flask import Flask, jsonify

from flask_cors import CORS, cross_origin


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///project_3_db.sqlite") 

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# # Save reference to the table
foodData = Base.classes.usda_data


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app)

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
        f"/api/v1.0/usda_data"
    )

@app.route("/api/v1.0/usda_data")
def getdata():
    session = Session(engine)
    results = session.query(foodData.FIPS, foodData.State, foodData.County, foodData.Population_Estimate_2018, foodData.Fast_Food_Restaurants, 
        foodData.Fast_Food_Restaurants_Per_1000_of_Population, foodData.Grocery_Stores, foodData.Grocery_Stores_Per_1000_of_Population, foodData.Farmers_Markets, 
        foodData.Farmers_Markets_Per_1000_of_Population, foodData.Obesity).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_data = []
    for FIPS, State, County, Population_Estimate_2018, Fast_Food_Restaurants, Fast_Food_Restaurants_Per_1000_of_Population, Grocery_Stores, Grocery_Stores_Per_1000_of_Population, Farmers_Markets, Farmers_Markets_Per_1000_of_Population, Obesity in results:
        county_dict = {}
        county_dict["FIPS"] = FIPS
        county_dict["State"] = State
        county_dict["County"] = County
        county_dict["Population_Estimate_2018"] = Population_Estimate_2018
        county_dict["Fast_Food_Restaurants"] = Fast_Food_Restaurants
        county_dict["Fast_Food_Restaurants_Per_1000_of_Population"] = Fast_Food_Restaurants_Per_1000_of_Population
        county_dict["Grocery_Stores"] = Grocery_Stores
        county_dict["Grocery_Stores_Per_1000_of_Population"] = Grocery_Stores_Per_1000_of_Population
        county_dict["Farmers_Markets"] = Farmers_Markets
        county_dict["Farmers_Markets_Per_1000_of_Population"] = Farmers_Markets_Per_1000_of_Population
        county_dict["Obesity"] = Obesity

        all_data.append(county_dict)

    return jsonify(all_data)


if __name__ == '__main__':
    app.run(debug=True)
