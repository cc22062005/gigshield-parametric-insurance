# GigShield AI

> **AI-Powered Parametric Insurance for India's Gig Delivery Partners**

GigShield is a parametric, weather/disruption-based insurance platform designed exclusively for food and grocery delivery riders (Zomato/Swiggy/Zepto/Blinkit). It protects them against income loss caused by external factors out of their control, such as heavy rain, severe pollution, local curfews, or strikes.

## ⚠️ Problem Overview

Delivery riders operate on razor-thin margins and face severe risks of daily wage loss.

| Risk Category | Impact on Rider | Frequency |
| --- | --- | --- |
| **Severe Weather** | Waterlogged roads, higher accident risk, low demand | High (Monsoon) |
| **Air Pollution** | Health hazards (AQI > 400 in NCR) | High (Winters) |
| **Civic Disruptions** | Local curfews, internet shutdowns preventing orders | Medium |

### Target Persona
- **Name**: Raj
- **Occupation**: Full-time Zomato/Swiggy Rider in Bangalore
- **Monthly Income**: ₹15k - ₹20k
- **Pain Point**: "When it rains heavily, I can't deliver. I lose that day's wages, but my bike EMI and fuel costs remain the same."

## 🚀 Solution Overview

GigShield provides **Parametric Insurance** - insurance that pays out automatically when a predefined event (parameter) is met, bypassing traditional claims adjusters and lengthy approval times.

| Platform | Benefit |
| --- | --- |
| **Data-Driven Triggers** | Uses OpenWeatherMap, IMD, CPCB, and News APIs to track local disruptions. |
| **Instant Payouts** | Smart contracts/rule-engine processes immediate micro-payments. |
| **Flexible Coverage** | Bite-sized weekly policies instead of rigid annual plans. |

### Key Features
- Dynamic Weekly Premium generation.
- Real-time weather/disruption tracking.
- Instant Automated Claims processing.
- AI Risk Scoring & Fraud Defense.

## 📊 Parametric Insurance Model

| Trigger Event | Data Source (Phase-1) | Payout Condition |
| --- | --- | --- |
| **Heavy Rainfall** | OpenWeatherMap API | > 15mm continuous rain for 3 hours in rider's zone. |
| **Severe AQI** | CPCB / OpenWeather API | AQI > 400 for 2 consecutive days. |
| **Local Curfew** | NewsAPI / Govt RSS | Official Sec 144 / Internet shutdown reported. |

### Weekly Premium Model (Example pricing)
Weekly policies matching the gig-worker payout cycle.
- **₹39 (Basic)**: Payout up to ₹250/day. Covers Rain only.
- **₹69 (Standard)**: Payout up to ₹500/day. Rain + AQI.
- **₹99 (Pro)**: Payout up to ₹750/day. Comprehensive (Rain, AQI, Curfews).

## 🧠 AI/ML Integration

| Component | Functionality (Mock in Phase-1) | ML Approach |
| --- | --- | --- |
| **Risk Profiling** | Scores rider risk based on historical zone data and season. | Gradient Boosting Regressor (simulated) |
| **Dynamic Pricing** | Adjusts weekly policy cost based on upcoming weather forecasts. | Time-series forecasting |

## 🛡️ Fraud Detection & Adversarial Defense

Protecting the platform against bad actors faking claims.

1. **GPS Spoofing Defense**: Device signals (mock location enabled flags), checking against network cell towers.
2. **Behavioral Checks**: Improbable travel speeds (e.g., claiming to move from Delhi to Mumbai in 5 mins).
3. **Graph Anomalies**: Sybil attack prevention (multiple identical claim triggers from the exact same lat/long polygon).

*In Phase-1 demo, you can toggle a "GPS Spoofing" mode to witness the system automatically reject a fraudulent claim.*

## ⚙️ Tech Stack & Architecture

| Layer | Technologies |
| --- | --- |
| **Frontend** | React (TypeScript), Tailwind CSS, Vite, Recharts, React-Leaflet |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Caching** | Redis (Mock event state) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Infrastructure** | Docker, Vercel (UI), Render (API) |

### System Workflow
1. Rider Registers -> AI generates Risk Profile.
2. Rider buys Weekly Policy -> DB creates coverage active status.
3. System (Cron jobs) polls data APIs (Weather/News) for rider's zones.
4. Threshold exceeded -> Trigger Claim.
5. Fraud Check applied -> If valid, Payout processed to Wallet.

## 🛣️ Implementation Roadmap & Setup

### Requirements
- Node.js 18+
- Docker & docker-compose

### Getting Started

1. Clone repo & start Database
```bash
docker-compose up -d
```

2. Start Backend
```bash
cd backend
npm install
npm run dev
```

3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

---
**Designed for Phase-1 Hackathon Excellence!**
By RiskOps
