from dotenv import load_dotenv
import os

load_dotenv()

class ApplicationConfig:
    JSONIFY_MIMETYPE = 'application/json'
    SECRET_KEY= os.environ['SECRET_KEY']
    JWT_SECRET_KEY = 'sdjsdafa'
