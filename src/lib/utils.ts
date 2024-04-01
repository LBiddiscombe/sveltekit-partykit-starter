// prettier-ignore
const adjectives = ['Able', 'Aching', 'Acidic', 'Active', 'Actual', 'Adept', 'Adored', 'Afraid', 'Aged', 'Agile', 'Ajar', 'Alert', 'Alive', 'All',
  'Ample', 'Amused', 'Angry', 'Annual', 'Any', 'Apt', 'Arctic', 'Arid', 'Aware', 'Awful', 'Bad', 'Back', 'Baggy', 'Bare', 'Barren', 'Basic', 'Better',
  'Best', 'Big', 'Bitter', 'Black', 'Bland', 'Blank', 'Bleak', 'Blind', 'Blond', 'Blue', 'Bogus', 'Bold', 'Bony', 'Boring', 'Bossy', 'Both', 'Bouncy',
  'Bowed', 'Brave', 'Brief', 'Bright', 'Brisk', 'Broken', 'Bronze', 'Brown', 'Bubbly', 'Bulky', 'Bumpy', 'Burly', 'Busy', 'Calm', 'Candid', 'Canine',
  'Caring', 'Cheap', 'Cheery', 'Chief', 'Chilly', 'Chubby', 'Clean', 'Clear', 'Clever', 'Close', 'Closed', 'Cloudy', 'Clumsy', 'Coarse', 'Cold', 'Common',
  'Cooked', 'Cool', 'Corny', 'Costly', 'Crafty', 'Crazy', 'Creamy', 'Creepy', 'Crisp', 'Cruel', 'Cuddly', 'Curly', 'Curvy', 'Cute', 'Damp', 'Dapper',
  'Daring', 'Dark', 'Dead', 'Deadly', 'Dear', 'Decent', 'Dense', 'Dental', 'Dim', 'Direct', 'Dismal', 'Dreary', 'Dirty', 'Dismal', 'Dizzy', 'Dopey',
  'Doting', 'Double', 'Drab', 'Drafty', 'Dreary', 'Droopy', 'Dry', 'Dual', 'Dull', 'Each', 'Eager', 'Early', 'Easy', 'Edible', 'Elated', 'Empty', 'Entire',
  'Equal', 'Even', 'Every', 'Evil', 'Exotic', 'Expert', 'Faint', 'Fair', 'Fake', 'False', 'Famous', 'Fancy', 'Far', 'Fast', 'Fat', 'Fatal', 'Feisty',
  'Feline', 'Few', 'Fickle', 'Filthy', 'Fine', 'Firm', 'First', 'Fixed', 'Flaky', 'Flashy', 'Flat', 'Flawed', 'Flimsy', 'Fluffy', 'Fluid', 'Fond', 'Forked',
  'Formal', 'Frail', 'Frank', 'Frayed', 'Free', 'French', 'Fresh', 'Frigid', 'Frilly', 'Frizzy', 'Front', 'Frosty', 'Frozen', 'Frugal', 'Full', 'Funny',
  'Fussy', 'Fuzzy', 'Gentle', 'Giant', 'Giddy', 'Gifted', 'Giving', 'Glass', 'Gloomy', 'Glossy', 'Glum', 'Golden', 'Good', 'Grand', 'Grave', 'Gray', 'Great',
  'Greedy', 'Green', 'Grim', 'Grimy', 'Gross', 'Grown', 'Grubby', 'Grumpy', 'Guilty', 'Gummy', 'Hairy', 'Half', 'Handy', 'Happy', 'Hard', 'Harsh', 'Hasty',
  'Hearty', 'Heavy', 'Hefty', 'Hidden', 'High', 'Hoarse', 'Hollow', 'Homely', 'Honest', 'Hot', 'Huge', 'Humble', 'Hungry', 'Husky', 'Icky', 'Icy', 'Ideal',
  'Idle', 'Ill', 'Impish', 'Impure', 'Inborn', 'Intent', 'Itchy', 'Jaded', 'Jagged', 'Jaunty', 'Joint', 'Jolly', 'Jovial', 'Joyful', 'Joyous', 'Juicy',
  'Jumbo', 'Junior', 'Jumpy', 'Keen', 'Key', 'Kind', 'Kindly', 'Klutzy', 'Knobby', 'Knotty', 'Known', 'Kooky', 'Lame', 'Lanky', 'Large', 'Last', 'Late',
  'Lavish', 'Lawful', 'Lazy', 'Lean', 'Leafy', 'Left', 'Legal', 'Light', 'Likely', 'Limp', 'Linear', 'Lined', 'Liquid', 'Little', 'Live', 'Lively', 'Livid',
  'Lone', 'Lonely', 'Long', 'Loose', 'Lost', 'Loud', 'Lovely', 'Loving', 'Low', 'Loyal', 'Lucky', 'Lumpy', 'Mad', 'Major', 'Mature', 'Meager', 'Mealy',
  'Mean', 'Measly', 'Meaty', 'Medium', 'Meek', 'Mellow', 'Merry', 'Messy', 'Mild', 'Milky', 'Minor', 'Minty', 'Misty', 'Mixed', 'Modern', 'Modest', 'Moral',
  'Muddy', 'Murky', 'Mushy', 'Musty', 'Muted', 'Naive', 'Narrow', 'Nasty', 'Near', 'Neat', 'Needy', 'New', 'Next', 'Nice', 'Nifty', 'Nimble', 'Nippy', 'Noisy',
  'Normal', 'Noted', 'Novel', 'Numb', 'Nutty', 'Obese', 'Oblong', 'Oily', 'Oblong', 'Odd', 'Old', 'Only', 'Open', 'Orange', 'Ornate', 'Ornery', 'Other', 'Our',
  'Oval', 'Pale', 'Paltry', 'Past', 'Pastel', 'Perky', 'Pesky', 'Petty', 'Phony', 'Pink', 'Plain', 'Plump', 'Plush', 'Polite', 'Poised', 'Poor', 'Portly',
  'Posh', 'Pretty', 'Pricey', 'Prime', 'Prize', 'Proper', 'Proud', 'Puny', 'Pure', 'Purple', 'Pushy', 'Putrid', 'Quaint', 'Queasy', 'Quick', 'Quiet', 'Quirky',
  'Ragged', 'Rapid', 'Rare', 'Rash', 'Raw', 'Recent', 'Ready', 'Real', 'Red', 'Regal', 'Remote', 'Rich', 'Rigid', 'Right', 'Ringed', 'Ripe', 'Robust', 'Rosy',
  'Rotten', 'Rough', 'Round', 'Rowdy', 'Royal', 'Ruddy', 'Rude', 'Runny', 'Rural', 'Rusty', 'Sad', 'Safe', 'Salty', 'Same', 'Sandy', 'Sane', 'Scaly', 'Scarce',
  'Scared', 'Scary', 'Second', 'Secret', 'Serene', 'Severe', 'Shabby', 'Shady', 'Sharp', 'Shiny', 'Shoddy', 'Short', 'Showy', 'Shrill', 'Shy', 'Sick', 'Silent',
  'Silky', 'Silly', 'Silver', 'Simple', 'Sinful', 'Single', 'Skinny', 'Sleepy', 'Slight', 'Slim', 'Slimy', 'Slow', 'Slushy', 'Small', 'Smart', 'Smoggy',
  'Smooth', 'Smug', 'Snappy', 'Sneaky', 'Snoopy', 'Soft', 'Soggy', 'Solid', 'Somber', 'Some', 'Sore', 'Soupy', 'Sour', 'Sparse', 'Speedy', 'Spicy', 'Spiffy',
  'Spry', 'Square', 'Stable', 'Staid', 'Stale', 'Stark', 'Starry', 'Steep', 'Sticky', 'Stiff', 'Stingy', 'Stormy', 'Steel', 'Strict', 'Strong', 'Stupid',
  'Sturdy', 'Subtle', 'Sudden', 'Sugary', 'Sunny', 'Super', 'Superb', 'Svelte', 'Sweaty', 'Sweet', 'Swift', 'Tall', 'Tame', 'Tan', 'Tart', 'Tasty', 'Taut',
  'Tender', 'Tense', 'Tepid', 'Testy', 'Thick', 'Thin', 'Third', 'This', 'Thorny', 'Tidy', 'Tight', 'Timely', 'Tinted', 'Tiny', 'Tired', 'Torn', 'Total',
  'Tough', 'Tragic', 'Tricky', 'Trim', 'True', 'Trusty', 'Tubby', 'Twin', 'Ugly', 'Uneven', 'Unfit', 'Unique', 'United', 'Unripe', 'Unruly', 'Unsung',
  'Untidy', 'Untrue', 'Unused', 'Upbeat', 'Upset', 'Urban', 'Usable', 'Used', 'Useful', 'Utter', 'Vacant', 'Vague', 'Vain', 'Valid', 'Vapid', 'Vast', 'Violet',
  'Vital', 'Vivid', 'Wan', 'Warm', 'Warped', 'Wary', 'Watery', 'Wavy', 'Weak', 'Weary', 'Webbed', 'Wee', 'Weekly', 'Weepy', 'Weird', 'Wet', 'Which', 'White',
  'Whole', 'Wicked', 'Wide', 'Wiggly', 'Wild', 'Wilted', 'Windy', 'Winged', 'Wiry', 'Wise', 'Witty', 'Wobbly', 'Woeful', 'Wooden', 'Woozy', 'Wordy', 'Worn',
  'Worse', 'Worst', 'Worthy', 'Wrong', 'Wry', 'Yearly', 'Yellow', 'Young', 'Yummy', 'Zany', 'Zesty', 'Zigzag'
];

// prettier-ignore
const fishes = ['Salmon', 'Trout', 'Cod', 'Bass', 'Perch', 'Tuna', 'Haddock', 'Halibut', 'Sardine', 'Anchovy', 'Carp', 'Catfish', 'Mackerel', 'Snapper',
  'Tilapia', 'Flounder', 'Grouper', 'Herring', 'Mahi Mahi', 'Pike', 'Sole', 'Swordfish', 'Tarpon', 'Walleye', 'Wahoo', 'Whiting', 'Yellowtail', 'Bream',
  'Brill', 'Chub', 'Dab', 'Gar', 'Goby', 'Koi', 'Ling', 'Loach', 'Minnow', 'Mullet', 'Pomfret', 'Pompano', 'Roach', 'Rudd', 'Scad', 'Shad', 'Skate', 'Smelt',
  'Sprat', 'Sturgeon', 'Tench', 'Turbot', 'Urchin', 'Zander', 'Shark', 'Shrimp', 'Crab', 'Lobster', 'Oyster', 'Mussel', 'Clam', 'Octopus', 'Squid', 'Jellyfish',
  'Starfish', 'Sea Cucumber', 'Sea Urchin', 'Eel', 'Barracuda', 'Dolphin', 'Ray', 'Sea Bass', 'Scallop', 'Snail', 'Frog', 'Toad'
];

export function randomInt(min: number, max: number) {
  //The minimum is inclusive and the maximum is exclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArrayItem(arr: any[] = []) {
  const ensuredArray = arr instanceof Array ? arr : [arr];
  return ensuredArray[randomInt(0, ensuredArray.length)];
}

export function getName() {
  return `${randomArrayItem(adjectives)} ${randomArrayItem(fishes)}`;
}

export function getCode() {
  let result = '';
  const characters = 'BCDFGHJKLMNPQRSTVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
