export const servicePages = [
  // ==========================================
  // RESIDENTIAL CLEANING SERVICES
  // ==========================================
  {
    slug: "home-cleaning",
    page: "Home Cleaning Service",
    intent: "Maintenance/Recurring",
    content: {
      h1: "Professional Home Cleaning Los Angeles",
      subheading: "A systematic maintenance reset for your living space.",
      introText:
        "Our standard home cleaning is designed for the high-end LA lifestyle. We focus on consistent quality and high-traffic areas, ensuring your home remains a sanctuary.",
      mainFeatures: [
        {
          title: "Living Area Refresh",
          detail:
            "Meticulous dusting, vacuuming, and surface sanitization for all primary living zones.",
        },
        {
          title: "Kitchen & Bath Scrub",
          detail:
            "Deep sanitization of countertops, sinks, and exterior appliance detailing.",
        },
      ],
      steps: [
        "Instant Booking: Schedule online or via text in 60 seconds.",
        "Systematic Clean: Our team executes the 'Playa Protocol' checklist.",
        "Quality Audit: We verify every surface meets our premium standards.",
      ],
    },
    seo: {
      title: "Home Cleaning Service Los Angeles | Top-Rated Home Cleaners",
      description:
        "Reliable home cleaning services in West LA. Meticulous, systematic, and background-checked cleaners for your daily peace of mind.",
      canonical: "https://playacleaning.com/services/home-cleaning",
      keywords:
        "home cleaning service, residential cleaning, house cleaners LA, routine cleaning",
      robots: "index, follow",
      faqs: [
        {
          question: "Is this a one-time or recurring service?",
          answer:
            "We offer both one-time resets and discounted recurring maintenance plans for weekly or bi-weekly visits.",
        },
      ],
      og_data: {
        "og:title": "Professional Home Cleaning Services in Los Angeles",
        "og:description":
          "The systematic way to keep your home pristine. Trusted by professionals across West LA.",
        "og:type": "website",
        "og:image": "/images/og/home-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/home-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Home Cleaning Service",
        description:
          "Professional residential maintenance cleaning for homes and apartments.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "deep-cleaning",
    page: "Deep Cleaning Service",
    intent: "Transactional/Detailed",
    content: {
      h1: "Meticulous Deep Cleaning Los Angeles",
      subheading: "The ultimate top-to-bottom detailing for your home.",
      introText:
        "When a standard clean isn't enough, our deep cleaning protocol dives into the details: baseboards, vents, and heavy-duty grease removal.",
      mainFeatures: [
        {
          title: "Deep Detail Focus",
          detail:
            "Manual scrubbing of baseboards, door frames, and light fixtures.",
        },
        {
          title: "Intensive Sanitization",
          detail:
            "HEPA filtration vacuuming and deep-scrub protocols for all hard surfaces.",
        },
      ],
      steps: [
        "Detail Audit: We identify high-buildup areas requiring extra attention.",
        "Heavy Duty Scrub: Execution of our intensive top-to-bottom protocol.",
        "Pristine Finish: Final inspection to ensure showroom-quality results.",
      ],
    },
    seo: {
      title: "Deep Cleaning Services LA | Professional Home Detailing",
      description:
        "Premium deep cleaning in Los Angeles. We reach the spots others miss, from baseboards to ceiling fans.",
      canonical: "https://playacleaning.com/services/deep-cleaning",
      keywords:
        "deep cleaning services, heavy duty house cleaning, professional cleaners, home detailing",
      robots: "index, follow",
      faqs: [
        {
          question: "How often should I deep clean?",
          answer:
            "We recommend a professional deep clean every 3 to 6 months to maintain property value and hygiene.",
        },
      ],
      og_data: {
        "og:title": "Meticulous Deep Cleaning & Home Detailing | Los Angeles",
        "og:description":
          "Go beyond the surface. Our deep cleaning protocol is the most thorough in LA.",
        "og:type": "website",
        "og:image": "/images/og/deep-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/deep-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Deep Cleaning Service",
        description: "Intensive residential deep cleaning and detailing.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "maid-service",
    page: "Maid Service",
    intent: "Service-Based",
    content: {
      h1: "Elite Maid Service Los Angeles",
      subheading: "Hospitality-standard care for your private residence.",
      introText:
        "Our maid service is about home management. We provide a consistent, high-end experience tailored to your specific household needs.",
      mainFeatures: [
        {
          title: "Dedicated Team",
          detail:
            "Assigned professionals who learn the specific nuances of your home.",
        },
        {
          title: "Tidying & Organizing",
          detail:
            "Light organization and household management included in the flow.",
        },
      ],
      steps: [
        "Client Profile: We document your home's specific requirements.",
        "Elite Deployment: Trained maids arrive to manage your space.",
        "Consistency Check: Ongoing supervision ensures standards never drop.",
      ],
    },
    seo: {
      title: "Professional Maid Service Los Angeles | Playa Cleaning",
      description:
        "Elite maid services in Santa Monica and Venice. Background-checked, hospitality-trained professionals for consistent care.",
      canonical: "https://playacleaning.com/services/maid-service",
      keywords:
        "maid service LA, professional maids, residential maid service, private cleaners",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Elite Maid Service | Los Angeles Home Management",
        "og:description":
          "Hospitality-grade cleaning for your home. Consistent, reliable, and premium.",
        "og:type": "website",
        "og:image": "/images/og/maid-service.jpg",
        "og:url": "https://playacleaning.com/services/maid-service",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Maid Service",
        description:
          "Hospitality-focused residential maid and housekeeping services.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "housekeeping",
    page: "Housekeeping",
    intent: "Daily/Weekly",
    content: {
      h1: "Reliable Housekeeping Los Angeles",
      subheading: "Seamless day-to-day management of your home.",
      introText:
        "Our housekeeping services provide the regular support needed to maintain a high-end environment for busy families and professionals.",
      mainFeatures: [
        {
          title: "Daily Maintenance",
          detail: "Laundry, bed-making, and general surface maintenance.",
        },
        {
          title: "Reliability",
          detail:
            "Punctual, background-checked staff dedicated to your schedule.",
        },
      ],
      steps: [
        "Schedule Sync: We align with your family's routine.",
        "Daily/Weekly Reset: Systematic execution of housekeeping tasks.",
        "Manager Audit: Regular quality checks to ensure perfection.",
      ],
    },
    seo: {
      title: "Housekeeping Services West LA | Professional Housekeepers",
      description:
        "Dependable housekeeping for busy families in West Los Angeles. Consistent maintenance for your primary residence.",
      canonical: "https://playacleaning.com/services/housekeeping",
      keywords:
        "housekeeping services, weekly cleaners, household management, housekeepers LA",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Dependable Housekeeping Services in West LA",
        "og:description":
          "Keep your home running smoothly with professional housekeeping from Playa Cleaning.",
        "og:type": "website",
        "og:image": "/images/og/housekeeping.jpg",
        "og:url": "https://playacleaning.com/services/housekeeping",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Housekeeping Service",
        description:
          "Daily or weekly residential housekeeping and laundry services.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "move-in-cleaning",
    page: "Move In Cleaning",
    intent: "Critical/Transactional",
    content: {
      h1: "Professional Move In Cleaning",
      subheading: "Ensure your new home is sanitized and fresh.",
      introText:
        "Don't move into someone else's dust. We sanitize every cabinet, closet, and surface so your new home is truly a fresh start.",
      mainFeatures: [
        {
          title: "Cabinet Sanitization",
          detail:
            "Deep cleaning inside and out of all kitchen and bathroom cabinetry.",
        },
        {
          title: "Pristine Prep",
          detail:
            "Total floor and surface sanitization before your belongings arrive.",
        },
      ],
      steps: [
        "Unpack-Ready Audit: We identify all high-touch sanitization points.",
        "Fresh Start Clean: Execution of our move-in sanitization protocol.",
        "Final Sanitized Walk: A final check ensuring the home is ready for you.",
      ],
    },
    seo: {
      title: "Move In Cleaning Los Angeles | Sanitize Your New Home",
      description:
        "Moving to LA? Ensure your new home is pristine. Deep cleaning for cabinets, closets, and all surfaces.",
      canonical: "https://playacleaning.com/services/move-in-cleaning",
      keywords:
        "move in cleaning, new home cleaning, sanitized move in, relocation cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Expert Move-In Cleaning | Playa Cleaning Los Angeles",
        "og:description":
          "Don't unpack into dust. Get a professional move-in clean today.",
        "og:type": "website",
        "og:image": "/images/og/move-in-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/move-in-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Move In Cleaning",
        description: "Deep sanitization for new residential occupants.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "move-out-cleaning",
    page: "Move Out Cleaning",
    intent: "Critical/Transactional",
    content: {
      h1: "Move Out Cleaning Los Angeles",
      subheading: "Secure your security deposit with our 50-point protocol.",
      introText:
        "We focus on the deep-scrub details property managers look for—inside cabinets, baseboards, and appliances.",
      mainFeatures: [
        {
          title: "Deposit Recovery Focus",
          detail:
            "Cleaning designed to pass professional property management inspections.",
        },
        {
          title: "Full Coverage",
          detail:
            "Every corner, including interior appliances and hard-to-reach dust zones.",
        },
      ],
      steps: [
        "Inspection Audit: We target areas most likely to impact your deposit.",
        "Deep Scrub: Systematic execution of our move-out checklist.",
        "Deposit Peace: You leave a pristine space, ready for the next tenant.",
      ],
    },
    seo: {
      title: "Move Out Cleaning LA | Get Your Security Deposit Back",
      description:
        "Moving in LA? Get your security deposit back with our professional move-out cleaning. Trusted by tenants in Santa Monica and Venice.",
      canonical: "https://playacleaning.com/services/move-out-cleaning",
      keywords:
        "move out cleaning, security deposit cleaning, apartment move out, end of tenancy cleaning",
      robots: "index, follow",
      faqs: [
        {
          question: "Do you clean inside the oven?",
          answer:
            "Yes, our move-out service automatically includes deep-cleaning the interior of the oven and fridge.",
        },
      ],
      og_data: {
        "og:title": "Professional Move Out Cleaning | Secure Your Deposit",
        "og:description":
          "We handle the deep scrubbing so you can focus on your move. Meticulous standards for LA tenants.",
        "og:type": "website",
        "og:image": "/images/og/move-out-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/move-out-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Move Out Cleaning",
        description:
          "Security deposit focused deep cleaning for moving tenants.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "same-day-cleaning",
    page: "Same Day Cleaning Service",
    intent: "Emergency",
    content: {
      h1: "Same Day Emergency Cleaning LA",
      subheading: "Rapid-response cleaning for last-minute needs.",
      introText:
        "Hosting guests or need an immediate reset? Our rapid-response team is ready for same-day deployments across Los Angeles.",
      mainFeatures: [
        {
          title: "Rapid Dispatch",
          detail: "Priority scheduling to get a pro to your door within hours.",
        },
        {
          title: "Efficiency & Quality",
          detail:
            "Fast-track cleaning that doesn't skip the meticulously details.",
        },
      ],
      steps: [
        "Immediate Request: Contact us for instant availability.",
        "Priority Dispatch: Our nearest available team is deployed.",
        "Instant Reset: Your home is transformed in record time.",
      ],
    },
    seo: {
      title: "Same Day Cleaning Los Angeles | Emergency Maid Service",
      description:
        "Need a cleaner today? Same-day residential cleaning in LA for emergencies and last-minute guests. Fast and reliable.",
      canonical: "https://playacleaning.com/services/same-day-cleaning",
      keywords:
        "same day cleaning, emergency cleaners LA, last minute maid service, urgent cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Emergency Same-Day Cleaning | Los Angeles",
        "og:description":
          "When you need it now. Professional cleaning dispatched today.",
        "og:type": "website",
        "og:image": "/images/og/same-day-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/same-day-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Same Day Cleaning",
        description: "Emergency rapid-response residential cleaning.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "apartment-cleaning",
    page: "Apartment Cleaning Service",
    intent: "Maintenance",
    content: {
      h1: "Apartment Cleaning Specialists",
      subheading: "Meticulous cleaning for LA's urban living.",
      introText:
        "From studio apartments to luxury penthouses, we maximize your space with systematic cleaning designed for modern apartment living.",
      mainFeatures: [
        {
          title: "Vertical Living Pros",
          detail:
            "Experienced with apartment building logistics and security protocols.",
        },
        {
          title: "Detail-Oriented",
          detail:
            "Focused cleaning for kitchens, baths, and living areas in compact spaces.",
        },
      ],
      steps: [
        "Access Sync: We coordinate with your building's concierge or lockbox.",
        "Apartment Reset: Systematic execution of our flat-focused checklist.",
        "Quality Seal: A final check ensuring your space is perfect.",
      ],
    },
    seo: {
      title: "Apartment Cleaning Services LA | Condo & Studio Cleaning",
      description:
        "Expert apartment cleaning for Santa Monica and West LA condos. Specialized for urban lifestyles.",
      canonical: "https://playacleaning.com/services/apartment-cleaning",
      keywords:
        "apartment cleaning, condo cleaning, studio cleaning LA, flat cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Professional Apartment Cleaning | Los Angeles",
        "og:description":
          "Smart, systematic cleaning for your apartment or condo.",
        "og:type": "website",
        "og:image": "/images/og/apartment-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/apartment-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Apartment Cleaning",
        description:
          "Residential cleaning for apartments, condos, and studios.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "post-construction-residential",
    page: "Post Construction Cleaning",
    intent: "Transactional",
    content: {
      h1: "Post-Construction Home Detailing",
      subheading: "Eliminate renovation dust and debris completely.",
      introText:
        "Construction dust is invasive. Our specialized equipment and protocols remove fine particles from every crevice of your newly remodeled home.",
      mainFeatures: [
        {
          title: "HEPA Filtration",
          detail:
            "Advanced vacuum systems to capture microscopic construction dust.",
        },
        {
          title: "Fine Detailing",
          detail:
            "Clearing dust from interior cabinets, tracks, and light fixtures.",
        },
      ],
      steps: [
        "Initial Debris Sweep: Clearing large particles and remaining materials.",
        "HEPA Dust Down: Capturing fine particles from all surfaces and air.",
        "Detail Polish: Restoring the shine to your new fixtures and floors.",
      ],
    },
    seo: {
      title: "Post-Construction Cleaning LA | Residential Remodel Cleanup",
      description:
        "Professional cleanup for home renovations in LA. Remove construction dust from every corner. Detailed and thorough.",
      canonical:
        "https://playacleaning.com/services/post-construction-residential",
      keywords:
        "post construction cleaning, remodel cleaning, renovation cleanup, new home prep",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Post-Construction Home Cleanup | Los Angeles",
        "og:description":
          "Don't move into dust. Get a professional remodel clean today.",
        "og:type": "website",
        "og:image": "/images/og/post-construction.jpg",
        "og:url":
          "https://playacleaning.com/services/post-construction-residential",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Post-Construction Residential Cleaning",
        description:
          "Specialized dust removal and cleaning for renovated homes.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },

  // ==========================================
  // COMMERCIAL CLEANING SERVICES
  // ==========================================
  {
    slug: "office-cleaning",
    page: "Office Cleaning Service",
    intent: "B2B/Recurring",
    content: {
      h1: "Premium Office Cleaning Los Angeles",
      subheading: "A clean workspace is a productive workspace.",
      introText:
        "We provide high-end janitorial solutions for tech offices, creative studios, and corporate headquarters in LA.",
      mainFeatures: [
        {
          title: "Nightly Service",
          detail:
            "Discreet, after-hours cleaning to ensure your business is ready for the morning.",
        },
        {
          title: "Fully Insured",
          detail:
            "Comprehensive liability and workers comp for professional peace of mind.",
        },
      ],
      steps: [
        "Site Assessment: We walk your space to determine high-use zones.",
        "Maintenance Plan: Custom execution of a nightly or weekly schedule.",
        "Manager Reviews: Monthly audits to maintain consistent quality.",
      ],
    },
    seo: {
      title: "Office Cleaning Los Angeles | Commercial Janitorial Services",
      description:
        "Professional office cleaning for LA businesses. Custom schedules for corporate, creative, and tech spaces.",
      canonical: "https://playacleaning.com/services/office-cleaning",
      keywords:
        "office cleaning LA, commercial office cleaners, janitorial service, workplace cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Professional Office Cleaning Services | Los Angeles",
        "og:description":
          "High-end cleaning for your professional workspace. Trusted by LA tech and creative firms.",
        "og:type": "website",
        "og:image": "/images/og/office-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/office-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Office Cleaning Service",
        description: "B2B commercial office cleaning and janitorial services.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "janitorial-service",
    page: "Janitorial Service",
    intent: "B2B/Contractual",
    content: {
      h1: "Full-Service Janitorial Solutions",
      subheading: "Comprehensive facility maintenance for LA businesses.",
      introText:
        "From floor care to restroom sanitization, our janitorial services keep your facility running smoothly and looking impeccable.",
      mainFeatures: [
        {
          title: "Restroom Hygiene",
          detail:
            "Intensive sanitization of high-traffic common areas using hospital-grade products.",
        },
        {
          title: "Supply Management",
          detail: "We monitor and replenish essentials so you never run out.",
        },
      ],
      steps: [
        "Scope Definition: We tailor a janitorial package to your building's size.",
        "Daily Ops: Consistent execution of facility maintenance tasks.",
        "Safety Audit: We ensure all areas meet commercial safety and hygiene standards.",
      ],
    },
    seo: {
      title: "Janitorial Services Los Angeles | Building Maintenance",
      description:
        "Reliable janitorial services for commercial buildings, retail, and education in LA. Fully bonded and insured.",
      canonical: "https://playacleaning.com/services/janitorial-service",
      keywords:
        "janitorial services, commercial janitors, building maintenance LA, facility cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title":
          "Reliable Janitorial Services | Los Angeles Facility Management",
        "og:description":
          "Comprehensive maintenance for commercial and industrial spaces.",
        "og:type": "website",
        "og:image": "/images/og/janitorial.jpg",
        "og:url": "https://playacleaning.com/services/janitorial-service",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Janitorial Service",
        description: "Full-facility commercial janitorial maintenance.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "medical-offices-cleaning",
    page: "Medical Offices Cleaning",
    intent: "B2B/Specialized",
    content: {
      h1: "Medical & Dental Office Cleaning",
      subheading: "Compliance-driven cleaning for healthcare environments.",
      introText:
        "We understand the strict hygiene requirements of medical facilities. Our protocols ensure a sterile, safe environment for staff and patients.",
      mainFeatures: [
        {
          title: "Infection Control",
          detail:
            "Hospital-grade disinfectants and cross-contamination prevention protocols.",
        },
        {
          title: "HIPAA Respect",
          detail:
            "Professionals trained to operate in sensitive patient-facing environments.",
        },
      ],
      steps: [
        "Risk Audit: We identify critical sanitization zones within your clinic.",
        "Sterilization Clean: Execution of healthcare-compliant protocols.",
        "Compliance Log: Documentation of service for your facility records.",
      ],
    },
    seo: {
      title:
        "Medical Office Cleaning Los Angeles | Healthcare Facility Janitorial",
      description:
        "Specialized cleaning for clinics, dental offices, and medical labs in LA. Focus on infection control and compliance.",
      canonical: "https://playacleaning.com/services/medical-offices-cleaning",
      keywords:
        "medical office cleaning, healthcare cleaning, dental office janitorial, clinic cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Healthcare-Compliant Medical Cleaning | Los Angeles",
        "og:description":
          "Sterile, safe, and professional cleaning for LA clinics and dental offices.",
        "og:type": "website",
        "og:image": "/images/og/medical-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/medical-offices-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Medical Office Cleaning",
        description:
          "Infection-control focused cleaning for medical and dental facilities.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "post-construction-commercial",
    page: "Commercial Post Construction",
    intent: "B2B/Transactional",
    content: {
      h1: "Commercial Post-Construction Cleanup",
      subheading: "Ready your commercial space for opening day.",
      introText:
        "From retail build-outs to office renovations, we handle the massive cleanup required to turn a construction site into a professional business.",
      mainFeatures: [
        {
          title: "White-Glove Detail",
          detail:
            "Polishing all fixtures, glass, and surfaces to a showroom-ready state.",
        },
        {
          title: "Debris & Dust Removal",
          detail:
            "Comprehensive clearing of construction residue and airborne particulates.",
        },
      ],
      steps: [
        "Rough Clean: Removal of larger debris and initial dust sweep.",
        "Detail Prep: Deep cleaning of all built-ins, HVAC vents, and tracks.",
        "Final Polish: Ensuring every inch is perfect for the grand opening.",
      ],
    },
    seo: {
      title: "Commercial Post-Construction Cleaning LA | Build-out Cleanup",
      description:
        "Expert post-construction cleaning for commercial properties and retail in LA. Get your business ready for opening day.",
      canonical:
        "https://playacleaning.com/services/post-construction-commercial",
      keywords:
        "commercial post construction, retail build out cleaning, contractor cleanup, office remodel cleaning",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Commercial Post-Construction Cleaning | Playa Cleaning",
        "og:description":
          "Turn your construction site into a showroom. Professional cleanup for LA businesses.",
        "og:type": "website",
        "og:image": "/images/og/commercial-post-con.jpg",
        "og:url":
          "https://playacleaning.com/services/post-construction-commercial",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Commercial Post-Construction Cleaning",
        description:
          "Final detailing and dust removal for commercial renovations.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },

  // ==========================================
  // OTHER CLEANING SERVICES
  // ==========================================
  {
    slug: "kitchen-cleaning",
    page: "Kitchen Cleaning Service",
    intent: "Add-on",
    content: {
      h1: "Professional Kitchen Detailing",
      subheading: "The heart of your home, perfectly sanitized.",
      introText:
        "A focused service designed to deep-clean the most used room in your house. We tackle grease, burnt-on food, and hidden grime.",
      mainFeatures: [
        {
          title: "Deep Degreasing",
          detail: "Removal of grease buildup from vent hoods and backsplashes.",
        },
        {
          title: "Appliance Detailing",
          detail:
            "Intensive exterior cleaning and polishing of all kitchen appliances.",
        },
      ],
      steps: [
        "Degrease Assessment: We identify areas of heavy residue.",
        "Active Scrub: Targeted cleaning of stove tops, vents, and surfaces.",
        "Sanitary Polish: Final disinfection for a safe cooking environment.",
      ],
    },
    seo: {
      title: "Kitchen Cleaning Services LA | Professional Kitchen Detailing",
      description:
        "Deep clean your kitchen with our specialized detailing. Focus on grease removal and total sanitization in LA.",
      canonical: "https://playacleaning.com/services/kitchen-cleaning",
      keywords:
        "kitchen cleaning, stove cleaning, professional kitchen scrub, degreasing service",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Professional Kitchen Detailing | Playa Cleaning",
        "og:description":
          "Deep-clean your most used room. Meticulous grease removal and sanitization.",
        "og:type": "website",
        "og:image": "/images/og/kitchen-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/kitchen-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Kitchen Cleaning Service",
        description:
          "Focused deep cleaning and degreasing for residential kitchens.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "bathroom-cleaning",
    page: "Bathroom Cleaning Service",
    intent: "Add-on",
    content: {
      h1: "Bathroom Sanitization & Detailing",
      subheading: "Hospital-grade hygiene for your personal spa.",
      introText:
        "We eliminate soap scum, mold, and bacteria to restore your bathroom to a pristine, hygienic state. Pure sanitization.",
      mainFeatures: [
        {
          title: "Grout Scrubbing",
          detail: "Manual removal of mold and discoloration from tile lines.",
        },
        {
          title: "Hard Water Removal",
          detail: "Specialized treatment for glass doors and chrome fixtures.",
        },
      ],
      steps: [
        "Surface Soak: We pre-treat mold and soap scum zones.",
        "Manual Scrub: Detailed agitation of grout and fixtures.",
        "Total Sanitization: Hospital-grade disinfection for a fresh finish.",
      ],
    },
    seo: {
      title: "Bathroom Cleaning Service Los Angeles | Deep Scrub",
      description:
        "Intensive bathroom cleaning in LA. Remove mold, soap scum, and hard water stains from your shower and tile.",
      canonical: "https://playacleaning.com/services/bathroom-cleaning",
      keywords:
        "bathroom cleaning, shower scrub, toilet sanitization, grout cleaning LA",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Professional Bathroom Sanitization | Los Angeles",
        "og:description":
          "Deep-clean your bathroom. We tackle the grout and soap scum you hate cleaning.",
        "og:type": "website",
        "og:image": "/images/og/bathroom-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/bathroom-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Bathroom Cleaning Service",
        description:
          "Intensive residential bathroom sanitization and scrubbing.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
  {
    slug: "oven-cleaning",
    page: "Oven Cleaning Service",
    intent: "Micro-Transactional",
    content: {
      h1: "Deep Oven Detailing Service",
      subheading: "Restore your oven to showroom condition.",
      introText:
        "Our specialized process removes burnt-on carbon and grease without the harsh chemical smells of self-cleaning cycles.",
      mainFeatures: [
        {
          title: "Carbon Removal",
          detail:
            "Eco-friendly, intensive cleaning of racks, glass, and interior walls.",
        },
        {
          title: "Safe & Odorless",
          detail:
            "Non-toxic process so you can cook immediately after we finish.",
        },
      ],
      steps: [
        "Internal Soak: Loosening carbon buildup with specialized agents.",
        "Manual Detail: Scraping and scrubbing the interior and glass door.",
        "Polish: Wiping down the exterior to a streak-free shine.",
      ],
    },
    seo: {
      title: "Professional Oven Cleaning Los Angeles | Playa Cleaning",
      description:
        "Specialized oven cleaning in LA. Get rid of smoke and grease smells with a professional deep scrub. Safe and odorless.",
      canonical: "https://playacleaning.com/services/oven-cleaning",
      keywords:
        "oven cleaning service, clean my oven, stove cleaning LA, grease removal",
      robots: "index, follow",
      faqs: [],
      og_data: {
        "og:title": "Deep Oven Detailing | Playa Cleaning Los Angeles",
        "og:description":
          "Carbon removal and deep scrubbing for your oven. Non-toxic and odorless.",
        "og:type": "website",
        "og:image": "/images/og/oven-cleaning.jpg",
        "og:url": "https://playacleaning.com/services/oven-cleaning",
      },
      ld_json: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Oven Cleaning Service",
        description:
          "Specialized deep cleaning for residential ovens and stoves.",
        provider: { "@type": "LocalBusiness", name: "Playa Cleaning" },
        areaServed: [
          "Santa Monica",
          "Venice",
          "Playa Vista",
          "Culver City",
          "West LA",
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },
]
