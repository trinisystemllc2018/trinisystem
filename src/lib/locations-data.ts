// ─────────────────────────────────────────────────────────────────
// LOCATION PAGES DATA
// Honest framing: Trini System LLC is HQ'd in Corona, Queens, NY and
// dispatches through a nationwide network of independent field
// technicians. These pages do NOT claim a local office/address in
// each city — only that a technician from the network can be
// matched to that metro area, plus instant remote support from HQ.
// ─────────────────────────────────────────────────────────────────

export interface LocationPage {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West";
  timezone: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  brandsInDemand: string[]; // top brands searched/serviced in that metro (generic, honest)
  neighborhoods: string[]; // real, publicly known neighborhoods/areas — for local relevance, not fabricated claims
}

export const LOCATIONS: LocationPage[] = [
  {
    slug: "atlanta",
    city: "Atlanta",
    state: "Georgia",
    stateAbbr: "GA",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Atlanta — Local Technician Network",
    metaDescription:
      "Printer repair in Atlanta via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Trini System matches Atlanta customers with a technician from our nationwide independent network, or fixes most printer issues remotely in minutes — often faster than waiting for a local shop appointment.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Midtown", "Buckhead", "Decatur", "Sandy Springs", "Marietta"],
  },
  {
    slug: "chicago",
    city: "Chicago",
    state: "Illinois",
    stateAbbr: "IL",
    region: "Midwest",
    timezone: "Central",
    metaTitle: "Printer Repair Chicago — Local Technician Network",
    metaDescription:
      "Printer repair in Chicago via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Chicago customers get matched with a technician from our nationwide network, or connect instantly with a remote specialist from HQ for most printer errors — no waiting on a shop drop-off.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Loop", "Lincoln Park", "Wicker Park", "Evanston", "Naperville"],
  },
  {
    slug: "houston",
    city: "Houston",
    state: "Texas",
    stateAbbr: "TX",
    region: "Southwest",
    timezone: "Central",
    metaTitle: "Printer Repair Houston — Local Technician Network",
    metaDescription:
      "Printer repair in Houston via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Houston customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "The Heights", "Katy", "Sugar Land", "Pearland"],
  },
  {
    slug: "phoenix",
    city: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    region: "Southwest",
    timezone: "Mountain",
    metaTitle: "Printer Repair Phoenix — Local Technician Network",
    metaDescription:
      "Printer repair in Phoenix via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Phoenix customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler"],
  },
  {
    slug: "philadelphia",
    city: "Philadelphia",
    state: "Pennsylvania",
    stateAbbr: "PA",
    region: "Northeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Philadelphia — Local Technician Network",
    metaDescription:
      "Printer repair in Philadelphia via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Philadelphia customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Center City", "Fishtown", "Manayunk", "King of Prussia", "Cherry Hill"],
  },
  {
    slug: "san-antonio",
    city: "San Antonio",
    state: "Texas",
    stateAbbr: "TX",
    region: "Southwest",
    timezone: "Central",
    metaTitle: "Printer Repair San Antonio — Local Technician Network",
    metaDescription:
      "Printer repair in San Antonio via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "San Antonio customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Alamo Heights", "Stone Oak", "Boerne", "New Braunfels"],
  },
  {
    slug: "san-diego",
    city: "San Diego",
    state: "California",
    stateAbbr: "CA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair San Diego — Local Technician Network",
    metaDescription:
      "Printer repair in San Diego via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "San Diego customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "La Jolla", "Chula Vista", "Encinitas", "Carlsbad"],
  },
  {
    slug: "dallas",
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    region: "Southwest",
    timezone: "Central",
    metaTitle: "Printer Repair Dallas — Local Technician Network",
    metaDescription:
      "Printer repair in Dallas via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Dallas customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Uptown", "Plano", "Frisco", "Irving"],
  },
  {
    slug: "austin",
    city: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    region: "Southwest",
    timezone: "Central",
    metaTitle: "Printer Repair Austin — Local Technician Network",
    metaDescription:
      "Printer repair in Austin via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Austin customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "South Congress", "Round Rock", "Cedar Park", "Georgetown"],
  },
  {
    slug: "miami",
    city: "Miami",
    state: "Florida",
    stateAbbr: "FL",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Miami — Local Technician Network",
    metaDescription:
      "Printer repair in Miami via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Miami customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Brickell", "Coral Gables", "Doral", "Kendall"],
  },
  {
    slug: "seattle",
    city: "Seattle",
    state: "Washington",
    stateAbbr: "WA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair Seattle — Local Technician Network",
    metaDescription:
      "Printer repair in Seattle via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Seattle customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Capitol Hill", "Bellevue", "Redmond", "Tacoma"],
  },
  {
    slug: "denver",
    city: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    region: "West",
    timezone: "Mountain",
    metaTitle: "Printer Repair Denver — Local Technician Network",
    metaDescription:
      "Printer repair in Denver via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Denver customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Cherry Creek", "Aurora", "Lakewood", "Boulder"],
  },
  {
    slug: "boston",
    city: "Boston",
    state: "Massachusetts",
    stateAbbr: "MA",
    region: "Northeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Boston — Local Technician Network",
    metaDescription:
      "Printer repair in Boston via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Boston customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Cambridge", "Somerville", "Newton", "Quincy"],
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    state: "California",
    stateAbbr: "CA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair Los Angeles — Local Technician Network",
    metaDescription:
      "Printer repair in Los Angeles via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Los Angeles customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown LA", "Santa Monica", "Pasadena", "Long Beach", "Burbank"],
  },
  {
    slug: "new-york",
    city: "New York",
    state: "New York",
    stateAbbr: "NY",
    region: "Northeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair New York — Local Technician Network",
    metaDescription:
      "Printer repair in New York via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "New York customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"],
  },
  {
    slug: "san-jose",
    city: "San Jose",
    state: "California",
    stateAbbr: "CA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair San Jose — Local Technician Network",
    metaDescription:
      "Printer repair in San Jose via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "San Jose customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown San Jose", "Santa Clara", "Sunnyvale", "Cupertino", "Milpitas"],
  },
  {
    slug: "jacksonville",
    city: "Jacksonville",
    state: "Florida",
    stateAbbr: "FL",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Jacksonville — Local Technician Network",
    metaDescription:
      "Printer repair in Jacksonville via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Jacksonville customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Riverside", "San Marco", "Orange Park", "Ponte Vedra"],
  },
  {
    slug: "fort-worth",
    city: "Fort Worth",
    state: "Texas",
    stateAbbr: "TX",
    region: "Southwest",
    timezone: "Central",
    metaTitle: "Printer Repair Fort Worth — Local Technician Network",
    metaDescription:
      "Printer repair in Fort Worth via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Fort Worth customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Sundance Square", "Arlington", "Southlake", "Keller"],
  },
  {
    slug: "columbus",
    city: "Columbus",
    state: "Ohio",
    stateAbbr: "OH",
    region: "Midwest",
    timezone: "Eastern",
    metaTitle: "Printer Repair Columbus — Local Technician Network",
    metaDescription:
      "Printer repair in Columbus via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Columbus customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Dublin", "Westerville", "Grove City", "Hilliard"],
  },
  {
    slug: "charlotte",
    city: "Charlotte",
    state: "North Carolina",
    stateAbbr: "NC",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Charlotte — Local Technician Network",
    metaDescription:
      "Printer repair in Charlotte via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Charlotte customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Uptown", "South End", "Ballantyne", "Huntersville", "Concord"],
  },
  {
    slug: "indianapolis",
    city: "Indianapolis",
    state: "Indiana",
    stateAbbr: "IN",
    region: "Midwest",
    timezone: "Eastern",
    metaTitle: "Printer Repair Indianapolis — Local Technician Network",
    metaDescription:
      "Printer repair in Indianapolis via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Indianapolis customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Broad Ripple", "Carmel", "Fishers", "Greenwood"],
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    state: "California",
    stateAbbr: "CA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair San Francisco — Local Technician Network",
    metaDescription:
      "Printer repair in San Francisco via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "San Francisco customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown/SoMa", "Mission District", "Sunset District", "Oakland", "Berkeley"],
  },
  {
    slug: "washington-dc",
    city: "Washington",
    state: "District of Columbia",
    stateAbbr: "DC",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Washington — Local Technician Network",
    metaDescription:
      "Printer repair in Washington via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Washington customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown DC", "Georgetown", "Capitol Hill", "Arlington VA", "Alexandria VA"],
  },
  {
    slug: "nashville",
    city: "Nashville",
    state: "Tennessee",
    stateAbbr: "TN",
    region: "Southeast",
    timezone: "Central",
    metaTitle: "Printer Repair Nashville — Local Technician Network",
    metaDescription:
      "Printer repair in Nashville via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Nashville customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Music Row", "Franklin", "Brentwood", "Murfreesboro"],
  },
  {
    slug: "memphis",
    city: "Memphis",
    state: "Tennessee",
    stateAbbr: "TN",
    region: "Southeast",
    timezone: "Central",
    metaTitle: "Printer Repair Memphis — Local Technician Network",
    metaDescription:
      "Printer repair in Memphis via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Memphis customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Midtown", "Germantown", "Collierville", "Cordova"],
  },
  {
    slug: "portland",
    city: "Portland",
    state: "Oregon",
    stateAbbr: "OR",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair Portland — Local Technician Network",
    metaDescription:
      "Printer repair in Portland via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Portland customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Pearl District", "Beaverton", "Hillsboro", "Gresham"],
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    state: "Nevada",
    stateAbbr: "NV",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair Las Vegas — Local Technician Network",
    metaDescription:
      "Printer repair in Las Vegas via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Las Vegas customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["The Strip", "Downtown", "Henderson", "Summerlin", "North Las Vegas"],
  },
  {
    slug: "tampa",
    city: "Tampa",
    state: "Florida",
    stateAbbr: "FL",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Tampa — Local Technician Network",
    metaDescription:
      "Printer repair in Tampa via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Tampa customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Ybor City", "Brandon", "Clearwater", "St. Petersburg"],
  },
  {
    slug: "orlando",
    city: "Orlando",
    state: "Florida",
    stateAbbr: "FL",
    region: "Southeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Orlando — Local Technician Network",
    metaDescription:
      "Printer repair in Orlando via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Orlando customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Winter Park", "Lake Nona", "Kissimmee", "Altamonte Springs"],
  },
  {
    slug: "minneapolis",
    city: "Minneapolis",
    state: "Minnesota",
    stateAbbr: "MN",
    region: "Midwest",
    timezone: "Central",
    metaTitle: "Printer Repair Minneapolis — Local Technician Network",
    metaDescription:
      "Printer repair in Minneapolis via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Minneapolis customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Uptown", "St. Paul", "Bloomington", "Edina"],
  },
  {
    slug: "cleveland",
    city: "Cleveland",
    state: "Ohio",
    stateAbbr: "OH",
    region: "Midwest",
    timezone: "Eastern",
    metaTitle: "Printer Repair Cleveland — Local Technician Network",
    metaDescription:
      "Printer repair in Cleveland via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Cleveland customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Ohio City", "Lakewood", "Shaker Heights", "Parma"],
  },
  {
    slug: "detroit",
    city: "Detroit",
    state: "Michigan",
    stateAbbr: "MI",
    region: "Midwest",
    timezone: "Eastern",
    metaTitle: "Printer Repair Detroit — Local Technician Network",
    metaDescription:
      "Printer repair in Detroit via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Detroit customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Midtown", "Dearborn", "Royal Oak", "Ann Arbor"],
  },
  {
    slug: "sacramento",
    city: "Sacramento",
    state: "California",
    stateAbbr: "CA",
    region: "West",
    timezone: "Pacific",
    metaTitle: "Printer Repair Sacramento — Local Technician Network",
    metaDescription:
      "Printer repair in Sacramento via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Sacramento customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Midtown", "Elk Grove", "Roseville", "Folsom"],
  },
  {
    slug: "kansas-city",
    city: "Kansas City",
    state: "Missouri",
    stateAbbr: "MO",
    region: "Midwest",
    timezone: "Central",
    metaTitle: "Printer Repair Kansas City — Local Technician Network",
    metaDescription:
      "Printer repair in Kansas City via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Kansas City customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Country Club Plaza", "Overland Park", "Lee's Summit", "Independence"],
  },
  {
    slug: "pittsburgh",
    city: "Pittsburgh",
    state: "Pennsylvania",
    stateAbbr: "PA",
    region: "Northeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Pittsburgh — Local Technician Network",
    metaDescription:
      "Printer repair in Pittsburgh via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Pittsburgh customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Shadyside", "Oakland", "Cranberry Township", "Mount Lebanon"],
  },
  {
    slug: "st-louis",
    city: "St. Louis",
    state: "Missouri",
    stateAbbr: "MO",
    region: "Midwest",
    timezone: "Central",
    metaTitle: "Printer Repair St. Louis — Local Technician Network",
    metaDescription:
      "Printer repair in St. Louis via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "St. Louis customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Central West End", "Clayton", "Chesterfield", "Kirkwood"],
  },
  {
    slug: "cincinnati",
    city: "Cincinnati",
    state: "Ohio",
    stateAbbr: "OH",
    region: "Midwest",
    timezone: "Eastern",
    metaTitle: "Printer Repair Cincinnati — Local Technician Network",
    metaDescription:
      "Printer repair in Cincinnati via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Cincinnati customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Over-the-Rhine", "Mason", "West Chester", "Blue Ash"],
  },
  {
    slug: "baltimore",
    city: "Baltimore",
    state: "Maryland",
    stateAbbr: "MD",
    region: "Northeast",
    timezone: "Eastern",
    metaTitle: "Printer Repair Baltimore — Local Technician Network",
    metaDescription:
      "Printer repair in Baltimore via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Baltimore customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown/Inner Harbor", "Fells Point", "Towson", "Columbia", "Annapolis"],
  },
  {
    slug: "milwaukee",
    city: "Milwaukee",
    state: "Wisconsin",
    stateAbbr: "WI",
    region: "Midwest",
    timezone: "Central",
    metaTitle: "Printer Repair Milwaukee — Local Technician Network",
    metaDescription:
      "Printer repair in Milwaukee via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Milwaukee customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Bay View", "Wauwatosa", "Brookfield", "West Allis"],
  },
  {
    slug: "albuquerque",
    city: "Albuquerque",
    state: "New Mexico",
    stateAbbr: "NM",
    region: "Southwest",
    timezone: "Mountain",
    metaTitle: "Printer Repair Albuquerque — Local Technician Network",
    metaDescription:
      "Printer repair in Albuquerque via our nationwide independent technician network, plus instant remote fixes from HQ. HP, Canon, Epson, Brother. From $49. Call 347-953-1531.",
    intro:
      "Albuquerque customers can be matched with a technician from our nationwide network, or get most printer issues resolved remotely from HQ the same day.",
    brandsInDemand: ["HP", "Canon", "Epson", "Brother"],
    neighborhoods: ["Downtown", "Nob Hill", "Rio Rancho", "Los Ranchos", "Corrales"],
  },
];

export const ALL_LOCATION_SLUGS = LOCATIONS.map((l) => l.slug);

export function getLocation(slug: string): LocationPage | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
