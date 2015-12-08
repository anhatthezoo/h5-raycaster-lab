/**
 * Cette fonction parcoure tous les points en ligne droite sur le segment déterminé 
 * par les points (x0, y0) et (x1, y1) 
 * pour chaque point parcouru on appelle un callback fonction (x, y) qui devra renvoyer true
 * pour stopper le parcour, ou false pour le laisser continuer
 * @param x0 point de départ absice
 * @param y0 point de départ ordonnée
 * @param x1 point d'arrivée absice
 * @param y1 point d'arrivée ordonnée
 * @param pPlotFunction fonction callback
 * @returns {Boolean} true si le parcour a été interrompu / false sinon
 */
O2.createObject('O876.Bresenham', {
	line: function(x0, y0, x1, y1, pPlotFunction) {
		var dx = Math.abs(x1 - x0);
		var dy = Math.abs(y1 - y0);
		var sx = (x0 < x1) ? 1 : -1;
		var sy = (y0 < y1) ? 1 : -1;
		var err = dx - dy;
		var e2;
		while (true) {
			if (pPlotFunction(x0, y0)) {
				return true;
			}
			if (x0 == x1 && y0 == y1) {
				break;
			}
			e2 = err << 1;
			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}
		return false;
	}
});

