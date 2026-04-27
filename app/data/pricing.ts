/**
 * PRICING SOURCE OF TRUTH
 */
import {
  Plus,
  Minus,
  Check,
  Refrigerator,
  Cookie,
  Eye,
  Move,
  Waves,
  Zap,
  ShieldCheck,
  ArrowRight,
  Info,
  Fence,
} from "lucide-react"

export interface PricingMatrix {
  readonly [bedrooms: string]: {
    readonly [bathrooms: string]: number
  }
}

export interface PricingData {
  STANDARD: PricingMatrix
  DEEP: PricingMatrix
}

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

export const INCLUSIONS: Record<string, string[]> = {
  standard: [],
  deep: ["oven", "windows", "fridge"],
  move: ["oven", "windows", "fridge", "moveAppliances"],
}

export const PRICING_ADDONS = {
  // Move In/Out uses DEEP_MATRIX + this multiplier
  moveMultiplier: 1.2,
  addons: {
    fridge: { label: "Inside Fridge", price: 35, icon: Refrigerator },
    oven: { label: "Inside Oven", price: 35, icon: Cookie },
    moveAppliances: { label: "Move Fridge/Oven", price: 60, icon: Move },
    pets: { label: "Patio/Balcony", price: 45, icon: Fence },
    windows: { label: "Interior Windows", price: 15, icon: Waves },
    blinds: { label: "Hand-Wipe Blinds", price: 12, icon: Eye },
  },
}
// Define helper types based on the matrix keys
type BedCount = keyof typeof PRICING_MATRICES.STANDARD
type BathCount = string // We use string here to allow for "5+"

export const FREQUENCY_DISCOUNTS = {
  WEEKLY: 0.2,
  BIWEEKLY: 0.15,
  MONTHLY: 0,
} as const

export const DEEP_CLEANING_ADDONS = [
  {
    item: "Inside Oven",
    price: 35,
    displayPrice: "$35",
    desc: "Heavy degreasing & scrub",
  },
  {
    item: "Inside Fridge",
    price: 35,
    displayPrice: "$35",
    desc: "Sanitization & organization",
  },
  {
    item: "Inside Cabinets",
    price: 45,
    displayPrice: "$45",
    desc: "Vacuum & hand-wipe",
  },
  {
    item: "Interior Windows",
    price: 5,
    displayPrice: "$5/ea",
    desc: "Streak-free detail",
  },
  {
    item: "Baseboard Wiping",
    price: 50,
    displayPrice: "$50+",
    desc: "Hand-scrubbed finish",
  },
] as const

/**
 * Helper to get a calculated row for the Regular Cleaning table
 */
export function getRegularPricingRow(beds: BedCount, baths: BathCount) {
  // 1. Get the sub-object for bedrooms
  const bedEntry = PRICING_MATRICES.STANDARD[beds]

  // 2. Cast the sub-object so we can index it with a string (the bathrooms)
  const base = (bedEntry as Record<string, number>)[baths] || 0

  return {
    label: `${beds} Bed ${baths} Bath`,
    weekly: Math.round(base * (1 - FREQUENCY_DISCOUNTS.WEEKLY)),
    biweekly: Math.round(base * (1 - FREQUENCY_DISCOUNTS.BIWEEKLY)),
    monthly: base,
  }
}
