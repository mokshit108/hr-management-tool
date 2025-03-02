import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    # Application settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    ENV = os.getenv('FLASK_ENV', 'development')  # Explicitly set ENV
    DEBUG = os.getenv('DEBUG', 'True').lower() in ('true', '1', 't')

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///hr_management.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS settings
    CORS_HEADERS = 'Content-Type'
