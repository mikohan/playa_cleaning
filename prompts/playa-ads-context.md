# Playa Cleaning: Google Ads Master Strategy & Context

Use this comprehensive context profile to train marketing models, draft ad copy, or configure campaign parameters for **Playa Cleaning**.

---

## 1. Core Business Identity

- **Company Name:** Playa Cleaning (Note: This is a completely separate business entity under management from Angara Steamers Couch Cleaning).
- **Owner Name:** Alicia
- **Location & Service Area:** Based in the **Los Angeles, California** metropolitan area, covering high-end, affluent residential neighborhoods.
- **Long-Term Vision:** Build, test, and optimize a highly systematic, high-performing client acquisition model in the hyper-competitive Los Angeles market, then scale the infrastructure **federally across the United States**.

---

## 2. Services, Pricing & Brand Positioning

- **Phased Service Rollout:**
  - **Phase 1 (Current Focus):** Premium Residential Cleaning.
  - **Phase 2 (Future Expansion):** Commercial / Office Cleaning.
- **Baseline Pricing Structure:**
  - **Hourly Standard:** $60 per hour, per cleaner.
  - **Flat-Rate Packaging:** 3 hours of cleaning is priced at $165.
- **Brand Tone & Philosophy:** High-end, meticulous, and strictly professional. The brand targets wealthy individuals who prioritize top-tier craftsmanship, trustworthy workers, and seamless execution over budget-rate, discount cleaning services.
- **The Business System:** Operational focus is centered on business systematization, complete automation, and delegation. Every marketing component feeds into an un-bottlenecked, scalable workflow.

---

## 3. Technical Tracking & Attribution Stack

Playa Cleaning operates on a robust, closed-loop conversion pipeline engineered to eliminate data tracking leaks.

- **Frontend Stack:** React, Next.js, Tailwind CSS, and HeroUI. It utilizes a custom dynamic calculator that handles user inputs and outputs an explicit price quote target on form completion.
- **The Data Pipeline:** Driven via **Google Tag Manager (GTM)**. Form completions trigger a custom client-side event: `form_submission_success`. GTM extracts the variable value dynamically via `{{dlv - estimated_value}}`.
- **Google Analytics 4 (GA4):** Configured via DebugView to capture the custom `generate_lead` event mapped alongside critical parameters (`value`, `form_type`, `service_type`).
- **Google Ads Account:** Tagged via Conversion Tracking matching account ID `11163209587` and Conversion Label `P6L6CMfxtK8cEPOehMsp`.
  - **Enhanced Conversions for Leads:** Fully active (`ec_mode=a`), securely hashing user email and phone parameters locally inside the browser.
  - **Dynamic Value Feed:** Passes the calculator’s live estimated quote value into the currency tracking field (`USD`) instead of static default numbers.
- **Meta Conversion API (CAPI):** Unified via Next.js server actions. Server payloads mirror browser events natively using shared, deduplicated tracking `event_id` keys.

---

## 4. Google Ads Campaign Parameters

To scale successfully toward the federal expansion goal, the Los Angeles launch campaign must follow these exact tactical configurations:

- **Bidding Strategy (Initial Phase):** Launched on **Maximize Clicks** with a strict Maximum Cost-Per-Click (CPC) cap. This gathers initial LA market data without letting Google over-charge on unoptimized clicks. The campaign shifts to **Maximize Conversions (Target CPA)** after crossing a threshold of roughly 30 clean conversions.
- **Location Targeting Filter:** Set strictly to **"Presence: People in or regularly in your targeted locations"** to stop ad waste from out-of-state lookups.
- **Keyword Matching:** Built strictly around **Exact Match** strings (e.g., `[residential cleaning los angeles]`, `[house cleaner service la]`). Broad match terms are disabled.
- **Ad Copy Framework:** Implements **Dynamic Keyword Insertion (DKI)** in Headline 1 (e.g., `{#Keyword:Home Cleaners Near Me}`) for instant user relevancy. Headlines 2 and 3 highlight trust, premium execution details, and direct pricing structure (e.g., _"Packages from $165"_ or _"$60/Hour Flat"_), completely omitting generic discount hooks.
