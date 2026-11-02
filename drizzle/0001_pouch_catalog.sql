-- Catálogo de nov 2026: todo en pouch, sin frascos ni tubos.
-- Actualiza en su sitio las 18 cepas que dejó el seed anterior (mismos ids, así
-- que los lab reports ya cargados se quedan con su producto). La línea "THC
-- Melted Diamond" pasa a llamarse "Diamond Infused" y sus slugs cambian.
-- Las fotos solo se tocan si siguen siendo las que venían con el sitio
-- (imageKey / altImageKey vacíos); una foto subida desde el panel se respeta.
-- En una base vacía no hace nada: ahí el seed crea el catálogo nuevo.
UPDATE `products` SET
  `slug` = 'gusherz-blue-dream',
  `name` = 'Blue Dream',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'hybrid',
  `accentColor` = '#1fb6f0',
  `description` = 'Blue Dream as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. A hybrid. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 100,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-blue-dream.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-blue-dream-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-blue-dream';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'gusherz-white-runtz',
  `name` = 'White Runtz',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'hybrid',
  `accentColor` = '#f1ece4',
  `description` = 'White Runtz as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. A hybrid. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 101,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-white-runtz.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-white-runtz-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-white-runtz';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'gusherz-green-crack',
  `name` = 'Green Crack',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'sativa',
  `accentColor` = '#42d13b',
  `description` = 'Green Crack as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. A sativa. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 102,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-green-crack.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-green-crack-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-green-crack';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'gusherz-sour-diesel',
  `name` = 'Sour Diesel',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'sativa',
  `accentColor` = '#f2701f',
  `description` = 'Sour Diesel as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. A sativa. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 103,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-sour-diesel.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-sour-diesel-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-sour-diesel';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'gusherz-granddaddy-purple',
  `name` = 'Grand Daddy Purple',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'indica',
  `accentColor` = '#a77bf0',
  `description` = 'Grand Daddy Purple as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. An indica. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 104,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-granddaddy-purple.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-granddaddy-purple-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-granddaddy-purple';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'gusherz-northern-lights',
  `name` = 'Northern Lights',
  `collection` = 'THC Gusherz',
  `subtitle` = '2 per pouch, 2.0G each',
  `strain` = 'indica',
  `accentColor` = '#ec2b33',
  `description` = 'Northern Lights as a hash hole: indoor CBD/CBG flower rolled around a core of CBD hash badder, with natural terpene flavoring. An indica. Two 2.0-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 2 pre-rolls
Per pre-roll: 2.0 G
Net weight: 4.0 G per pouch (0.141 oz)
Display: 10 pouches, 20 G (0.705 oz)
Ingredients: Indoor CBD/CBG flower, CBD hash badder, natural terpene flavoring
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 105,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/gusherz-northern-lights.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/gusherz-northern-lights-box.webp', `altImageUrl`)
WHERE `slug` = 'gusherz-northern-lights';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-grease-monkey',
  `name` = 'Grease Monkey',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'hybrid',
  `accentColor` = '#ec2b33',
  `description` = 'Grease Monkey, diamond infused: indoor exotic flower infused with diamonds. A hybrid. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 200,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-grease-monkey.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-grease-monkey-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-grease-monkey';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-permanent-marker',
  `name` = 'Permanent Marker',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'hybrid',
  `accentColor` = '#f1ece4',
  `description` = 'Permanent Marker, diamond infused: indoor exotic flower infused with diamonds. A hybrid. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 201,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-permanent-marker.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-permanent-marker-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-permanent-marker';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-durban-poison',
  `name` = 'Durban Poison',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'sativa',
  `accentColor` = '#42d13b',
  `description` = 'Durban Poison, diamond infused: indoor exotic flower infused with diamonds. A sativa. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 202,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-durban-poison.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-durban-poison-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-durban-poison';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-super-lemon-haze',
  `name` = 'Super Lemon Haze',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'sativa',
  `accentColor` = '#f2e21e',
  `description` = 'Super Lemon Haze, diamond infused: indoor exotic flower infused with diamonds. A sativa. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 203,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-super-lemon-haze.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-super-lemon-haze-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-super-lemon-haze';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-slurricane',
  `name` = 'Slurricane',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'indica',
  `accentColor` = '#a77bf0',
  `description` = 'Slurricane, diamond infused: indoor exotic flower infused with diamonds. An indica. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 204,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-slurricane.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-slurricane-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-slurricane';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'diamond-infused-blue-zushi',
  `name` = 'Blue Zushi',
  `collection` = 'Diamond Infused',
  `subtitle` = '3 per pouch, 1.5G each',
  `strain` = 'indica',
  `accentColor` = '#2bb8e8',
  `description` = 'Blue Zushi, diamond infused: indoor exotic flower infused with diamonds. An indica. Three 1.5-gram pre-rolls to a pouch, ten pouches to a display.',
  `facts` = 'Per pouch: 3 pre-rolls
Per pre-roll: 1.5 G
Net weight: 4.5 G per pouch (0.15 oz)
Display: 10 pouches, 45 G (1.58 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 205,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/diamond-infused-blue-zushi.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/diamond-infused-blue-zushi-box.webp', `altImageUrl`)
WHERE `slug` = 'melted-diamond-blue-zushi';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-strawberry-cough',
  `name` = 'Strawberry Cough',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'sativa',
  `accentColor` = '#ee2030',
  `description` = 'Strawberry Cough, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 300,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-strawberry-cough.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-strawberry-cough';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-jack-herer',
  `name` = 'Jack Herer',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'sativa',
  `accentColor` = '#a9e6ee',
  `description` = 'Jack Herer, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 301,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-jack-herer.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-jack-herer';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-king-louie',
  `name` = 'King Louie',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'sativa',
  `accentColor` = '#cfe52a',
  `description` = 'King Louie, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 302,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-king-louie.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-king-louie';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-black-truffle',
  `name` = 'Black Truffle',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'sativa',
  `accentColor` = '#e6cc8f',
  `description` = 'Black Truffle, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 303,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-black-truffle.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-black-truffle';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-white-runtz',
  `name` = 'White Runtz',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'hybrid',
  `accentColor` = '#f1ece4',
  `description` = 'White Runtz, rolled straight: indoor exotic flower and nothing else. A hybrid. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 304,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-white-runtz.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-white-runtz';
--> statement-breakpoint
UPDATE `products` SET
  `slug` = 'pre-rolls-rainbow-belts',
  `name` = 'Rainbow Belts',
  `collection` = 'THC Pre-Rolls',
  `subtitle` = 'Single 1.25G pre-roll',
  `strain` = 'hybrid',
  `accentColor` = '#f04bb0',
  `description` = 'Rainbow Belts, rolled straight: indoor exotic flower and nothing else. A hybrid. One 1.25-gram pre-roll to a pouch.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G (0.044 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `sortOrder` = 305,
  `imageUrl` = IF(`imageKey` IS NULL OR `imageKey` = '', '/products/pre-rolls-rainbow-belts.webp', `imageUrl`),
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', NULL, `altImageUrl`)
WHERE `slug` = 'pre-rolls-rainbow-belts';
