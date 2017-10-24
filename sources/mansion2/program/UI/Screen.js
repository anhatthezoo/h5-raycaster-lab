/** 
 * UI : Interface utilisateur
 * @author raphael marandet
 * @date 2013-01-01
 *
 * Ecran d'affichage de l'interface graphique.
 * Cet écran accueille tout les autres widget de l'interface
 * Sa taille correspond aux dimension max de la zone d'affichage.
 * Il est muni d'un fond translucide
 */
O2.extendClass('UI.Screen', H5UI.WinControl, {
	_sClass: 'UI.Screen',
	oBackground: null,
	fAlpha: 0.333,

	setBackground: function(c) {
		this.oBackground = O876.CanvasFactory.cloneCanvas(c);
	},
	
	renderSelf: function() {
		if (this.oBackground) {
			this._oContext.drawImage(this.oBackground, 0, 0);
		} else {
			this._oContext.clearRect(0, 0, this._nWidth, this._nHeight);
		}
		if (this.fAlpha > 0) {
			this._oContext.fillStyle = 'rgba(0, 0, 0, ' + this.fAlpha.toString() + ')';
			this._oContext.fillRect(0, 0, this._nWidth, this._nHeight);
		}
	}
});
