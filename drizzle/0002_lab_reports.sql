-- Certificados de ACS Laboratory para las 18 cepas (nov 2026). El PDF viaja con
-- el sitio en /coa/<slug>.pdf, por eso fileKey va vacío. Cada uno se inserta
-- solo si el producto existe y aún no tiene un reporte con ese lote, así que
-- no duplica nada cargado a mano. En una base vacía no hace nada: ahí el seed
-- crea productos y reportes.
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426BZ', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-blue-zushi.pdf', '', 'diamond-infused-blue-zushi.pdf', 1249490, 1, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-blue-zushi'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426BZ'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426DP', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-durban-poison.pdf', '', 'diamond-infused-durban-poison.pdf', 1249364, 1, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-durban-poison'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426DP'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426GM', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-grease-monkey.pdf', '', 'diamond-infused-grease-monkey.pdf', 1260420, 1, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-grease-monkey'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426GM'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426PM', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-permanent-marker.pdf', '', 'diamond-infused-permanent-marker.pdf', 1251501, 1, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-permanent-marker'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426PM'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426SR', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-slurricane.pdf', '', 'diamond-infused-slurricane.pdf', 1258923, 1, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-slurricane'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426SR'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426SLH', 'ACS Laboratory', '2026-09-16', '/coa/diamond-infused-super-lemon-haze.pdf', '', 'diamond-infused-super-lemon-haze.pdf', 1245366, 0, 0
FROM `products` p
WHERE p.`slug` = 'diamond-infused-super-lemon-haze'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426SLH'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426BD', 'ACS Laboratory', '2026-10-05', '/coa/gusherz-blue-dream.pdf', '', 'gusherz-blue-dream.pdf', 900885, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-blue-dream'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426BD'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426GP', 'ACS Laboratory', '2026-10-06', '/coa/gusherz-granddaddy-purple.pdf', '', 'gusherz-granddaddy-purple.pdf', 908050, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-granddaddy-purple'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426GP'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426GC', 'ACS Laboratory', '2026-10-06', '/coa/gusherz-green-crack.pdf', '', 'gusherz-green-crack.pdf', 905733, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-green-crack'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426GC'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426NL', 'ACS Laboratory', '2026-10-05', '/coa/gusherz-northern-lights.pdf', '', 'gusherz-northern-lights.pdf', 912957, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-northern-lights'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426NL'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL090426SD', 'ACS Laboratory', '2026-10-06', '/coa/gusherz-sour-diesel.pdf', '', 'gusherz-sour-diesel.pdf', 904338, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-sour-diesel'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL090426SD'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL08142026', 'ACS Laboratory', '2026-08-14', '/coa/gusherz-white-runtz.pdf', '', 'gusherz-white-runtz.pdf', 1457978, 1, 0
FROM `products` p
WHERE p.`slug` = 'gusherz-white-runtz'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL08142026'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826BT', 'ACS Laboratory', '2026-10-06', '/coa/pre-rolls-black-truffle.pdf', '', 'pre-rolls-black-truffle.pdf', 909696, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-black-truffle'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826BT'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826JH', 'ACS Laboratory', '2026-10-05', '/coa/pre-rolls-jack-herer.pdf', '', 'pre-rolls-jack-herer.pdf', 902669, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-jack-herer'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826JH'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826KL', 'ACS Laboratory', '2026-10-06', '/coa/pre-rolls-king-louie.pdf', '', 'pre-rolls-king-louie.pdf', 908549, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-king-louie'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826KL'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826RB', 'ACS Laboratory', '2026-10-06', '/coa/pre-rolls-rainbow-belts.pdf', '', 'pre-rolls-rainbow-belts.pdf', 912404, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-rainbow-belts'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826RB'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826SC', 'ACS Laboratory', '2026-10-06', '/coa/pre-rolls-strawberry-cough.pdf', '', 'pre-rolls-strawberry-cough.pdf', 913587, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-strawberry-cough'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826SC'
  );
--> statement-breakpoint
INSERT INTO `lab_reports`
  (`productId`, `title`, `batch`, `lab`, `testedOn`, `fileUrl`, `fileKey`, `fileName`, `sizeBytes`, `published`, `sortOrder`)
SELECT p.`id`, 'Full panel COA', 'GL210826WR', 'ACS Laboratory', '2026-10-06', '/coa/pre-rolls-white-runtz.pdf', '', 'pre-rolls-white-runtz.pdf', 915968, 1, 0
FROM `products` p
WHERE p.`slug` = 'pre-rolls-white-runtz'
  AND NOT EXISTS (
    SELECT 1 FROM `lab_reports` lr WHERE lr.`productId` = p.`id` AND lr.`batch` = 'GL210826WR'
  );
