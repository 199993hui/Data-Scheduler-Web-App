from pymongo import MongoClient

# _________________________ MongoDB Database ___________________________
# Create database connection to 'database.db'
def database_connection():

    # Establish database connection
    connection = "mongodb+srv://hui199993:990903Hui@cluster0.zrrg3z1.mongodb.net/test"
    client = MongoClient(connection)
    db = client['test']
    return db
