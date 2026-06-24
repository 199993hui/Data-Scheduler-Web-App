import json
import database as database
import unique_date

def get_order_data(table, start, end):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        collection = db[table]
        query = {
        "date": {
            "$gte": start,
            "$lte": end
         }
        }
        result = collection.find(query)
        result = list(result)
        json_data = json.dumps(result, default = str)
        return json_data

    # Error handler
    except:
        return ({"warning": "Exception error!"})
    
    
def get_line_chart_data():
    try:
        # Create database connection and connection object
        db = database.database_connection()
        collection = db["input_fww"]
        date = unique_date.get_unique_date()
        sorted_dates = sorted(date.keys(), reverse=True)
        latest_week = sorted_dates[:5]
        query = {"date": {"$in": latest_week}}

        # Query to retrieve the latest 5 data based on date in descending order
        sort = [("date", 1)]
        result = collection.find(query).sort(sort)
        result = list(result)
        json_data = json.dumps(result, default=str)
        return json_data

    # Error handler
    except Exception as e:
        return {"warning": "Exception error!"}
    
def get_product_data(table, date):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        collection = db["input_productmatrix"]
        
        result = collection.find({ "date": date })
        result = list(result)
        json_data = json.dumps(result, default = str)
        return json_data

    # Error handler
    except:
        return ({"warning": "Exception error!"})

def get_plan_data(table, date):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        collection = db['output_loading plan']
        result = collection.find({ "date": date })
        result = list(result)
        json_data = json.dumps(result, default = str)
        print(json_data)
        return json_data

    # Error handler
    except:
        return ({"warning": "Exception error!"})