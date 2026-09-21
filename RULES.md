# Rules — Development and AI Rules

## 1. General Development Rules

1. Use TypeScript for frontend and backend application code.
2. Keep components modular.
3. Avoid duplicated business logic.
4. Use environment variables for secrets.
5. Never commit API keys, credentials, service-account files, or private certificates.
6. Validate all API inputs.
7. Return consistent API error responses.
8. Add loading, empty, and error states to UI screens.
9. Use accessible labels and keyboard-friendly controls.
10. Keep naming descriptive and consistent.

## 2. AI Rules

1. AI output is decision support, not an automatic government decision.
2. Store AI confidence where available.
3. Keep original citizen text separate from AI-normalized text.
4. Do not silently change the original citizen request.
5. Clearly identify generated summaries and recommendations.
6. Provide supporting factors behind project insights.
7. Do not fabricate demographic, infrastructure, investment, or project data.
8. Distinguish verified datasets from estimates.
9. Handle uncertain locations explicitly.
10. Allow human review for consequential recommendations.

## 3. Multilingual Rules

- Preserve original language.
- Store language code.
- Store translation separately.
- Do not overwrite original text.
- Test translated classifications with representative examples.
- Support Unicode throughout the application.

## 4. Data Rules

Required fields should be validated at the API boundary.

Example request:

```json
{
  "originalText": "Citizen's original request",
  "language": "gu",
  "inputType": "voice",
  "location": {
    "country": "IN",
    "state": "Gujarat",
    "district": "Example"
  }
}
```

## 5. Git Rules

Use:

```text
feat: add request submission
fix: correct hotspot aggregation
docs: update architecture
refactor: extract AI service
test: add request validation tests
chore: update dependencies
```

Never commit:
- `.env`
- credentials
- private keys
- access tokens
- large generated datasets

## 6. UI Rules

- Responsive design.
- Clear information hierarchy.
- Government dashboard must prioritize data readability.
- Use color plus text/icons for status, not color alone.
- Maps must include a legend.
- Charts must have labels and meaningful units.
