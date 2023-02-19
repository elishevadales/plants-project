const options = [
  {
    value: 'rakefet',
    label: 'rakefet',
  },
  {
    value: 'narkis',
    label: 'narkis',
  },
  {
    value: 'hamaniya',
    label: 'hamaniya',
  },
  {
    value: 'calanit',
    label: 'calanit',
  },
  {
    value: 'irus',
    label: 'irus',
  },
  {
    value: 'havalbal',
    label: 'havalbal',
  },
  {
    value: 'sitvanit',
    label: 'sitvanit',
  },
  {
    value: 'havazelet',
    label: 'havazelet',
  },
  {
    value: 'admonit',
    label: 'admonit',
  },
  {
    value: 'savyon',
    label: 'savyon',
  },
  {
    value: 'tayun',
    label: 'tayun',
  },
  {
    value: 'ashnan',
    label: 'ashnan',
  },
  { "value": "Snake Plant", "label": "Snake Plant" },
  { "value": "Spider Plant", "label": "Spider Plant" },
  { "value": "ZZ Plant", "label": "ZZ Plant" },
  { "value": "Monstera", "label": "Monstera" },
  { "value": "Pothos", "label": "Pothos" },
  { "value": "Fiddle Leaf Fig", "label": "Fiddle Leaf Fig" },
  { "value": "Succulent", "label": "Succulent" },
  { "value": "Peace Lily", "label": "Peace Lily" },
  { "value": "English Ivy", "label": "English Ivy" },
  { "value": "Rubber Plant", "label": "Rubber Plant" },
  { "value": "Chinese Evergreen", "label": "Chinese Evergreen" },
  { "value": "Aloe Vera", "label": "Aloe Vera" },
  { "value": "Philodendron", "label": "Philodendron" },
  { "value": "Boston Fern", "label": "Boston Fern" },
  { "value": "Bromeliad", "label": "Bromeliad" },
  { "value": "Jade Plant", "label": "Jade Plant" },
  { "value": "Bird's Nest Fern", "label": "Bird's Nest Fern" },
  { "value": "Schefflera", "label": "Schefflera" },
  { "value": "Devil's Ivy", "label": "Devil's Ivy" },
  { "value": "Cactus", "label": "Cactus" },
  { "value": "Agave", "label": "Agave" },
  { "value": "Air Plant", "label": "Air Plant" },
  { "value": "Areca Palm", "label": "Areca Palm" },
  { "value": "Arrowhead Plant", "label": "Arrowhead Plant" },
  { "value": "Baby Tears", "label": "Baby Tears" },
  { "value": "Bamboo Palm", "label": "Bamboo Palm" },
  { "value": "Begonia", "label": "Begonia" },
  { "value": "Bonsai", "label": "Bonsai" },
  { "value": "Calathea", "label": "Calathea" },
  { "value": "Camellia", "label": "Camellia" },
  { "value": "Cast Iron Plant", "label": "Cast Iron Plant" },
  { "value": "Chinese Money Plant", "label": "Chinese Money Plant" },
  { "value": "Chrysanthemum", "label": "Chrysanthemum" },
  { "value": "Cyclamen", "label": "Cyclamen" },
  { "value": "Dumb Cane", "label": "Dumb Cane" },
  { "value": "Elephant Ear", "label": "Elephant Ear" },
  { "value": "Fern", "label": "Fern" },
  { "value": "Flaming Katy", "label": "Flaming Katy" },
  { "value": "Gardenia", "label": "Gardenia" },
  { "value": "Geranium", "label": "Geranium" },
  { "value": "Golden Pothos", "label": "Golden Pothos" },
  { "value": "Grape Ivy", "label": "Grape Ivy" },
  { "value": "Hawaiian Schefflera", "label": "Hawaiian Schefflera" },
  { "value": "Heartleaf Philodendron", "label": "Heartleaf Philodendron" },
  { "value": "Hoya", "label": "Hoya" },
  { "value": "Jasmine", "label": "Jasmine" },
  { "value": "Kangaroo Paw", "label": "Kangaroo Paw" },
  { "value": "Lavender", "label": "Lavender" },
  { "value": "Lemon Balm", "label": "Lemon Balm" },
  { "value": "Lily", "label": "Lily" },
  { "value": "Lucky Bamboo", "label": "Lucky Bamboo" },
  { "value": "Maidenhair Fern", "label": "Maidenhair Fern" },
  { "value": "Majesty Palm", "label": "Majesty Palm" },
  { "value": "Marigold", "label": "Marigold" },
  { "value": "Mint", "label": "Mint" },
  { "value": "Mistletoe Cactus", "label": "Mistletoe Cactus" },
  { "value": "Nerve Plant", "label": "Nerve Plant" },{ "value": "Norfolk Island Pine", "label": "Norfolk Island Pine" },
  { "value": "Oxalis", "label": "Oxalis" },
  { "value": "Pachira Money Tree", "label": "Pachira Money Tree" },
  { "value": "Peace Lily", "label": "Peace Lily" },
  { "value": "Peperomia", "label": "Peperomia" },
  { "value": "Philodendron Brasil", "label": "Philodendron Brasil" },
  { "value": "Pilea", "label": "Pilea" },
  { "value": "Polka Dot Plant", "label": "Polka Dot Plant" },
  { "value": "Prayer Plant", "label": "Prayer Plant" },
  { "value": "Rattlesnake Plant", "label": "Rattlesnake Plant" },
  { "value": "Rubber Plant", "label": "Rubber Plant" },
  { "value": "Spider Plant", "label": "Spider Plant" },
  { "value": "Split-leaf Philodendron", "label": "Split-leaf Philodendron" },
  { "value": "Staghorn Fern", "label": "Staghorn Fern" },
  { "value": "String of Bananas", "label": "String of Bananas" },
  { "value": "String of Hearts", "label": "String of Hearts" },
  { "value": "String of Pearls", "label": "String of Pearls" },
  { "value": "Succulent", "label": "Succulent" },
  { "value": "Swiss Cheese Plant", "label": "Swiss Cheese Plant" },
  { "value": "Tradescantia", "label": "Tradescantia" },
  { "value": "Umbrella Plant", "label": "Umbrella Plant" },
  { "value": "Venus Flytrap", "label": "Venus Flytrap" },
  { "value": "Wandering Jew", "label": "Wandering Jew" },
  { "value": "Watermelon Peperomia", "label": "Watermelon Peperomia" },
  { "value": "Weeping Fig", "label": "Weeping Fig" },
  { "value": "Wheatgrass", "label": "Wheatgrass" },
  { "value": "Xerographica", "label": "Xerographica" },
  { "value": "Yucca", "label": "Yucca" },
  { "value": "Zebra Plant", "label": "Zebra Plant" },
  { "value": "ZZ Plant", "label": "ZZ Plant" },
  { "value": "Pilea Peperomioides", "label": "Pilea Peperomioides" },
  { "value": "Nerve Plant", "label": "Nerve Plant" },
  { "value": "Hibiscus", "label": "Hibiscus" },
  { "value": "Croton", "label": "Croton" },
  { "value": "African Violet", "label": "African Violet" },
  { "value": "Flamingo Flower", "label": "Flamingo Flower" },
  { "value": "Prickly Pear Cactus", "label": "Prickly Pear Cactus" }

];

//sort the plants from a to z
let sortedProducts = options.sort(
  (v1, v2) => (v1.value > v2.value) ? 1 : (v1.value < v2.value) ? -1 : 0);

export default options