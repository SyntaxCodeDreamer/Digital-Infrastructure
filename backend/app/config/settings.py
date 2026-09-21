from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BRICS Civic Intelligence API"
    environment: str = "development"
    
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "brics_civic_intelligence"
    
    gemini_api_key: str = ""
    
    cors_origins: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
