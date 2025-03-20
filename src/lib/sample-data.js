// Beispieldaten für Pokémon-Karten
const sampleCards = [
  {
    card_id: 'swsh4-1',
    name: 'Weedle',
    supertype: 'Pokémon',
    subtypes: 'Basic',
    hp: '50',
    types: 'Grass',
    set_id: 'swsh4',
    number: '1',
    rarity: 'Common',
    image_small: 'https://images.pokemontcg.io/swsh4/1.png',
    image_large: 'https://images.pokemontcg.io/swsh4/1_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-1',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-1'
  },
  {
    card_id: 'swsh4-2',
    name: 'Kakuna',
    supertype: 'Pokémon',
    subtypes: 'Stage 1',
    hp: '80',
    types: 'Grass',
    evolves_from: 'Weedle',
    set_id: 'swsh4',
    number: '2',
    rarity: 'Uncommon',
    image_small: 'https://images.pokemontcg.io/swsh4/2.png',
    image_large: 'https://images.pokemontcg.io/swsh4/2_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-2',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-2'
  },
  {
    card_id: 'swsh4-3',
    name: 'Beedrill',
    supertype: 'Pokémon',
    subtypes: 'Stage 2',
    hp: '140',
    types: 'Grass',
    evolves_from: 'Kakuna',
    set_id: 'swsh4',
    number: '3',
    rarity: 'Rare',
    image_small: 'https://images.pokemontcg.io/swsh4/3.png',
    image_large: 'https://images.pokemontcg.io/swsh4/3_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-3',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-3'
  },
  {
    card_id: 'swsh4-4',
    name: 'Charmander',
    supertype: 'Pokémon',
    subtypes: 'Basic',
    hp: '70',
    types: 'Fire',
    set_id: 'swsh4',
    number: '4',
    rarity: 'Common',
    image_small: 'https://images.pokemontcg.io/swsh4/4.png',
    image_large: 'https://images.pokemontcg.io/swsh4/4_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-4',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-4'
  },
  {
    card_id: 'swsh4-5',
    name: 'Charmeleon',
    supertype: 'Pokémon',
    subtypes: 'Stage 1',
    hp: '90',
    types: 'Fire',
    evolves_from: 'Charmander',
    set_id: 'swsh4',
    number: '5',
    rarity: 'Uncommon',
    image_small: 'https://images.pokemontcg.io/swsh4/5.png',
    image_large: 'https://images.pokemontcg.io/swsh4/5_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-5',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-5'
  },
  {
    card_id: 'swsh4-6',
    name: 'Charizard',
    supertype: 'Pokémon',
    subtypes: 'Stage 2',
    hp: '170',
    types: 'Fire',
    evolves_from: 'Charmeleon',
    set_id: 'swsh4',
    number: '6',
    rarity: 'Rare Holo',
    image_small: 'https://images.pokemontcg.io/swsh4/6.png',
    image_large: 'https://images.pokemontcg.io/swsh4/6_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-6',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-6'
  },
  {
    card_id: 'swsh4-7',
    name: 'Squirtle',
    supertype: 'Pokémon',
    subtypes: 'Basic',
    hp: '60',
    types: 'Water',
    set_id: 'swsh4',
    number: '7',
    rarity: 'Common',
    image_small: 'https://images.pokemontcg.io/swsh4/7.png',
    image_large: 'https://images.pokemontcg.io/swsh4/7_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-7',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-7'
  },
  {
    card_id: 'swsh4-8',
    name: 'Wartortle',
    supertype: 'Pokémon',
    subtypes: 'Stage 1',
    hp: '90',
    types: 'Water',
    evolves_from: 'Squirtle',
    set_id: 'swsh4',
    number: '8',
    rarity: 'Uncommon',
    image_small: 'https://images.pokemontcg.io/swsh4/8.png',
    image_large: 'https://images.pokemontcg.io/swsh4/8_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-8',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-8'
  },
  {
    card_id: 'swsh4-9',
    name: 'Blastoise',
    supertype: 'Pokémon',
    subtypes: 'Stage 2',
    hp: '180',
    types: 'Water',
    evolves_from: 'Wartortle',
    set_id: 'swsh4',
    number: '9',
    rarity: 'Rare Holo',
    image_small: 'https://images.pokemontcg.io/swsh4/9.png',
    image_large: 'https://images.pokemontcg.io/swsh4/9_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-9',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-9'
  },
  {
    card_id: 'swsh4-25',
    name: 'Pikachu',
    supertype: 'Pokémon',
    subtypes: 'Basic',
    hp: '60',
    types: 'Lightning',
    set_id: 'swsh4',
    number: '25',
    rarity: 'Common',
    image_small: 'https://images.pokemontcg.io/swsh4/25.png',
    image_large: 'https://images.pokemontcg.io/swsh4/25_hires.png',
    tcgplayer_url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-25',
    cardmarket_url: 'https://prices.pokemontcg.io/cardmarket/swsh4-25'
  }
];

// Beispieldaten für Kartensets
const sampleSets = [
  {
    set_id: 'swsh4',
    name: 'Vivid Voltage',
    series: 'Sword & Shield',
    printed_total: 185,
    release_date: '2020/11/13',
    logo_url: 'https://images.pokemontcg.io/swsh4/logo.png',
    symbol_url: 'https://images.pokemontcg.io/swsh4/symbol.png'
  },
  {
    set_id: 'swsh3',
    name: 'Darkness Ablaze',
    series: 'Sword & Shield',
    printed_total: 189,
    release_date: '2020/08/14',
    logo_url: 'https://images.pokemontcg.io/swsh3/logo.png',
    symbol_url: 'https://images.pokemontcg.io/swsh3/symbol.png'
  },
  {
    set_id: 'swsh2',
    name: 'Rebel Clash',
    series: 'Sword & Shield',
    printed_total: 192,
    release_date: '2020/05/01',
    logo_url: 'https://images.pokemontcg.io/swsh2/logo.png',
    symbol_url: 'https://images.pokemontcg.io/swsh2/symbol.png'
  }
];

// Beispieldaten für Kartenpreise
const samplePrices = [
  {
    card_id: 'swsh4-6',
    platform_id: 1, // TCGPlayer
    price_date: '2025-03-20',
    price_low: 120.50,
    price_mid: 150.75,
    price_high: 200.00,
    price_market: 145.99,
    currency: 'USD'
  },
  {
    card_id: 'swsh4-6',
    platform_id: 2, // Cardmarket
    price_date: '2025-03-20',
    price_low: 110.00,
    price_mid: 140.50,
    price_high: 180.00,
    price_market: 135.75,
    currency: 'EUR'
  },
  {
    card_id: 'swsh4-9',
    platform_id: 1, // TCGPlayer
    price_date: '2025-03-20',
    price_low: 45.25,
    price_mid: 60.50,
    price_high: 85.00,
    price_market: 55.99,
    currency: 'USD'
  },
  {
    card_id: 'swsh4-9',
    platform_id: 2, // Cardmarket
    price_date: '2025-03-20',
    price_low: 40.00,
    price_mid: 55.50,
    price_high: 75.00,
    price_market: 52.25,
    currency: 'EUR'
  }
];

// Beispieldaten für Portfolio-Einträge
const samplePortfolioItems = [
  {
    user_id: 'user123',
    card_id: 'swsh4-6',
    quantity: 1,
    purchase_price: 130.00,
    purchase_date: '2024-12-15',
    purchase_platform_id: 2,
    condition: 'Near Mint',
    notes: 'Weihnachtsgeschenk'
  },
  {
    user_id: 'user123',
    card_id: 'swsh4-9',
    quantity: 2,
    purchase_price: 45.50,
    purchase_date: '2025-01-10',
    purchase_platform_id: 1,
    condition: 'Excellent',
    notes: 'Aus Booster Pack'
  },
  {
    user_id: 'user123',
    card_id: 'swsh4-25',
    quantity: 4,
    purchase_price: 0.50,
    purchase_date: '2025-02-05',
    purchase_platform_id: 2,
    condition: 'Good',
    notes: 'Sammlung vervollständigen'
  }
];

// SQL-Anweisungen zum Einfügen der Beispieldaten
const generateInsertStatements = () => {
  let sql = '';
  
  // Sets einfügen
  sampleSets.forEach(set => {
    sql += `INSERT INTO card_sets (set_id, name, series, printed_total, release_date, logo_url, symbol_url) VALUES ('${set.set_id}', '${set.name}', '${set.series}', ${set.printed_total}, '${set.release_date}', '${set.logo_url}', '${set.symbol_url}');\n`;
  });
  
  // Karten einfügen
  sampleCards.forEach(card => {
    sql += `INSERT INTO pokemon_cards (card_id, name, supertype, subtypes, hp, types, evolves_from, set_id, number, rarity, image_small, image_large, tcgplayer_url, cardmarket_url) VALUES ('${card.card_id}', '${card.name}', '${card.supertype}', '${card.subtypes}', '${card.hp}', '${card.types}', ${card.evolves_from ? `'${card.evolves_from}'` : 'NULL'}, '${card.set_id}', '${card.number}', '${card.rarity}', '${card.image_small}', '${card.image_large}', '${card.tcgplayer_url}', '${card.cardmarket_url}');\n`;
  });
  
  // Preise einfügen
  samplePrices.forEach(price => {
    sql += `INSERT INTO card_prices (card_id, platform_id, price_date, price_low, price_mid, price_high, price_market, currency) VALUES ('${price.card_id}', ${price.platform_id}, '${price.price_date}', ${price.price_low}, ${price.price_mid}, ${price.price_high}, ${price.price_market}, '${price.currency}');\n`;
  });
  
  // Portfolio-Einträge einfügen
  samplePortfolioItems.forEach(item => {
    sql += `INSERT INTO portfolio_items (user_id, card_id, quantity, purchase_price, purchase_date, purchase_platform_id, condition, notes) VALUES ('${item.user_id}', '${item.card_id}', ${item.quantity}, ${item.purchase_price}, '${item.purchase_date}', ${item.purchase_platform_id}, '${item.condition}', '${item.notes}');\n`;
  });
  
  return sql;
};

// SQL-Anweisungen generieren
console.log(generateInsertStatements());
