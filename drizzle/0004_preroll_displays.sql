-- THC Pre-Rolls: segunda foto con el display de 40 pouches, y descripción y
-- datos con el display. Una foto subida desde el panel (altImageKey) se respeta.
UPDATE `products` SET
  `description` = 'Strawberry Cough, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-strawberry-cough-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-strawberry-cough';
--> statement-breakpoint
UPDATE `products` SET
  `description` = 'Jack Herer, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-jack-herer-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-jack-herer';
--> statement-breakpoint
UPDATE `products` SET
  `description` = 'King Louie, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-king-louie-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-king-louie';
--> statement-breakpoint
UPDATE `products` SET
  `description` = 'Black Truffle, rolled straight: indoor exotic flower and nothing else. A sativa. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-black-truffle-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-black-truffle';
--> statement-breakpoint
UPDATE `products` SET
  `description` = 'White Runtz, rolled straight: indoor exotic flower and nothing else. A hybrid. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-white-runtz-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-white-runtz';
--> statement-breakpoint
UPDATE `products` SET
  `description` = 'Rainbow Belts, rolled straight: indoor exotic flower and nothing else. A hybrid. One 1.25-gram pre-roll to a pouch, forty pouches to a display.',
  `facts` = 'Per pouch: 1 pre-roll
Net weight: 1.25 G per pouch (0.044 oz)
Display: 40 pouches, 50 G (1.76 oz)
Delta-9 THC: <0.3% on a dry weight basis
Delta-8: None
Compliance: 2018 Farm Bill, Texas Agriculture Code § 122.153',
  `altImageUrl` = IF(`altImageKey` IS NULL OR `altImageKey` = '', '/products/pre-rolls-rainbow-belts-box.webp', `altImageUrl`)
WHERE `slug` = 'pre-rolls-rainbow-belts';
