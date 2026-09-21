# ARCHITECTURE — BRICS Citizen Infrastructure Intelligence Platform

## 1. Selected Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Recharts
- Leaflet / OpenStreetMap

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn

### Database
- MongoDB
- MongoDB Atlas
- PyMongo or Motor

### AI / Data Processing
- Python AI services
- Google Gemini API
- Speech-to-Text service
- Translation service
- Python data-processing libraries

## 2. High-Level Architecture

```text
Citizens
   |
   +--> React Web App
   +--> Voice Input
   +--> Text Input
   +--> Messaging/Webhooks
   |
   v
FastAPI Backend
   |
   +--> Authentication
   +--> Request APIs
   +--> Voice/File APIs
   +--> Dashboard APIs
   +--> Project APIs
   |
   v
Python AI Services
   |
   +--> Speech-to-Text
   +--> Language Detection
   +--> Translation
   +--> Classification
   +--> Entity/Location Extraction
   +--> Summarization
   +--> Similarity/Deduplication
   |
   v
MongoDB
   |
   +--> Citizen Requests
   +--> AI Analysis
   +--> Demographics
   +--> Infrastructure
   +--> Investment Plans
   +--> Projects
   +--> Users
   +--> Audit Logs
   |
   v
Python Intelligence Layer
   |
   +--> Demand Hotspot Detection
   +--> Infrastructure Gap Analysis
   +--> Decision-Support Priority Model
   +--> Project Insights
   +--> Impact Measurement
   |
   v
React Government Dashboard
```

## 3. Frontend Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ReportRequest.jsx
│   │   ├── TrackRequest.jsx
│   │   └── government/
│   │       ├── Dashboard.jsx
│   │       ├── Requests.jsx
│   │       ├── Hotspots.jsx
│   │       ├── Infrastructure.jsx
│   │       ├── Recommendations.jsx
│   │       ├── Projects.jsx
│   │       └── Impact.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 4. FastAPI Backend Structure

```text
backend/
├── app/
│   ├── main.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   └── database.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── citizen_request.py
│   │   ├── project.py
│   │   ├── infrastructure.py
│   │   ├── demographic.py
│   │   └── investment.py
│   │
│   ├── schemas/
│   │   ├── user.py
│   │   ├── request.py
│   │   ├── project.py
│   │   └── dashboard.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── requests.py
│   │   ├── ai.py
│   │   ├── dashboard.py
│   │   ├── projects.py
│   │   └── datasets.py
│   │
│   ├── services/
│   │   ├── gemini_service.py
│   │   ├── speech_service.py
│   │   ├── translation_service.py
│   │   ├── classification_service.py
│   │   ├── priority_service.py
│   │   ├── hotspot_service.py
│   │   └── impact_service.py
│   │
│   ├── middleware/
│   │   ├── auth.py
│   │   └── error_handler.py
│   │
│   └── utils/
│
├── requirements.txt
└── .env.example
```

## 5. MongoDB Collections

```text
users
citizen_requests
ai_analysis
locations
demographics
infrastructure
investment_plans
projects
impact_metrics
notifications
audit_logs
```

## 6. API Flow

```text
React
  |
  | HTTP / JSON
  v
FastAPI
  |
  +--> Validate with Pydantic
  |
  +--> Store request in MongoDB
  |
  +--> Call Python AI service
  |
  +--> Store AI analysis
  |
  +--> Update analytics
  |
  v
React Dashboard
```

## 7. Example API Endpoints

```text
POST   /api/auth/login

POST   /api/requests
GET    /api/requests
GET    /api/requests/{request_id}

POST   /api/requests/{request_id}/analyze

POST   /api/voice/transcribe

GET    /api/dashboard/summary
GET    /api/dashboard/hotspots
GET    /api/dashboard/infrastructure-gaps

GET    /api/recommendations
GET    /api/projects
POST   /api/projects

GET    /api/impact/{project_id}
```

## 8. AI Processing Flow

```text
Citizen Request
      |
      v
FastAPI
      |
      v
Python AI Service
      |
      +--> Detect Language
      +--> Translate
      +--> Classify
      +--> Extract Location
      +--> Detect Similar Requests
      +--> Summarize
      |
      v
MongoDB
      |
      v
Analytics / Intelligence
      |
      v
React Dashboard
```

## 9. Scalability

For the hackathon MVP:
- FastAPI REST APIs.
- MongoDB Atlas.
- Background tasks for non-critical AI processing.
- Indexed MongoDB fields.
- Paginated APIs.

For production:
- Redis for caching/queues.
- Celery or another worker system.
- Object storage for audio.
- API rate limiting.
- Batch data ingestion.
- Monitoring and logging.
- Horizontal scaling of FastAPI services.

## 10. Security

- JWT or Firebase authentication.
- Role-based authorization.
- Pydantic input validation.
- CORS configuration.
- Rate limiting.
- Environment variables for secrets.
- Never expose AI/database credentials in React.
- Audit logs for administrative actions.
