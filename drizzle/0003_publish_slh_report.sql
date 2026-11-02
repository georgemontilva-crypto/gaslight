-- Publica el reporte de Super Lemon Haze (lote GL090426SLH), que 0002 cargó
-- oculto. Solo toca esa fila; si ya se publicó desde el panel, no cambia nada.
UPDATE `lab_reports` SET `published` = 1
WHERE `batch` = 'GL090426SLH' AND `fileUrl` = '/coa/diamond-infused-super-lemon-haze.pdf';
