import google.generativeai as genai
from app.config.settings import settings
import json
import logging

logger = logging.getLogger(__name__)

# Configure the Gemini API client
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)
    # Using the new model name
    model = genai.GenerativeModel('gemini-1.5-pro')
else:
    logger.warning("GEMINI_API_KEY is not set. AI classification will use mock data.")
    model = None

async def analyze_citizen_request(text: str, language: str) -> dict:
    """
    Analyzes a citizen request using Gemini.
    Translates to English, determines category and urgency.
    """
    if not model:
        # Fallback to mock logic if no API key is provided
        is_gu_critical = language == "gu" and ("તારાપુર" in text or "આરોગ્ય" in text)
        return {
            "translatedText": "The road from our Tarapur village to the Community Health Centre is broken since the monsoon, patients and ambulances cannot reach the hospital in time." if is_gu_critical else text,
            "category": "healthcare",
            "urgency": "Critical" if "આરોગ્ય" in text or "emergency" in text.lower() else "High",
            "confidenceScore": 0.95
        }

    prompt = f"""
    You are an AI assistant for a civic intelligence platform.
    Analyze the following citizen request written in {language}.
    Provide a JSON response with exactly these fields:
    - "translatedText": The request translated to English.
    - "category": Categorize the request into one of: 'healthcare', 'roads', 'water', 'electricity', 'digital', 'safety', 'environment'.
    - "urgency": Rate the urgency as 'Low', 'Medium', 'High', or 'Critical'.
    - "confidenceScore": A float between 0.0 and 1.0 indicating your confidence in this analysis.
    
    Citizen Request: "{text}"
    """
    
    try:
        response = model.generate_content(prompt)
        # Parse the JSON response
        # Sometimes the model wraps it in ```json ... ```
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        result = json.loads(response_text)
        return {
            "translatedText": result.get("translatedText", text),
            "category": result.get("category", "healthcare").lower(),
            "urgency": result.get("urgency", "Medium"),
            "confidenceScore": result.get("confidenceScore", 0.85)
        }
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        # Fallback in case of error
        return {
            "translatedText": text,
            "category": "healthcare",
            "urgency": "High",
            "confidenceScore": 0.5
        }
