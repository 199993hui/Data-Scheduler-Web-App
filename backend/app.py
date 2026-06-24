from flask import Flask, request,jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from flask_jwt_extended import JWTManager, get_jwt_identity
from dateutil import parser
import json
import pandas as pd
from datetime import datetime, timedelta
import pytz
import subprocess

import database
import employee
import dashboard
import unique_date
import to_text 
import schedule
import clustering

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

api = Api(app)
CORS(app)


def authenticate_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            role = get_jwt_identity()["role"]
            
            # User 1: Access all resources
            if role == "Root":
                return func(*args, **kwargs)
            
            # User 2: Exclude api_emp
            if role == "Admin":
                if request.endpoint == "/emp":
                    return jsonify({"error": "Unauthorized"})
                else:
                    return func(*args, **kwargs)
            
            # User 3: Exclude api_emp and api_table_data
            if role == "Employee":
                if request.endpoint in ["/emp", "/data"]:
                    return jsonify({"error": "Unauthorized"})
                else:
                    return func(*args, **kwargs)
            
            # Unauthorized users
            return jsonify({"error": "Unauthorized"})
        
        except Exception as e:
            return jsonify({"error": str(e)})
    
    return wrapper


# ============ Data ==============
# add data
def add_data(data, date):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        input= db["input_fww"]
        
        count_sheet = []

        # Search an order with a date and return the one result
        i = input.find_one({"date": date})
        if not i:
            for sheet_name, data in data.items():
                if sheet_name == "Input_FWW":
                    count_sheet.append(sheet_name)
                
                if sheet_name == "Input_ProductMatrix":
                    count_sheet.append(sheet_name)

                if sheet_name == "Output_Loading Plan":
                    count_sheet.append(sheet_name)
                if sheet_name == "Input_FWW" or sheet_name == "Input_ProductMatrix" or sheet_name == "Output_Loading Plan":
                    collection = db[sheet_name.lower()]
                    data = data.to_json(orient='records')
                    json_data ={'date':date, 'data':data}
                    insert_data = [{'date':date, 'data': add_data} for add_data in json.loads(json_data['data'])]
                    if sheet_name == "Input_FWW":
                        for item in insert_data:
                            time = (item['data']['BASIC START DATE/STO CREATED DATE'])
                            timestamp_seconds = time / 1000
                            dt = datetime.fromtimestamp(timestamp_seconds, tz=pytz.utc)
                            local_dt = dt.astimezone(pytz.timezone('Asia/Kolkata'))
                            formatted_date = local_dt.strftime('%d-%m-%Y')
                            item['data']['BASIC START DATE/STO CREATED DATE'] = formatted_date
                    
                    if sheet_name == "Input_ProductMatrix":
                        for item in insert_data:
                            boolean = (item['data']['DOUBLESIDED'])
                            item['data']['DOUBLESIDED'] = str(boolean)
                    
                    # if sheet_name == "Output_Loading Plan":
                    #     for item in insert_data:
                    #         time = (item['data']['STARTING TIME'])
                    #         hours = int(time*24)
                    #         minutes = int((time*24 - hours) * 60)
                    #         time_str = f'{hours:02d}:{minutes:02d}'
                    #         item['data']['STARTING TIME'] = time_str
                    
                    i = collection.insert_many(insert_data)
            sheet = ['Input_FWW', 'Input_ProductMatrix']
            sheet2 = ['Input_FWW', 'Input_ProductMatrix', 'Output_Loading Plan']
            set1 = set(count_sheet)
            set2 = set(sheet)
            set3 = set(sheet2)

            if set1 == set2 or set1 == set3:
                scheduling(date)
                return ({"success": "Data is added successfully!"})
            
            else:
                db = database.database_connection()
                order = db["input_fww"]
                query = {"date": date}
                d = order.delete_many(query)
                print(d.deleted_count)
                product = db["input_productmatrix"]
                d = product.delete_many(query)
                print(d.deleted_count)
                output = db["output_loading plan"]
                d = output.delete_many(query)
                print(d.deleted_count)
                schedule = db["schedule"]
                d = schedule.delete_many(query)
                print(d.deleted_count)

                return ({"error": "Input Data is in Incorrect Format!"})
            
        # else, return False
        else:
            return ({"error": "Data already existed!"})
            
    # Error handler
    except:
        return ({"warning": "Exception error!"})
    
# get data
def get_data(date):

    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]
        # Search an order with a date and return the one result
        # result_order = order.find({"date": data['date']})
        result_order = order.find({ "date": date })
        result_order = list(result_order)
        json_order_data = json.dumps(result_order, default = str)

        product = db["input_productmatrix"]
        # Search an order with a date and return the one result
        result_product = product.find({ "date": date })
        result_product = list(result_product)
        json_product_data = json.dumps(result_product, default=str)

        output = db["output_loading plan"]
        # Search an order with a date and return the one result
        result_output = output.find({ "date": date })
        result_output = list(result_output)
        json_output_data = json.dumps(result_output, default=str)

        schedule = db["schedule"]
        # Search an order with a date and return the one result
        result_schedule = schedule.find({ "date": date })
        result_schedule = list(result_schedule)
        json_schedule_data = json.dumps(result_schedule, default=str)
        return json_order_data, json_product_data, json_output_data, json_schedule_data

    # Error handler
    except:
        return ({"warning": "Exception error!"})

# Update data
def update_data(data, date):
    try:

        response = delete_data({"date":date})
        if response['success'] == "The data has been deleted successfully!":
            response = add_data(data, date)
            if response['success'] == "The data is added successfully!":
                response['success'] = "The data is updated successfully!"
                return response
            return ({"error": "Failed to update the data!"})
        return ({"error": "Failed to update the data!"})
    # Error handler
    except:
        return ({"warning": "Exception error!"})

# Delete data
def delete_data(date):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        order = db["input_fww"]
        query = {"date": date}
        d = order.delete_many(query)
        print(d.deleted_count)
        if d.deleted_count > 0:
            product = db["input_productmatrix"]
            d = product.delete_many(query)
            print(d.deleted_count)
            if d.deleted_count > 0:
                output = db["output_loading plan"]
                d = output.delete_many(query)
                print(d.deleted_count)
                if d.deleted_count > 0:
                    schedule = db["schedule"]
                    d = schedule.delete_many(query)
                    print(d.deleted_count)
                    if d.deleted_count > 0:
                        return ({"success": "The data has been deleted successfully!"})
                    
        return ({"error": "Failed to delete the data!"})
    
    # Error handler
    except:
        return ({"warning": "Exception error!"})


# ============ Scheduling ==============
# add data
def scheduling(date):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        input= db["input_fww"]
        
        # Search an order with a date and return the one result
        i = input.find_one({"date": date})
        if i:
            try:
                # Create database connection and connection object
                db = database.database_connection()
                order = db["input_fww"]
                # Search an order with a date and return the one result
                # result_order = order.find({"date": data['date']})
                result_order = order.find({ "date": date })
                result_order = list(result_order)
                json_order_data = json.dumps(result_order, default = str)

                product = db["input_productmatrix"]
                # Search an order with a date and return the one result
                result_product = product.find({ "date": date })
                result_product = list(result_product)
                json_product_data = json.dumps(result_product, default=str)
                machines, orders, order_df, product_df = to_text.to_text(json_order_data, json_product_data)
                handleMATLAB(date, machines, orders, order_df, product_df)

            # Error handler
            except:
                return ({"warning": "Exception error!"})
            
    # Error handler
    except:
        return ({"warning": "Exception error!"})

def handleMATLAB(date, machines, orders, order_df, product_df):
    try:
        subprocess.run(["matlab", "-nodisplay", "-nosplash", "-batch", "run('backend/MATLAB/SA-HH/sa-hh/Main_LatestLocal.m'); quit;"], check=True)
        handleResult(date, machines, orders, order_df, product_df)
    except subprocess.CalledProcessError as e:
        return ({"warning": "Exception error: {e}!"})

def handleResult(date, machines, orders, order_df, product_df):
    try:
        filename = 'backend/MATLAB/SA-HH/sa-hh/webapp/result.txt'
        delimiter = ';'
        data = pd.read_csv(filename, delimiter=delimiter)

        start_time = datetime.strptime(date + ' 08:00:00', '%Y-%m-%d %H:%M:%S')
        data['START'] = start_time 
        start_time -= timedelta(hours=8)
        data['START'] = data['StartTime'].apply(lambda x: start_time + timedelta(hours=x))
        data['START'] = data['START'].dt.floor('s')

        data['END'] = start_time 
        data['END'] = data['EndTime'].apply(lambda x: start_time + timedelta(hours=x))
        data['END'] = data['END'].dt.floor('s')

        data['LINE'] = data['Machine'].map({v: k for k, v in machines.items()})
        data['WORK ORDER'] = data['Number'].map({v: k for k, v in orders.items()})
        order_df = order_df.rename(columns={'data.WORK ORDER': 'WORK ORDER'})
        order_df = order_df.rename(columns={'data.PRODUCT': 'PRODUCT'})
        product_df = product_df.rename(columns={'data.PRODUCT': 'PRODUCT'})
        data = pd.merge(data, order_df, on='WORK ORDER')
        data = pd.merge(data, product_df, on='PRODUCT')
        data['UPH'] = 0
        for index, row in data.iterrows():
            line = row['LINE']
            uph = f'data.UPH {line}'
            data.at[index, 'UPH'] = row[uph]
        selected_columns = ['WORK ORDER', 'PRODUCT', 'LINE', 'UPH', 'START', 'END']
        data = data.filter(items=selected_columns)

        # Create database connection and connection object
        db = database.database_connection()
        input= db["schedule"]
        data = data.to_json(orient='records')
        json_data ={'date':date, 'data':data}
        insert_data = [{'date':date, 'data': add_data} for add_data in json.loads(json_data['data'])]

        for item in insert_data:
            time = (item['data']['START'])
            timestamp_seconds = time / 1000
            dt = datetime.fromtimestamp(timestamp_seconds)
            formatted_dt = dt.strftime('%Y-%m-%d %H:%M:%S')
            item['data']['START'] = formatted_dt

            time = (item['data']['END'])
            timestamp_seconds = time / 1000
            dt = datetime.fromtimestamp(timestamp_seconds)
            formatted_dt = dt.strftime('%Y-%m-%d %H:%M:%S')
            item['data']['END'] = formatted_dt
        
        i = input.insert_many(insert_data)

    except KeyError as e:
        return ({"warning": "Exception error: {e}!"})


# _________________________ REST API ___________________________

# Resource base class generated to route for one or more HTTP methods for a given URL
class api_emp(Resource):
    # Create a new employee
    def post(self):
        emp = request.get_json()
        return jsonify(employee.add_emp(emp, bcrypt))
    
    # Retrieve all employee
    def get(self):
        return jsonify(employee.get_all_emp())
    
    def put(self):
        emp = request.get_json()
        return jsonify(employee.update_emp(emp))
    
    def delete(self):
        emp = request.get_json()
        return jsonify(employee.delete_emp(emp))
    
class api_get_an_emp(Resource):
    def post(self):
        emp = request.get_json()
        return jsonify(employee.get_emp(emp))

class api_login(Resource):
    def post(self):
        emp = request.get_json()
        secret_key = app.config.get('SECRET_KEY')
        return jsonify(employee.login_emp(emp, bcrypt))

class api_data(Resource):
    def post(self):
        date = request.form.get('date')
        file = request.files['file']
        date_parts = date.split("/")
        day = date_parts[0]
        year = date_parts[2]
        month = date_parts[1]
        formatted_date = f"{year}-{month}-{day}"
        data = pd.read_excel(file, sheet_name=None)
        return jsonify(add_data(data, formatted_date))
    
    def get(self):
        date = request.args.get('date')
        return jsonify(get_data(date))
    
    def put(self):
        date = request.form.get('date')
        file = request.files['file']
        data = pd.read_excel(file, sheet_name=None)
        return jsonify(update_data(data, date))
    
    def delete(self):
        date = request.get_json()
        return jsonify(delete_data(date))
    
class api_date(Resource):
    def get(self):
        return jsonify(unique_date.get_data_date())

class api_dashboard_date(Resource):
    def get(self):
        return jsonify(unique_date.get_dashboard_date())

class api_table_data(Resource):
    def post(self):

        table = request.form.get('table')
        if table == 'default':            # Create database connection and connection object
            date = unique_date.get_latest_date()
            if date:
                return jsonify({"date": date[0]})
            else:
                return {}
        
        if table == 'input_fww':
            start = request.form.get('start')
            end = request.form.get('end')
            return jsonify(dashboard.get_order_data(table, start, end))
        
        if table == 'default_productmatrix':
            date = request.form.get('date')
            table = "input_productmatrix"
            return jsonify(dashboard.get_product_data(table, date))
        
        if table == 'input_productmatrix':
            date = request.form.get('date')
            date_ob = datetime.strptime(date,"%d/%m/%Y")
            formatted_date = date_ob.strftime('%Y-%m-%d')
            return jsonify(dashboard.get_product_data(table, formatted_date))
        
        if table == 'default_output':
            date = request.form.get('date')
            table = 'output_loading plan'
            return jsonify(dashboard.get_plan_data(table, date))
        
        if table == 'output_loading plan':
            date = request.form.get('date')
            date_ob = datetime.strptime(date,"%d/%m/%Y")
            formatted_date = date_ob.strftime('%Y-%m-%d')
            return jsonify(dashboard.get_plan_data(table, formatted_date))
        
class api_line_data(Resource):
    def get(self):
        return jsonify(dashboard.get_line_chart_data())
class api_scheduling(Resource):
    def post(self):
        table = request.form.get('table')
        if table == 'default_schedule':
            date = request.form.get('date')
            return jsonify(schedule.scheduling_chart(date))
        
        if table == 'schedule':
            date = request.form.get('date')
            print(date)
            date_ob = datetime.strptime(date,"%d/%m/%Y")
            formatted_date = date_ob.strftime('%Y-%m-%d')
            return jsonify(schedule.scheduling_chart(formatted_date))
    
class api_clustering(Resource):
    def post(self):
        try:
            data = request.data
            data = json.loads(data)
            features = data['features']
            scaled_df = data['scaled_df']
            scaled_df = pd.DataFrame(scaled_df)
            inertia, sil, scaled_feature = clustering.number_k(scaled_df, features)
            scaled_feature = scaled_feature.to_dict(orient='records')
            return jsonify(inertia, sil, scaled_feature )

        
        except KeyError as e:
            return ({"warning": "Exception error: {e}!"})

    def get(self):
        try:
            date = unique_date.get_unique_date()
            sorted_dates = sorted(date.keys(), reverse=True)
            latest_week = sorted_dates[:7]
            query = {"date": {"$in": latest_week}}

            if (latest_week != []):
                # Create database connection and connection object
                db = database.database_connection()
                order_db = db["input_fww"]
                product_db = db["input_productmatrix"]
                schedule_db = db["schedule"]

                # Execute the query
                result_order = order_db.find(query)
                result_product = product_db.find(query)
                result_schedule = schedule_db.find(query)

                df_order = pd.DataFrame(result_order)
                df_product = pd.DataFrame(result_product)
                df_schedule = pd.DataFrame(result_schedule)

                order_date = pd.DataFrame()
                product_date = pd.DataFrame()
                schedule_date = pd.DataFrame()

                order_date = df_order['date']
                product_date = df_product['date']
                schedule_date = df_schedule['date']
                
                df_order = pd.DataFrame(df_order['data'].tolist())
                df_product = pd.DataFrame(df_product['data'].tolist())
                df_schedule = pd.DataFrame(df_schedule['data'].tolist())

                df_order = pd.concat([order_date, df_order], axis=1)
                df_product = pd.concat([product_date, df_product], axis=1)
                df_schedule = pd.concat([schedule_date, df_schedule], axis=1)

                df = pd.DataFrame()
                df = pd.merge(df_order, df_product, on = ['date','PRODUCT'],how='left')
                df = pd.merge(df, df_schedule, on = ['date','WORK ORDER','PRODUCT'],how='left')
                df = df.sort_values("date", ascending=True)

                numerical, categorical, relevant_features, df_cleaned, scaled_df = clustering.clustering(df)
                df_cleaned = df_cleaned.to_dict(orient='records')
                scaled_df = scaled_df.to_dict(orient='records')
                return jsonify(numerical, categorical, relevant_features, df_cleaned, scaled_df)

            else:
                return jsonify({})
        
        except KeyError as e:
            return ({"warning": "Exception error: {e}!"})

class api_clustering_result(Resource):
    def post(self):
        try:
            data = request.data
            data = json.loads(data)
            df_cleaned = data['df_cleaned']
            scaled_df = data['scaled_df']
            scaled_feature = data['scaled_feature']
            k = int(data['k'])
            
            if scaled_feature == []:
                return jsonify([])
            else:
                df_cleaned = pd.DataFrame(df_cleaned)
                scaled_df = pd.DataFrame(scaled_df)
                scaled_feature = pd.DataFrame(scaled_feature)
                df_cleaned, scaled_df, clusters, clust_means = clustering.result(df_cleaned, scaled_df, scaled_feature, k)
                print(df_cleaned)
                df_cleaned = df_cleaned.to_dict(orient='records')
                scaled_df = scaled_df.to_dict(orient='records')
                clusters = clusters.to_dict(orient='records')
                clust_means = clust_means.to_dict(orient='records')
                return jsonify(df_cleaned, scaled_df, clusters, clust_means)
        
        except KeyError as e:
            return ({"warning": "Exception error: {e}!"})
    
    
    
# add_resource function registers the routes with the framework using the given endpoint
api.add_resource(api_emp, '/emp')                           # Employee
api.add_resource(api_get_an_emp,'/get_emp')                 # get an employee
api.add_resource(api_login, '/login')                       # login
api.add_resource(api_data, '/data')                         # Data 
api.add_resource(api_date, '/date')                         # Date
api.add_resource(api_dashboard_date, '/dashboard_date')     # Dashboard Date
api.add_resource(api_table_data, '/table_data')             # Table Data 
api.add_resource(api_line_data, '/line_data')               # Line Data 
api.add_resource(api_scheduling,'/scheduling')              # Scheduling
api.add_resource(api_clustering,'/clustering')              # Clustering
api.add_resource(api_clustering_result,'/clustering_result') # Clustering Result


if __name__ == '__main__':
    app.run(debug=True)