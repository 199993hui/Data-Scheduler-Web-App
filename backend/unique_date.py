import database as database

def get_data_date():

    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]
        product = db["input_productmatrix"]
        output = db["output_loading plan"]
        schedule = db["schedule"]

        sort = [("date", 1)]
        result_order = order.find().sort(sort)
        result_order = list(result_order)
        date = {result['date']:result['date'] for result in result_order}

        data = []
        for date_find,_ in date.items():
            data_dict = {}
            data_dict[date_find] = date_find
            data_dict['order_count'] = order.count_documents({ "date": date_find })
            data_dict['product_count'] = product.count_documents({ "date": date_find })
            data_dict['output_count'] = output.count_documents({ "date": date_find })
            data_dict['schedule_count'] = schedule.count_documents({ "date": date_find })
            data.append(data_dict)

        return data
    
    # Error handler
    except:
        return {}

def get_dashboard_date():

    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]
        sort = [("date", 1)]
        result_order = order.find().sort(sort)
        result_order = list(result_order)
        date = {result['date']:result['date'] for result in result_order}

        data = []
        for date_find,_ in date.items():
            data_dict = {}
            data_dict[date_find] = date_find
            data_dict['order_count'] = 1
            data_dict['product_count'] = 1
            data_dict['output_count'] = 1
            data_dict['schedule_count'] = 1
            data.append(data_dict)

        return data
    
    # Error handler
    except:
        return {}

def get_unique_date():

    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]

        result_order = order.find()
        result_order = list(result_order)
        date = {result['date']:result['date'] for result in result_order}

        return date
    
    # Error handler
    except:
        return {}
    
def get_latest_date():

    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]
        result_order = order.find()
        result_order = list(result_order)
        date = {result['date']:result['date'] for result in result_order}
        sorted_dates = sorted(date.keys(), reverse=True)
        latest_date = sorted_dates[:1]
        return latest_date
    
    # Error handler
    except:
        return {}