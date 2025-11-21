UPDATE conceptos_pago 
SET descripcion = 'Matricula' 
WHERE id_concepto = 1 OR descripcion LIKE '%Matr%';

SELECT * FROM conceptos_pago;
