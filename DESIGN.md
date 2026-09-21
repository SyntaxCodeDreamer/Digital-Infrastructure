# DESIGN — Product and UI Design System

## 1. Design Direction

The platform should feel like a modern public-sector intelligence platform:

- trustworthy
- accessible
- data-driven
- multilingual
- clean
- professional
- mobile-friendly

Avoid making it look like a generic chatbot.

## 2. Main Navigation

### Public

- Home
- Report a Need
- Track Request
- Projects
- About

### Government

- Dashboard
- Citizen Requests
- Demand Hotspots
- Infrastructure Gaps
- Project Insights
- Projects
- Impact
- Data Sources
- Settings

## 3. Home Page

Hero:

> Your Voice. Better Infrastructure.

Actions:

- Report a Need
- Explore Development Data

Supporting sections:
- How it works
- Supported languages
- Current development insights
- Transparency and privacy
- Impact examples

## 4. Request Form

Fields:

- Input method
- Language
- Voice recorder / text area
- Location
- Optional category
- Optional attachment

After submission show:

```text
Request Received
Request ID: REQ-XXXX

AI Processing
✓ Language detected
✓ Request understood
✓ Category identified
✓ Location processed
```

## 5. Government Dashboard

Top KPI cards:

- Total Requests
- Active Hotspots
- Infrastructure Gaps
- Projects
- Population Impacted

Main content:

1. Demand hotspot map.
2. Category distribution.
3. Infrastructure gap chart.
4. Geographic comparison.
5. AI project insights.
6. Recent citizen requests.

## 6. Map Design

Map markers/heatmap should represent aggregated demand, not expose sensitive individual citizen locations.

Legend:

- Low
- Medium
- High
- Critical

Clicking an area opens aggregated statistics.

## 7. Project Insight Card

```text
Project Insight

Rural Healthcare Connectivity

Location: District X

Citizen Requests     1,842
Affected Population  74,000
Infrastructure Gap   82%
Existing Investment  Low

Key Factors
- High citizen demand
- Low accessibility
- Large affected population

[Review Evidence]
[Open Project]
```

## 8. Accessibility

- WCAG-oriented contrast.
- Keyboard navigation.
- Screen-reader labels.
- Captions/transcripts for voice content.
- Text alternatives for charts.
- Responsive layouts.
- Language selector available on public pages.

## 9. Responsive Layout

Desktop:
- Sidebar + dashboard content.

Tablet:
- Collapsible sidebar.

Mobile:
- Bottom navigation or drawer.
- Stacked KPI cards.
- Map and charts optimized for touch.

## 10. Visual Components

Reusable components:

- StatCard
- DataTable
- HotspotMap
- ChartCard
- PriorityInsightCard
- RequestCard
- StatusBadge
- LanguageSelector
- AudioRecorder
- FilterBar
- EmptyState
- LoadingState
- ErrorState
