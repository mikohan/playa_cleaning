// Define the base scope used for Standard/Deep/Move-Out cleaning
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
      { name: "Wash Windows", price: 25, unit: "per window" },
      { name: "Balcony Glass", price: 60, unit: "per balcony" },
      { name: "Pet Hair Removal", price: 35, unit: "" },
      { name: "Bring Vacuum", price: 30, unit: "" },
      { name: "Clean Balcony", price: 45, unit: "" },
      { name: "Ironing", price: 40, unit: "per hour" },
      { name: "Key Delivery/Pickup", price: 25, unit: "" },
      { name: "Clean Walk-in Closet", price: 35, unit: "" },
      { name: "Chandelier Cleaning", price: 20, unit: "per pc" },
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
      { name: "Inside Oven", price: 40, unit: "" },
      { name: "Inside Microwave", price: 15, unit: "" },
      { name: "Inside Kitchen Cabinets", price: 45, unit: "" },
      { name: "Deep Kitchen Scrub", price: 65, unit: "" },
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
      { name: "Limescale & Rust Removal", price: 40, unit: "" },
      { name: "Clean Pet Litter Box", price: 15, unit: "" },
    ],
  },
}

// Define the specialized scope for Upholstery (Angara Streamers style)
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
      { name: "Fabric Protector (Scotchgard)", price: 45, unit: "per sofa" },
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

/**
 * Helper function to select the right data based on the URL slug
 */
export function getScopeBySlug(slug: string) {
  switch (slug) {
    case "upholstery-cleaning":
    case "carpet-cleaning":
      return upholsteryScope

    // You can add more specific cases here as you build out your 8 services
    // case "commercial-cleaning":
    //   return commercialScope;

    default:
      return baseCleaningScope
  }
}
