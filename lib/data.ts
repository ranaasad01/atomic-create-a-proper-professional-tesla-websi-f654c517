export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "nav.vehicles", href: "/vehicles", type: "route" },
  { label: "nav.energy", href: "/energy", type: "route" },
  { label: "nav.charging", href: "/charging", type: "route" },
  { label: "nav.about", href: "/about", type: "route" },
  { label: "nav.shop", href: "/shop", type: "route" },
  { label: "nav.autopilot", href: "/autopilot", type: "route" },
  { label: "nav.newsroom", href: "/newsroom", type: "route" },
  { label: "nav.investors", href: "/investors", type: "route" },
];

export const BRAND_NAME = "Tesla";
export const BRAND_TAGLINE = "Accelerating the world's transition to sustainable energy.";

export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  range: string;
  topSpeed: string;
  zeroToSixty: string;
  image: string;
  startingPrice: string;
  orderHref: string;
  configureHref: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "model-s",
    name: "Model S",
    tagline: "Plaid",
    range: "405 mi",
    topSpeed: "200 mph",
    zeroToSixty: "1.99s",
    image: "https://www.teslarati.com/wp-content/uploads/2024/05/model-s-logo.jpeg",
    startingPrice: "$74,990",
    orderHref: "#order",
    configureHref: "#configure",
  },
  {
    id: "model-3",
    name: "Model 3",
    tagline: "Long Range",
    range: "358 mi",
    topSpeed: "145 mph",
    zeroToSixty: "4.2s",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg",
    startingPrice: "$40,240",
    orderHref: "#order",
    configureHref: "#configure",
  },
  {
    id: "model-x",
    name: "Model X",
    tagline: "Plaid",
    range: "333 mi",
    topSpeed: "163 mph",
    zeroToSixty: "2.5s",
    image: "https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-x-185-690cc64d3dc62.jpg?crop=0.655xw:0.553xh;0.181xw,0.291xh&resize=2048:*",
    startingPrice: "$79,990",
    orderHref: "#order",
    configureHref: "#configure",
  },
  {
    id: "model-y",
    name: "Model Y",
    tagline: "Long Range AWD",
    range: "330 mi",
    topSpeed: "135 mph",
    zeroToSixty: "4.8s",
    image: "https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-y-long-range-awd-121-688bc237a2711.jpg?crop=0.615xw:0.519xh;0.0865xw,0.365xh&resize=2048:*",
    startingPrice: "$43,990",
    orderHref: "#order",
    configureHref: "#configure",
  },
  {
    id: "cybertruck",
    name: "Cybertruck",
    tagline: "All-Wheel Drive",
    range: "340 mi",
    topSpeed: "130 mph",
    zeroToSixty: "4.1s",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg",
    startingPrice: "$60,990",
    orderHref: "#order",
    configureHref: "#configure",
  },
  {
    id: "roadster",
    name: "Roadster",
    tagline: "Next Generation",
    range: "620 mi",
    topSpeed: "250+ mph",
    zeroToSixty: "1.9s",
    image: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/wp-content/uploads/2017/11/Tesla-Roadster-103.jpg",
    startingPrice: "$200,000",
    orderHref: "#order",
    configureHref: "#configure",
  },
];

export interface EnergyProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  learnHref: string;
  orderHref: string;
}

export const energyProducts: EnergyProduct[] = [
  {
    id: "powerwall",
    name: "Powerwall",
    tagline: "Home Battery",
    description:
      "Store solar energy for use any time — day or night. Powerwall detects outages and automatically becomes your home's main energy source.",
    image: "https://regenpower.com/wp-content/uploads/2021/08/tesla-scaled-1024x640.jpg",
    learnHref: "/energy#powerwall",
    orderHref: "#order",
  },
  {
    id: "solar-roof",
    name: "Solar Roof",
    tagline: "Integrated Solar Tiles",
    description:
      "Solar Roof tiles are more than three times stronger than standard roofing tiles and are engineered for all-weather protection.",
    image: "https://s3.amazonaws.com/arc-wordpress-client-uploads/evannex/wp-content/uploads/2019/09/09191911/tesla-solar-roof-v3-tiles-1400x700.jpg",
    learnHref: "/energy#solar-roof",
    orderHref: "#order",
  },
  {
    id: "solar-panels",
    name: "Solar Panels",
    tagline: "Lowest Cost Solar",
    description:
      "Generate clean energy from the sun with the most affordable solar panels on the market. Pair with Powerwall for 24/7 clean energy.",
    image: "https://electrek.co/wp-content/uploads/sites/3/2019/10/Tesla-solar-panels-hero.jpg",
    learnHref: "/energy#solar-panels",
    orderHref: "#order",
  },
];
