import json
import database as database

def scheduling_chart(date):
    # Search an order with a date and return the one result
    try:

        # Create database connection and connection object
        db = database.database_connection()
        schedule= db["schedule"]
        result_schedule = schedule.find({ "date": date })
        result_schedule = list(result_schedule)
        json_schedule_data = json.dumps(result_schedule, default = str)
        return json_schedule_data

    # Error handler
    except:
        return ({"warning": "Exception error!"})