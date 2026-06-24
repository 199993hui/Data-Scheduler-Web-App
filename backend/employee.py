from flask import session
from pymongo import ASCENDING
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, decode_token

import database as database
import to_text as to_text


# Add employee into the database
def add_emp(emp, bcrypt):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        # Search an employee with a ID and return the one result
        i = employee.find_one({"employeeID": emp['employeeID']})

        # If the ID is not exist, execute command to insert the employee information into the database
        if not i:
            hashed_password = bcrypt.generate_password_hash(emp["password"])
            emp["password"] = hashed_password
            emp["role"] = "Employee"
            db['employee'].insert_one(emp)
        else:
            return ({"error": "Employee already exists."})
    except:
        return ({"warning": "Exception error!"})
    
    return ({"success": "The employee is added successfully"})

def get_all_emp():

    employees=[]

    try:
        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        
        # Search all employee and return the one result
        sort = [("employeeID", 1)]
        result = employee.find().sort(sort)

        if result:
            users = [user for user in result]
            emps = list(filter(lambda x : x['role'] != 'Root',users))

            for i in emps:
                emp={}
                emp["employeeID"] = i["employeeID"]
                emp["name"] = i["name"]
                emp["role"] = i["role"]
                employees.append(emp)
        else:
            return ({"info":"No employee found."})
            
    # Error handler
    except:
        return ({"warning": "Exception error!"})
    
    return employees
    
# Retrieve one employee
def get_emp(emp):
    try:
        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        
        # Search an employee with a ID and return the one result
        i = employee.find_one({"employeeID": emp['employeeID']})

        if i:
            return {
            "employeeID":i['employeeID'],
            "name": i['name'],
            "role" : i["role"]
        }
        else:
            return ({"error":"The employee does not exist!"})
            
    # Error handler
    except:
        return ({"warning": "Exception error!"})

# Update data
def update_emp(emp):
    try:

        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        
        # Search an employee with a ID and return the one result
        filter_query = employee.find_one({"employeeID": emp['employeeID']})
        
        if filter_query:
            update_query = {"$set": {"name": emp['name'], "role":emp['role']}}

            # Update the document in the 'users' collection
            result = employee.update_one(filter_query, update_query)

            i = employee.find_one({"employeeID": emp['employeeID']})
            
            if i:
                identity = {
                'employeeID': i['employeeID'],
                'name': i['name'],
                'role': i['role']
                }

                access_token = create_access_token(identity=identity)

        if result.modified_count > 0:
            return ({"success": "The employee profile is updated successfully", "token":access_token})
        else:
            return ({"error": "Failed to update the employee profile!"})
    
    # Error handler
    except:
        # Return the updated employee data
        return ({"warning": "Exception error!"})
    
# Update data
def delete_emp(emp):
    try:

        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        
        # Search an employee with a ID and return the one result
        filter_query = employee.find_one({"employeeID": emp})
        
        if filter_query:
            result = employee.delete_one(filter_query)

        if result.deleted_count > 0:
            return ({"success": "The employee profile is deleted successfully"})
        else:
            return ({"error": "Failed to delete the employee"})
    
    # Error handler
    except:
        # Return the updated order data
        return ({"warning": "Exception error!"})
      
# Employee login Checking using username and password
def login_emp(emp_login, bcrypt):

    try:
        # Create database connection and connection object
        db = database.database_connection()
        employee = db["employee"]
        
        # Search an employee with a ID and return the one result
        i = employee.find_one({"employeeID": emp_login['employeeID']})
        
        if i and bcrypt.check_password_hash(i['password'], emp_login['password']):
            identity = {
                'employeeID': i['employeeID'],
                'name': i['name'],
                'role': i['role']
            }
            name = i['name']
            access_token = create_access_token(identity=identity)
            return {"success":f"Welcome back, {name}!",
            "token": access_token
            }
        else:
            return ({"error":"Login Failed!"})
            
    # Error handler
    except KeyError:
        return {"error": "Invalid key in emp_login"}
    except TypeError:
        return {"error": "Invalid data type in emp_login"}
    except Exception as e:
        return {"error": str(e)}