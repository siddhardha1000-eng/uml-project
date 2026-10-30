# Smart Agriculture Management System (SAMS)

A modern, professional, and responsive web application designed for real-world AgTech operations and college project review/viva demonstrations. SAMS enables farmers to monitor field conditions in real time, automate irrigation using IoT sensor thresholds, diagnose crop leaf diseases with computer vision, and receive AI-backed crop advisories.

---

## 🌟 Key Highlights & Presentation Features

- **🎓 Presentation-Ready Viva Controls**:
  - **1-Click Role Switcher** embedded directly in the top navigation bar to seamlessly jump between **Farmer**, **Agricultural Expert**, and **System Administrator** roles.
  - **"⚡ Test Dry Soil (<40%)" Interactive Simulation Button**: Instantly triggers the end-to-end IoT flow: *Moisture drops → Threshold exceeded → Warning banner appears → Critical alert logged → Smart pump automatically starts dispensing water!*
- **🌿 AgTech Aesthetic**: Built with deep emerald greens, mint accents, card-based layouts, and zero walls of text.
- **📊 Interactive Data Visualizations**: Historical 24h soil moisture & temperature area graphs, 7-day water consumption charts, NPK nutrient bar charts, and IoT gateway packet frequency charts.

---

## 🚀 Pages & Modules Overview

### 1. Landing Page (Public Portal)
- Project title: **Smart Agriculture Management System**
- Tagline: *"Smart technology for better farming decisions."*
- Hero section with key metrics (35% water conserved, 24/7 sensing, 96%+ AI accuracy).
- **Interactive IoT Data Pipeline**: `IoT Sensors` ➔ `Edge Gateway` ➔ `Threshold Analysis` ➔ `Trigger Irrigation` ➔ `Alert Farmer`.
- Core module highlight cards: Soil Monitoring, Smart Irrigation, Crop Recommendation, Disease Detection.
- Project team and college viva information.

### 2. Multi-Role Authentication
- Professional split-card login interface with role selection tabs:
  - 👨‍🌾 **Farmer**: `farmer@sams.agri`
  - 🔬 **Agricultural Expert**: `expert@sams.agri`
  - 🛡️ **Administrator**: `admin@sams.agri`
- 1-Click Fast Demo Login buttons with pre-filled credentials.
- "Remember Me" and interactive password reset dialog.

### 3. Farmer Dashboard
- **5 Overview Telemetry Cards**: Soil Moisture (with dynamic gauge), Ambient Temperature, Air Humidity, Weather Outlook, Irrigation Pump Status.
- **Urgent Threshold Alert Banner**: Dynamically highlights when soil moisture falls below required threshold with one-click pump override.
- **Historical Soil Readings Graph**: 24-hour interactive Recharts area graph with diurnal day/night curves.
- **Current Soil Health Matrix**: pH (6.8 Neutral), Nitrogen (N), Phosphorus (P), Potassium (K).
- **Hardware Telemetry Diagnostics**: Battery percentage, RSSI signal strength (-68 dBm), last sync ping.

### 4. Soil Monitoring & Strata Analytics
- **Multi-Depth Strata Breakdown**:
  - Topsoil (0–10 cm): Evaporative surface layer
  - Mid Strata (10–30 cm): Primary active root absorption zone
  - Deep Subsoil (30–60 cm): Water reserve layer
- **3 Tabbed Analytical Views**: Soil Moisture profile, Temperature trend, Spectroscopic NPK nutrient distribution vs. ideal benchmarks.

### 5. Smart Irrigation Section
- Current moisture vs. threshold comparator.
- **Interactive Setpoint Slider**: Adjust moisture threshold (20% to 60%).
- **Manual & Automatic Controls**: Start Irrigation, Stop Irrigation, and Auto-Mode toggle.
- **Animated Water Flow Visualizer**: Shows live pump pressure, discharge rate (28.5 L/min), and water pipe animation.
- **Weekly Water Consumption Chart**: Tracks liters saved vs. conventional flood irrigation.

### 6. Crop Recommendation Engine
- Input parameters: Soil type, Soil moisture, Temperature, Humidity, Season, Geographic zone, Irrigation capacity.
- **"⚡ Auto-fill from Live Sensors"** button for instant data loading.
- High-yield crop cards with match scores (%), growth duration, water requirements, suitable soil, and agronomic rationale.

### 7. Crop Disease Detection & Plant Pathology
- Image uploader supporting drag-and-drop.
- **4 Pre-loaded Test Samples for Viva Demo**:
  1. Tomato Early Blight (*Alternaria solani*)
  2. Rice Bacterial Leaf Blight (*Xanthomonas oryzae*)
  3. Apple / Grape Powdery Mildew (*Erysiphe necator*)
  4. Healthy Maize Leaf (Control sample)
- AI confidence percentage, pathogen name, identified symptoms, and recommended actions.
- Dual treatment cards: Chemical treatments vs. Organic/Biological remedies.
- **"Send to Agronomist"** button to escalate to the Expert Dashboard.

### 8. Weather & Micro-Climate Station
- Current temperature, humidity, rain probability, wind speed & direction.
- **5-Day Agricultural Forecast**: Daily high/lows, rain probabilities, and pesticide/fertilizer **Spray Feasibility Advisory** (Optimal / Moderate / Poor).
- Autonomous Rain Delay Protection banner.

### 9. Alerts & Notifications Center
- Categorized notifications: Critical, Warning, Information, Success.
- Filter by severity and by alert type (Moisture, Temperature, Disease, Weather, Irrigation).
- Direct action shortcuts ("Check Irrigation", "View Treatment", "Mark as Read").

### 10. Agricultural Expert Dashboard
- Profile: Dr. Sarah Chen, Ph.D., Senior Agronomist.
- **Farmer & Farm Directory**: Searchable list of registered farms, active crops, acreage, and soil status.
- **Disease Diagnostic Queue**: Review farmer-submitted leaf scans with AI preliminary diagnosis.
- **Prescription & Advisory Modal**: Form to write diagnostic notes and prescribe dosages, dispatching real-time alerts back to the farmer.

### 11. Administrator Dashboard
- **Executive Metrics**: Total Farmers (1,248), Total Farms (1,890), Total Sensors (4,520), Active Pumps (412), Disease Reports (624), System Alerts (8).
- **LoRaWAN Gateway Packet Frequency Chart**: Hourly packet distribution with 99.98% deliverability.
- **Hardware Fleet Distribution Pie Chart**: Online, Low Battery, Offline Maintenance.
- **IoT Sensor Node Management Table**: Hardware ID, farm owner, sensor type, live battery, and remote power toggles.

---

## 💻 Tech Stack

- **React 18** with **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** with custom agricultural color palette
- **Lucide React** icons
- **Recharts** for charts and telemetry graphs

---

## 🏃‍♂️ How to Run Locally

```bash
# Navigate to the project directory
cd smart-agriculture-system

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Or build and run production preview
npm run build
npm run preview -- --port 3000
```

Open your browser at `http://localhost:3000/`.
