# Backend Setup Guide

This is the FastAPI backend for the BRICS Citizen Infrastructure Intelligence Platform.

## Prerequisites

- Python 3.10+
- MongoDB (running locally on port 27017 or update `.env` to point to MongoDB Atlas)

## Setup Instructions for Team Members

1. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`.
   - Update `MONGODB_URI` if you are not using localhost.
   - Add your `GEMINI_API_KEY` for AI features.

4. **Seed the Database**
   Run the seed script to populate your local MongoDB with the hackathon demo data (requests, projects, recommendations, and impact metrics):
   ```bash
   python seed.py
   ```

5. **Run the Server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`. You can access the interactive Swagger documentation at `http://localhost:8000/docs`.
