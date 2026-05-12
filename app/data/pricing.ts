/**
 * PRICING SOURCE OF TRUTH
 */
import {
  Refrigerator,
  Cookie,
  Eye,
  Move,
  Waves,
  Zap,
  ShieldCheck,
  Fence,
  BedDouble,
  Wind,
  Layers,
} from "lucide-react"

// --- TYPES ---

export interface PricingMatrix {
  readonly [bedrooms: string]: {
    readonly [bathrooms: string]: number
  }
}

export interface PricingData {
  STANDARD: PricingMatrix
  DEEP: PricingMatrix
}

type BedCount = string
type BathCount = string

// --- MATRICES & DISCOUNTS ---

export const PRICING_MATRICES: PricingData = {
  STANDARD: {
    "1": { "1": 165, "2": 190, "3": 215 },
    "2": { "1": 185, "2": 185, "3": 210, "4": 235 },
    "3": { "1": 210, "2": 230, "3": 255, "4": 280 },
    "4": { "2": 270, "3": 295, "4": 320, "5+": 345 },
    "5+": { "3": 360, "4": 385, "5+": 410 },
  },
  DEEP: {
    "1": { "1": 280, "2": 310, "3": 340 },
    "2": { "1": 320, "2": 320, "3": 350, "4": 380 },
    "3": { "1": 380, "2": 410, "3": 465, "4": 470 },
    "4": { "2": 490, "3": 505, "4": 550, "5+": 580 },
    "5+": { "3": 620, "4": 585, "5+": 635 },
  },
} as const

export const FREQUENCY_DISCOUNTS = {
  WEEKLY: 0.2,
  BIWEEKLY: 0.15,
  MONTHLY: 0,
} as const

// --- ADDONS ---

export const PRICING_ADDONS = {
  moveMultiplier: 1.2,
  addons: {
    fridge: { label: "Inside Fridge", price: 35, icon: Refrigerator },
    oven: { label: "Inside Oven", price: 35, icon: Cookie },
    moveAppliances: { label: "Move Fridge/Oven", price: 60, icon: Move },
    pets: { label: "Patio/Balcony", price: 45, icon: Fence },
    windows: { label: "Interior Windows", price: 15, icon: Waves },
    blinds: { label: "Hand-Wipe Blinds", price: 20, icon: Eye },
    cabinets: { label: "Inside Cabinets", price: 45, icon: Zap },
    microwave: { label: "Inside Microwave", price: 15, icon: Zap },
    limescale: {
      label: "Limescale & Rust Removal",
      price: 40,
      icon: ShieldCheck,
    },
    linen: { label: "Change Bed Linen", price: 20, icon: BedDouble },
    ceilingFan: { label: "Ceiling Fan", price: 10, icon: Wind },
    baseboards: { label: "Baseboards", price: 15, icon: Layers },
  },
}

// --- SCOPES ---

export const baseCleaningScope = {
  general: {
    title: "Entire Apartment",
    included: [
      "Mop & vacuum floors",
      "Clean rugs & carpets",
      "Dust furniture & surfaces",
      "Clean mirrors & glass",
      "Make the beds",
      "Tidy up & fold clothes",
      "Take out the trash",
    ],
    extras: [
      { name: "Interior Windows", price: 15, unit: "per window" },
      { name: "Hand-Wipe Blinds", price: 20, unit: "per window" },
      { name: "Change Bed Linen", price: 20, unit: "per bed" },
      { name: "Ceiling Fan", price: 10, unit: "ea" },
      { name: "Baseboards", price: 15, unit: "per room" },
      { name: "Pet Hair Removal", price: 35, unit: "" },
      { name: "Ironing", price: 40, unit: "per hour" },
    ],
  },
  kitchen: {
    title: "Kitchen",
    included: [
      "Wash the sink",
      "Wipe countertops",
      "Clean stovetop",
      "Wipe dining table",
      "Wash a load of dishes",
    ],
    extras: [
      { name: "Inside Fridge", price: 35, unit: "" },
      { name: "Inside Oven", price: 35, unit: "" },
      { name: "Inside Microwave", price: 15, unit: "" },
      { name: "Inside Cabinets", price: 45, unit: "" },
    ],
  },
  bathroom: {
    title: "Bathroom & Toilet",
    included: [
      "Scrub bathtub or shower",
      "Clean the sink",
      "Sanitize the toilet",
      "Clean the bidet",
    ],
    extras: [
      { name: "Limescale Removal", price: 40, unit: "" },
      { name: "Clean Pet Litter Box", price: 15, unit: "" },
    ],
  },
}

export const deepCleaningScope = {
  general: {
    title: "Living Space Restoration",
    included: [
      "Detail all baseboards (hand-wiped)",
      "Deep vacuuming of edges & upholstery crevices",
      "Clean all window tracks & sills",
      "Dust & wipe all door frames & light switches",
      "Sanitize high-touch surfaces",
      "Dust ceiling fans & fixtures",
      "Detail all mirrors and glass",
      "Vacuum under accessible furniture",
    ],
    extras: [
      { name: "Wall Washing", price: 60, unit: "per hour" },
      { name: "HVAC Vent Sanitization", price: 10, unit: "per vent" },
      { name: "Window Blind Restoration", price: 25, unit: "per set" },
    ],
  },
  kitchen: {
    title: "Kitchen Heavy Degreasing",
    included: [
      "Inside Microwave (Deep Clean)",
      "Stovetop & Hood Filter degreasing",
      "Exterior of all appliances polished",
      "Deep scrub of sink & faucet",
      "Countertop crevices detailed",
      "Cabinet exteriors hand-wiped",
      "Trash can interior sanitized",
    ],
    extras: [
      { name: "Inside Oven (Heavy Duty)", price: 45, unit: "" },
      { name: "Inside Fridge & Freezer", price: 40, unit: "" },
      { name: "Inside Cabinets (Emptying required)", price: 50, unit: "" },
    ],
  },
  bathroom: {
    title: "Bathroom Scale & Mold Removal",
    included: [
      "Detailed tile & grout scrub",
      "Limescale removal from fixtures",
      "Inside medicine cabinets wiped",
      "Vanity drawers vacuumed and wiped",
      "Shower glass restoration",
      "Toilet base & behind-tank sanitization",
    ],
    extras: [
      { name: "Grout Steam Cleaning", price: 65, unit: "per bath" },
      { name: "Exhaust Fan Deep Clean", price: 15, unit: "" },
    ],
  },
}

export const upholsteryScope = {
  sofa: {
    title: "Sofa & Sectional",
    included: [
      "High-pressure steam extraction",
      "Eco-friendly pre-treatment",
      "Fabric-safe stain removal",
      "Deodorizing treatment",
    ],
    extras: [
      { name: "Fabric Protector", price: 45, unit: "per sofa" },
      { name: "Deep Pet Odor Treatment", price: 50, unit: "" },
    ],
  },
  mattress: {
    title: "Mattresses & Rugs",
    included: [
      "UV Sanitization",
      "Dust mite removal",
      "Steam cleaning",
      "Anti-allergen finish",
    ],
    extras: [{ name: "Pillow Sanitization", price: 15, unit: "per pc" }],
  },
  technical: {
    title: "Equipment & Tech",
    included: [
      "Industrial Mytee Solution Hose",
      "High-heat steam (210°F)",
      "Non-toxic cleaning agents",
    ],
    extras: [],
  },
}

// --- HELPER FUNCTIONS ---

export function getRegularPricingRow(beds: BedCount, baths: BathCount) {
  const bedEntry = PRICING_MATRICES.STANDARD[beds]
  const base = (bedEntry as Record<string, number>)[baths] || 0

  return {
    label: `${beds} Bed ${baths} Bath`,
    weekly: Math.round(base * (1 - FREQUENCY_DISCOUNTS.WEEKLY)),
    biweekly: Math.round(base * (1 - FREQUENCY_DISCOUNTS.BIWEEKLY)),
    monthly: base,
  }
}

export function getScopeBySlug(slug: string) {
  switch (slug) {
    case "upholstery-cleaning":
    case "carpet-cleaning":
    case "sofa-cleaning":
      return upholsteryScope

    case "deep-cleaning":
      return deepCleaningScope
    case "maid-servce":
      return baseCleaningScope
    case "move-out-cleaning":
      return deepCleaningScope

    default:
      return baseCleaningScope
  }
}

// Add this to the bottom of app/data/pricing.ts
export const DEEP_CLEANING_ADDONS = [
  {
    item: PRICING_ADDONS.addons.oven.label,
    price: PRICING_ADDONS.addons.oven.price,
    displayPrice: `$${PRICING_ADDONS.addons.oven.price}`,
    desc: "Heavy degreasing & scrub",
  },
  {
    item: PRICING_ADDONS.addons.fridge.label,
    price: PRICING_ADDONS.addons.fridge.price,
    displayPrice: `$${PRICING_ADDONS.addons.fridge.price}`,
    desc: "Sanitization & organization",
  },
  {
    item: PRICING_ADDONS.addons.cabinets.label,
    price: PRICING_ADDONS.addons.cabinets.price,
    displayPrice: `$${PRICING_ADDONS.addons.cabinets.price}`,
    desc: "Vacuum & hand-wipe",
  },
  {
    item: PRICING_ADDONS.addons.windows.label,
    price: PRICING_ADDONS.addons.windows.price,
    displayPrice: `$${PRICING_ADDONS.addons.windows.price}/ea`,
    desc: "Streak-free detail",
  },
  {
    item: PRICING_ADDONS.addons.baseboards.label,
    price: PRICING_ADDONS.addons.baseboards.price,
    displayPrice: `$${PRICING_ADDONS.addons.baseboards.price}/rm`,
    desc: "Hand-scrubbed finish",
  },
] as const
// Add this back to app/data/pricing.ts
export const INCLUSIONS: Record<string, string[]> = {
  standard: [],
  deep: ["oven", "windows", "fridge"],
  move: ["oven", "windows", "fridge", "moveAppliances"],
}
