# WasteTerminal OS - System Architecture, UI Component Specification & API Integration Guide

## 1. Executive Summary & System Overview

**WasteTerminal OS** is an intelligent, high-throughput commercial kitchen operating system designed for fast-casual and quick-service restaurant (QSR) chains (such as *Crunchies Fried Chicken* in Nigerian urban commercial hubs like Onitsha Main Market).

The system combats post-preparation and operational food waste through:
1. **High-Speed Terminal Logging**: Ultra-fast, touch-friendly weighing and logging interface for kitchen line operators and stewards.
2. **AI-Driven Forecasting & Staggered Prep Batches**: Dual-model ensemble (Amazon Chronos-Bolt + Google TimesFM) predicting portion demand and prescribing staggered batching (e.g., 65% initial prep, 35% on-demand) when model divergence exceeds 8%.
3. **FEFO Inventory & Cold-Chain Monitoring**: Tracking ingredient batch expiration dates and generator runtime during grid power outages to avert spoilage.
4. **Actionable Financial Analytics & Menu Matrix**: Real-time financial loss tracking in Nigerian Naira (₦), menu engineering matrix classifications (*Star, Plowhorse, Puzzle, Dog*), and pilot quasi-experimental KPI benchmarking.

---

## 2. API Backend Architecture & Domain Rundown

### 2.1 Backend Specifications
- **Base URL**: `https://ai-smart-food-waste-managemet-systeme.onrender.com/api/v1`
- **Interactive Swagger Docs**: `https://ai-smart-food-waste-managemet-systeme.onrender.com/api/docs/`
- **OpenAPI 3.0 Schema**: `https://ai-smart-food-waste-managemet-systeme.onrender.com/api/schema/?format=json`
- **Framework**: Django REST Framework (DRF) with drf-spectacular.
- **Authentication**: DRF Token Authentication.
  - HTTP Header: `Authorization: Token <user_auth_token>`

---

### 2.2 The 9 Core API Domains

| Domain | Base Path | Core Purpose |
| :--- | :--- | :--- |
| **1. Auth & Accounts** | `/auth/` | Operator authentication, registration, token issuance, user profiles, and role management. |
| **2. Organization** | `/organization/` | Restaurant chain and physical branch hierarchy management. |
| **3. Menu & Recipes** | `/menu/` | Menu items, ingredient definitions, and Bill of Materials (BOM) portion shrinkage rules. |
| **4. Inventory** | `/inventory/` | FEFO batch tracking, 3-day expiry alerts, and generator/power outage operational logs. |
| **5. Waste Tracking** | `/waste/` | Real-time scale waste capture, daily summary aggregations, and historical audit logs. |
| **6. Local Calendar** | `/calendar/` | Contextual market intelligence (Igbo 4-day market cycle: *Eke, Oye, Afor, Nkwo*), weather, and payday windows. |
| **7. Sales Records** | `/sales/` | Ingestion of Point of Sale (POS) transaction records and bulk transaction uploads. |
| **8. AI Forecasting** | `/forecast/` | Ensemble prediction runs, kitchen prep sheets, BOM raw ingredient targets, and variance reconciliation. |
| **9. Analytics** | `/analytics/` | Menu engineering quadrant analysis, pilot branch quasi-experiment KPI evaluation. |

---

## 3. UI System & Aesthetic Design Guidelines

The UI follows the clean, professional, industrial kitchen terminal design exhibited in the prototype:

### 3.1 Design Tokens
- **Background**: Soft clean background `#FAFAF7` (Stone 50) with white surface cards (`#FFFFFF`).
- **Accent Primary**: Emerald Green (`#059669` / `bg-emerald-600`, active states: `bg-emerald-700`, subtle tints: `bg-emerald-50`, text: `text-emerald-700`).
- **Neutrals**: Stone palette (`text-stone-900`, `text-stone-700`, `text-stone-500`, `border-stone-200/60`).
- **Alert / Warning**: Amber (`text-amber-700`, `bg-amber-50`).
- **Typography**:
  - Primary UI: `font-sans` (`Inter`, sans-serif)
  - Data / Metrics / Monetary: `font-mono` (`JetBrains Mono`, monospace)
- **Icons**: Google Material Symbols Outlined (`font-variation-settings: 'FILL' 0, 'wght' 400`).

### 3.2 Responsive Navigation & Layout
- **Sticky Top Bar**: Brand badge with live connectivity dot, horizontal navigation links with subtle background pill highlights, Quick `+ Log Waste` CTA button, operator identity badge.
- **Context Row**: Hardware unit identifier (`WT-ON-992`), branch name, live signals pills (e.g. *Afor Market Day*, *Payday Window*, *Gen: 02h 45m*).
- **Tabbed Views**:
  1. `Terminal` (Station view for fast logging with weight scale)
  2. `Forecast` (Prep sheet, rush timeline, AI ensemble metrics)
  3. `Ingredients` (FEFO stock inventory, delivery ETA, cold chain)
  4. `Recipes` (Accordion recipe cards, BOM ingredient quantities, portion yields)
  5. `Logs` (Audit table with stage badge, root causes, export)
  6. `Analytics` (KPI metrics, stage breakdown, 7-day trend, top waste items)
  7. `Settings` (Station details, operator shifts, loss thresholds, API connectivity)

---

## 4. React Component Specification

We organize the React application following a structured, scalable Atomic/Modular architecture:

```
src/
├── api/                  # Axios / Fetch client, API definitions, TypeScript types
│   ├── client.ts         # Base client with token interceptor and offline handling
│   ├── types.ts          # OpenAPI generated/derived TypeScript interfaces
│   ├── auth.ts           # Login, profile, me endpoints
│   ├── waste.ts          # Logging, logs table, daily summary
│   ├── forecast.ts       # Runs, prep-sheet, prep-targets, trigger
│   ├── inventory.ts      # Batches, expiring-soon, outages
│   ├── menu.ts           # Menu items, ingredients, BOM
│   ├── calendar.ts       # Today context, market days
│   └── analytics.ts      # Pilot comparison, menu matrix
├── components/
│   ├── common/           # Atoms & base molecules
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Icon.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Modal.tsx
│   │   └── SearchInput.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── ContextRow.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── terminal/         # Log Waste Terminal
│   │   ├── StageSelector.tsx
│   │   ├── MenuItemTile.tsx
│   │   ├── ScaleDisplay.tsx
│   │   ├── RootCauseSelector.tsx
│   │   ├── LossCalculator.tsx
│   │   └── AiGuidanceBanner.tsx
│   ├── forecast/         # AI Prep Sheet & Demand
│   │   ├── ContextSignalCards.tsx
│   │   ├── PrepSheetTable.tsx
│   │   ├── RushTimeline.tsx
│   │   └── ModelAgreementBar.tsx
│   ├── inventory/        # Stock & FEFO
│   │   ├── StockKpiGrid.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── DeliveriesTracker.tsx
│   │   └── OutageLoggerModal.tsx
│   ├── recipes/          # Recipe Directory & BOM
│   │   ├── RecipeCard.tsx
│   │   ├── BomIngredientList.tsx
│   │   └── RecipeMethodList.tsx
│   ├── logs/             # Waste Logs & Filters
│   │   ├── WasteLogsTable.tsx
│   │   ├── LogsFilterBar.tsx
│   │   └── PaginationControls.tsx
│   ├── analytics/        # Waste Analytics & Reports
│   │   ├── WasteKpiRow.tsx
│   │   ├── StageBreakdownChart.tsx
│   │   ├── WeeklyTrendChart.tsx
│   │   ├── TopWastedList.tsx
│   │   └── MenuMatrixView.tsx
│   └── settings/         # Terminal Configuration
│       ├── StationDetailsCard.tsx
│       ├── OperatorListCard.tsx
│       ├── ThresholdConfigCard.tsx
│       └── ApiEndpointsCard.tsx
├── context/
│   ├── AuthContext.tsx    # Current user, token, station branch
│   ├── TerminalContext.tsx# Scale weight, tare, active item/stage
│   └── OfflineContext.tsx # Queued logs for offline network resilience
├── hooks/
│   ├── useScaleInput.ts   # Simulated or Web Serial digital scale listener
│   ├── useWasteLogs.ts    # Fetch logs with filter/page params
│   ├── usePrepSheet.ts    # Kitchen prep targets and actual variance
│   └── useLiveSignals.ts  # Weather, market days, and outage runtime
└── App.tsx
```

---

### 4.1 Detailed Component Breakdown

#### `Terminal` Components
1. **`ScaleDisplay`**
   - **Props**: `weight: number`, `onAdjust: (delta: number) => void`, `onTare: () => void`, `unit?: string`
   - **State**: Supports digital scale smoothing, manual incremental nudges (`-0.1`, `+0.1`, `+0.5`, `+1.0`), and zero-tare.
   - **Styling**: Giant LCD font-mono text (`text-5xl font-semibold tracking-tight text-stone-900`).
2. **`StageSelector`**
   - **Props**: `selectedStage: OperationalStageEnum`, `onSelect: (stage: OperationalStageEnum) => void`
   - **Values**: `preparation`, `storage_spoilage`, `overproduction_buffet`, `plate_waste`.
3. **`MenuItemTile`**
   - **Props**: `item: MenuItem`, `isSelected: boolean`, `unitCostNaira: number`, `onSelect: () => void`
   - **Display**: Icon/emoji, dish name, cost per kg (`₦2,800/kg`).
4. **`RootCauseSelector`**
   - **Props**: `selectedCause: RootCauseDeterminantEnum`, `onSelect: (cause: RootCauseDeterminantEnum) => void`
   - **Values**: `overproduced_unsold`, `overcooked_burnt`, `expired_in_store`, `power_outage_spoilage`, `customer_leftover`, `trimming_excess`, `other`.
5. **`LossCalculator`**
   - **Props**: `weightKg: number`, `unitCostPerKg: number`
   - **Calculation**: Computes `loss = Math.round(weightKg * unitCostPerKg)`. Formatted as `₦{loss.toLocaleString()}`.

#### `Forecast` Components
1. **`PrepSheetTable`**
   - **Props**: `items: DailyForecastItem[]`, `targets: KitchenPrepTarget[]`, `onUpdateActualUsed?: (id: string, qty: number) => void`
   - **Columns**: Dish name, AI Forecast (portions), Stage 1 (Initial / Morning prep portion & %), Stage 2 (On-demand hold portion & %), Strategy badge (`Two Staggered Batches` vs `Single Bulk Batch`), Model Confidence bar (`88%`).
2. **`RushTimeline`**
   - **Props**: `windows: RushWindow[]`
   - **Cards**: Lunch Rush (12:00 PM - 2:30 PM), Afternoon Lull (2:30 PM - 5:00 PM), Evening Rush (5:30 PM - 8:00 PM) with operational directives (e.g. *Start Jollof Stage 2 at 12:15 PM*).
3. **`ContextSignalCards`**
   - **Props**: `signals: { marketDay: string; paydayWindow: boolean; weather: string; generatorHours: number }`
   - **Badges**: Traditional market day uplift (+35% foot traffic), Payday (+22% spend uplift), Weather (32°C / Humid: beverage ↑, hot meals ↓), Standby generator runtime.

#### `Ingredients` Components
1. **`InventoryTable`**
   - **Props**: `batches: InventoryBatchList[]`, `search: string`, `filterCategory: string`
   - **Columns**: Ingredient name & icon, Category, In Stock, Daily Need, Unit Cost, Expiry Status (FEFO warning: *Low · 1.2 days* vs *Good · 3 days*), Supplier.
2. **`StockKpiGrid`**
   - Total Ingredients, Low Stock Alerts (FEFO < 3 days), Incoming Deliveries in transit.
3. **`OutageLoggerModal`**
   - Modal to log power cuts and generator activations (`POST /api/v1/inventory/outages/`).

#### `Recipes` Components
1. **`RecipeCard`**
   - **Props**: `recipe: MenuItemWithBOM`, `isExpanded: boolean`, `onToggle: () => void`
   - **Header**: Icon, dish name, standard BOM cost/kg, cost per portion, expand chevron.
   - **Detail Accordion**:
     - Raw ingredients breakdown per 10 portions (`RecipeBOM`: quantity, yield shrinkage %).
     - Cooking procedure method steps (1 to 6).
     - Batch metrics: Prep time, Cook time, Yield kg, Total BOM cost.

#### `WasteLogs` Components
1. **`WasteLogsTable`**
   - **Props**: `logs: WasteLog[]`, `page: number`, `totalPages: number`, `onPageChange: (p: number) => void`
   - **Columns**: Time (WAT), Item, Stage badge, Weight (kg), Loss (₦), Root Cause, Operator.
   - **Features**: Pagination, stage filtering, CSV export.

#### `Analytics` Components
1. **`WasteKpiRow`**
   - Total Waste (kg), Financial Loss (₦), Shift Ceiling (₦45,000 threshold status), Average Cost per kg.
2. **`StageBreakdownChart`**
   - Bar distributions across *Overproduction*, *Preparation*, *Storage/Spoilage*, *Plate Waste*.
3. **`WeeklyTrendChart`**
   - 7-Day bar graph tracking waste reduction progress.
4. **`MenuMatrixView`**
   - Four-quadrant engineering matrix: *Stars* (High profit, low waste), *Plowhorses*, *Puzzles*, *Dogs*.

---

## 5. Comprehensive API Consumption Guide

### 5.1 Authentication Flow

#### 1. Operator Login
- **Endpoint**: `POST /api/v1/auth/login/`
- **Request Body**:
```json
{
  "username": "cook_nwosu",
  "password": "SecurePassword123!"
}
```
- **Response (200 OK)**:
```json
{
  "token": "c8d96df40a4ff77c650772bb2d76cfd661fb8db6",
  "user_id": 2,
  "username": "cook_nwosu",
  "email": "c.nwosu@crunchies.ng",
  "profile": {
    "id": "0b6271f3-92ad-4ae4-b97b-fd1cba128701",
    "full_name": "C. Nwosu",
    "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
    "branch_name": "Onitsha Main Market",
    "chain_name": "Crunchies Fried Chicken",
    "role": "kitchen_cook",
    "role_display": "Kitchen Cook"
  }
}
```
- **React Storage Strategy**:
  Store `token` and `profile` in `localStorage` or `sessionStorage`. Pass token in the `Authorization: Token <token>` header for all subsequent calls.

---

### 5.2 Waste Logging & Monitoring Endpoints

#### 1. Record Scale Waste Entry
- **Endpoint**: `POST /api/v1/waste/` (or `POST /api/v1/waste/logs/`)
- **Headers**: `Authorization: Token <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "logged_by": "0b6271f3-92ad-4ae4-b97b-fd1cba128701",
  "operational_stage": "overproduction_buffet",
  "menu_item": "72df546b-05a8-4bb9-92dc-e300cf9d7ecb",
  "ingredient": null,
  "weight_kg": "2.400",
  "root_cause_determinant": "overproduced_unsold",
  "notes": "End of morning buffet hold excess"
}
```
- **Response (201 Created)**:
```json
{
  "id": "e45ba7ce-29bb-41db-8c63-441d8e121852",
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "branch_name": "Onitsha Main Market",
  "logged_by": "0b6271f3-92ad-4ae4-b97b-fd1cba128701",
  "logged_by_name": "C. Nwosu",
  "timestamp": "2026-10-08T12:38:00+01:00",
  "operational_stage": "overproduction_buffet",
  "operational_stage_display": "Overproduction & Buffet",
  "menu_item": "72df546b-05a8-4bb9-92dc-e300cf9d7ecb",
  "menu_item_name": "Jollof Rice Standard",
  "weight_kg": "2.400",
  "financial_loss_naira": "6720.00",
  "root_cause_determinant": "overproduced_unsold",
  "root_cause_determinant_display": "Overproduced / Unsold",
  "notes": "End of morning buffet hold excess"
}
```

#### 2. Query Daily Waste Summary (KPI Metrics)
- **Endpoint**: `GET /api/v1/waste/daily-summary/?branch={branch_id}&date=YYYY-MM-DD`
- **Response (200 OK)**:
```json
{
  "date": "2026-10-08",
  "total_weight_kg": "12.600",
  "total_loss_naira": "34500.00",
  "count": 5,
  "breakdown_by_stage": {
    "overproduction_buffet": { "weight_kg": 6.05, "loss_naira": 17880, "percentage": 48 },
    "preparation": { "weight_kg": 3.15, "loss_naira": 13020, "percentage": 25 },
    "storage_spoilage": { "weight_kg": 1.89, "loss_naira": 3600, "percentage": 15 },
    "plate_waste": { "weight_kg": 1.51, "loss_naira": 0, "percentage": 12 }
  }
}
```

#### 3. Audit Waste Logs Table
- **Endpoint**: `GET /api/v1/waste/logs/?branch={branch_id}&page=1&ordering=-timestamp&operational_stage=overproduction_buffet`
- **Response (200 OK)**:
```json
{
  "count": 23,
  "next": "https://.../api/v1/waste/logs/?page=2",
  "previous": null,
  "results": [
    {
      "id": "e45ba7ce-29bb-41db-8c63-441d8e121852",
      "timestamp": "2026-10-08T12:38:00+01:00",
      "menu_item_name": "Jollof Rice Standard",
      "operational_stage": "overproduction_buffet",
      "operational_stage_display": "Overproduction & Buffet",
      "weight_kg": "2.400",
      "financial_loss_naira": "6720.00",
      "root_cause_determinant_display": "Overproduced / Unsold",
      "logged_by_name": "C. Nwosu"
    }
  ]
}
```

---

### 5.3 AI Forecasting & Kitchen Prep Sheet Endpoints

#### 1. Retrieve Shift Kitchen Prep Sheet
- **Endpoint**: `GET /api/v1/forecast/prep-sheet/?branch={branch_id}&date=YYYY-MM-DD`
- **Response (200 OK)**: Array of `KitchenPrepTarget`
```json
[
  {
    "id": "d16c561b-93f4-4065-a81d-b8d14d339902",
    "forecast_run": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "ingredient": "73c6838b-d512-4217-bc7a-cc13d9cf9e10",
    "ingredient_name": "Long Grain Rice",
    "unit_of_measure": "kg",
    "total_raw_qty_to_prep": "60.000",
    "actual_used_qty": null,
    "variance_qty": null
  },
  {
    "id": "4b6ca589-913a-4da2-9b25-b0404f3d2f91",
    "forecast_run": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "ingredient_name": "Fresh Whole Chicken",
    "unit_of_measure": "kg",
    "total_raw_qty_to_prep": "45.000",
    "actual_used_qty": null,
    "variance_qty": null
  }
]
```

#### 2. Retrieve Detailed Forecast Run with Staggered Batches
- **Endpoint**: `GET /api/v1/forecast/forecast-runs/{id}/`
- **Response (200 OK)**: `ForecastRunDetail`
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "branch_name": "Onitsha Main Market",
  "forecast_target_date": "2026-10-08",
  "executed_at": "2026-10-08T06:00:00+01:00",
  "status": "success",
  "status_display": "Success",
  "forecast_items": [
    {
      "id": "902d8471-118f-4efc-8b89-60ce81eaad81",
      "menu_item": "72df546b-05a8-4bb9-92dc-e300cf9d7ecb",
      "menu_item_name": "Jollof Rice Standard",
      "chronos_prediction": "212.00",
      "timesfm_prediction": "188.00",
      "ensemble_prediction": "200.00",
      "disagreement_score": "11.40",
      "confidence_level": "low",
      "confidence_level_display": "Low",
      "recommended_prep_strategy": "two_staggered_batches",
      "recommended_prep_strategy_display": "Two Staggered Batches",
      "batch_1_portions": 130,
      "batch_2_portions": 70,
      "batch_3_portions": 0
    },
    {
      "id": "6724391e-3557-4ea2-a1b7-a3a60714b7e8",
      "menu_item_name": "Fried Chicken 1-Piece",
      "chronos_prediction": "182.00",
      "timesfm_prediction": "178.00",
      "ensemble_prediction": "180.00",
      "disagreement_score": "2.20",
      "confidence_level": "high",
      "confidence_level_display": "High",
      "recommended_prep_strategy": "single_bulk_batch",
      "recommended_prep_strategy_display": "Single Bulk Batch",
      "batch_1_portions": 180,
      "batch_2_portions": 0,
      "batch_3_portions": 0
    }
  ]
}
```

#### 3. Update Actual Used Prep Quantity
- **Endpoint**: `PATCH /api/v1/forecast/prep-targets/{id}/`
- **Request Body**:
```json
{
  "actual_used_qty": "58.500"
}
```

#### 4. Trigger Daily Forecast Calculation
- **Endpoint**: `POST /api/v1/forecast/trigger/`
- **Request Body**:
```json
{
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "target_date": "2026-10-09",
  "forecast_data": [
    {
      "menu_item": "72df546b-05a8-4bb9-92dc-e300cf9d7ecb",
      "chronos_prediction": "205.00",
      "timesfm_prediction": "195.00"
    }
  ],
  "notes": "Weather forecast indicates high humidity"
}
```

---

### 5.4 Local Calendar & Context Intelligence

#### 1. Today's Context Variables
- **Endpoint**: `GET /api/v1/calendar/today/?city=Onitsha`
- **Response (200 OK)**:
```json
{
  "id": "28b79e46-ed3a-4f7d-b87f-0b3ce4caaaad",
  "date": "2026-10-08",
  "city": "ONITSHA",
  "traditional_market_day": "afor",
  "market_day_display": "Afor",
  "is_major_market_day": true,
  "is_payday_window": true,
  "weather_condition": "rain_humid",
  "weather_display": "Humid / 32°C",
  "day_of_week": "Thursday"
}
```
*Frontend Application*: Renders context signal tags (`Afor Market Day`, `Payday Window`) directly on the Terminal header.

---

### 5.5 Inventory & Cold-Chain Outages

#### 1. Expiring Batches (< 3 Days FEFO Alert)
- **Endpoint**: `GET /api/v1/inventory/batches/expiring-soon/?branch={branch_id}`
- **Response (200 OK)**:
```json
{
  "count": 4,
  "results": [
    {
      "id": "18f25301-3814-469b-8f38-89f4175b5a2e",
      "ingredient_name": "Onions (bag)",
      "quantity_remaining": "15.00",
      "unit_cost_at_purchase": "650.00",
      "expiry_date": "2026-10-10",
      "days_until_expiry": "1.2",
      "storage_type": "ambient"
    }
  ]
}
```

#### 2. Log Power Outage & Standby Generator
- **Endpoint**: `POST /api/v1/inventory/outages/`
- **Request Body**:
```json
{
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "outage_start": "2026-10-08T09:15:00+01:00",
  "outage_end": "2026-10-08T12:00:00+01:00",
  "generator_available": true,
  "notes": "Chillers sustained at 3.5°C on 150kVA standby generator"
}
```

---

### 5.6 Menu Engineering Matrix & Analytics

#### 1. Generate BCG Menu Matrix Snapshot
- **Endpoint**: `POST /api/v1/analytics/menu-matrix/`
- **Request Body**:
```json
{
  "branch": "a871cbdf-5061-45bc-8a7c-6194bc02810a",
  "period_start": "2026-10-01",
  "period_end": "2026-10-07"
}
```
- **Response (200 OK)**:
```json
{
  "id": "a90184b2-c11f-4318-8726-fa41980be12c",
  "menu_item_name": "Jollof Rice Standard",
  "units_sold": 1420,
  "waste_weight_kg": "18.400",
  "waste_cost_naira": "51520.00",
  "profit_margin_naira": "1245000.00",
  "matrix_category": "plowhorse",
  "matrix_category_display": "Plowhorse (High Sales, Low Profit)",
  "recommendation": "Shift to staggered batching to trim ₦51k overproduction loss"
}
```

---

## 6. Implementation Architecture in React

### 6.1 State Management & Offline-Resilient Terminal
In high-stress commercial kitchens, Internet connectivity can fluctuate during power shifts.
1. **API Client (`api/client.ts`)**:
   - Configured with Axios / standard fetch with automatic token injection.
   - 10-second timeout with friendly Nigerian connectivity error messaging.
2. **Offline Queue Sync**:
   - Waste logs can be recorded immediately into `IndexedDB` or `localStorage`.
   - When the client detects network reconnection, queued logs submit asynchronously via `POST /api/v1/waste/`.
3. **Weight Scale Interface (`useScaleInput.ts`)**:
   - Supports simulated on-screen keypad adjustments (`-0.1`, `+0.1`, `+0.5`, `+1.0`, `Tare`).
   - Prepared for hardware integration with digital RS-232 / USB scales via the **Web Serial API** (`navigator.serial`).

---

## 7. Step-by-Step UI Rebuild Roadmap

1. **Step 1: Design Tokens & Infrastructure Setup**
   - Configure Tailwind font families (`Inter`, `JetBrains Mono`) and import Google Material Symbols Outlined.
   - Establish Axios/fetch client with `Authorization: Token` header management.
2. **Step 2: Core Layout & Navigation**
   - Build `Header`, `ContextRow`, and tab router managing views: `terminal`, `forecast`, `ingredients`, `recipes`, `logs`, `analytics`, `settings`.
3. **Step 3: Waste Terminal (Primary Interaction Surface)**
   - Build `StageSelector`, `MenuItemTile` grid, digital `ScaleDisplay`, `RootCauseSelector`, live `LossCalculator`, and `RecordEntry` submission flow.
4. **Step 4: AI Forecast & Prep Sheet View**
   - Build `PrepSheetTable` with staggered batch portion allocations (Batch 1 vs Batch 2 on-demand).
   - Render `RushTimeline` and `ContextSignalCards` connected to `/calendar/today/`.
5. **Step 5: Ingredients & FEFO Inventory**
   - Build `InventoryTable` with days-until-expiry color-coded badges (< 3 days amber warning).
   - Add delivery in-transit tracker and outage logger modal.
6. **Step 6: Standardized Recipes & BOM**
   - Build expandable `RecipeCard` with ingredient breakdown per 10 portions and cooking methods.
7. **Step 7: Waste Audit Logs & Analytics**
   - Implement paginated `WasteLogsTable` with search and stage filters.
   - Build KPI metrics cards, stage breakdown progress bars, and 7-day trend chart.
8. **Step 8: Settings & Live Backend Sync**
   - Operator shift badges, loss ceiling thresholds, and API connection status indicators.
