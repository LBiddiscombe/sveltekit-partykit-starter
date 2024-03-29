const adjectives = [
  "Tiny", "Small", "Miniature", "Compact", "Little", "Petite", "Minuscule",
  "Narrow", "Thin", "Short", "Microscopic", "Diminutive", "Teeny", "Mini",
  "Puny", "Bijou", "Lilliputian", "Bitty", "Pocket", "Cramped", "Medium",
  "Moderate", "Midsize", "Average", "Standard", "Big", "Large", "Huge",
  "Massive", "Gigantic", "Enormous", "Colossal", "Immense", "Giant",
  "Monumental", "Bulky", "Substantial", "Vast", "Mammoth", "Titanic",
  "Gargantuan", "Leviathan", "Jumbo", "Elephantine", "Mountainous",
  "Monstrous", "Towering", "Astronomical", "Oversized", "Grand", "Expansive",
  "Spacious", "Capacious", "Voluminous", "Ample", "Generous", "Roomy",
  "Broad", "Wide", "Thick", "Stout", "Quick", "Swift", "Speedy", "Fast",
  "Rapid", "Brisk", "Fleeting", "Hurried", "Hasty", "Snappy", "Lightning",
  "Thunderous", "Whirlwind", "Zippy", "Blazing", "Torrential", "Rocketing",
  "Jet", "Bullet", "Sonic", "Turbo", "Supersonic", "Flash", "Warp",
  "Accelerated", "Express", "Instant", "Nimble", "Agile", "Sprightly", "Spry",
  "Sudden", "Meteoric", "Fleeting", "Darting", "Galloping", "Soaring", "Racing", "Zooming"
];

const fishes = [
  "Bass", "Bluegill", "Crappie", "Trout", "Catfish", "Carp", "Pike",
  "Walleye", "Perch", "Sunfish", "Char", "Sturgeon", "Gar", "Bowfin",
  "Burbot", "Whitefish", "Drum", "Sauger", "Tilapia", "Wels", "Zander",
  "Roach", "Rudd", "Bream", "Tench", "Chub", "Dace", "Barbel", "Gudgeon",
  "Eel", "Koi", "Goldfish", "Grayling", "Mahseer", "Snakehead", "Tambaqui",
  "Pacu", "Piranha", "Gourami", "Betta", "Guppy", "Molly", "Platy", "Swordtail",
  "Tetra", "Danio", "Loach", "Arowana", "Angelfish", "Oscar", "Pleco", "Shiner",
  "Minnow", "Barbs", "Cichlid", "Discus", "Rasbora", "Killifish", "Lamprey",
  "Lungfish", "Mudfish", "Puffer", "Bichir", "Clownfish", "Darter", "Eleotris",
  "Flounder", "Goby", "Herring", "Ide", "Jewel", "Knifefish", "Labeo",
  "Mackerel", "Neon", "Oscar", "Piranha", "Queenfish", "Rainbowfish", "Salmon",
  "Tinfoil", "Uaru", "Vampirefish", "Wimple", "Xenopoecilus", "Yellowfish", "Zebrafish",
  "Archerfish", "Banjo", "Climbing", "Dragonfish", "Eeltail", "Flagtail", "Glassfish",
  "Hatchetfish", "Iridescent", "Jawfish", "Knifefish", "LeafFish"
];

export function randomInt(min: number, max: number) {
  //The minimum is inclusive and the maximum is exclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomArrayItem(arr: any[] = []) {
  const ensuredArray = arr instanceof Array ? arr : [arr]
  return ensuredArray[randomInt(0, ensuredArray.length)]
}

export function getName() {
  return `${randomArrayItem(adjectives)} ${randomArrayItem(fishes)}`;
}

export function getCode() {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}