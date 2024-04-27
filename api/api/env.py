from dotenv import load_dotenv
import os

load_dotenv()

isProduction = os.getenv('ENV', 'development') == 'production'

ENVARS = {
    'IS_PRODUCTION': isProduction,
    'SECRET_KEY': os.getenv('SECRET_KEY'),
    'DB_NAME': os.getenv('DB_NAME'),
    'DB_USER': os.getenv('DB_USER', 'postgres'),
    'DB_PASSWORD': os.getenv('DB_PASSWORD'),
    'DB_HOST': os.getenv('DB_HOST'),
    'DB_PORT': os.getenv('DB_PORT', '5432'),
}

for key, value in ENVARS.items():
    if value is None:
        raise ValueError(f"Environment variable {key} is not set")
