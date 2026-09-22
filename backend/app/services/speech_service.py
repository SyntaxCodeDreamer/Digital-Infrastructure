import logging
from fastapi import UploadFile

logger = logging.getLogger(__name__)

async def transcribe_audio(audio: UploadFile, language: str) -> dict:
    """
    Service to transcribe audio to text.
    For the MVP, this is a mock implementation that returns a fixed transcription.
    In production, integrate with Google Cloud Speech-to-Text or similar.
    """
    logger.info(f"Transcribing audio: {audio.filename} in language: {language}")
    
    # Mock behavior matching the original main.py implementation
    return {
        "transcript": "અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે, દર્દીઓ અને એમ્બ્યુલન્સ સમયસર હોસ્પિટલ પહોંચી શકતા નથી.",
        "detectedLanguage": language,
        "confidence": 0.96,
        "duration": "0:22"
    }
