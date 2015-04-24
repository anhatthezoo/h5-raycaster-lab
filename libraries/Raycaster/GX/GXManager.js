/** Gestionnaire d'effets temporisés
 * O876 Raycaster project
 * @date 2012-01-01
 * @author Raphaël Marandet
 *
 * Cette classe gère les effet graphique temporisés
 */
O2.createClass('O876_Raycaster.GXManager', {
	aEffects : null, // liste des effets

	/** Le constructeur initialise la liste des effet à vide
	 */
	__construct : function() {
		this.aEffects = [];
	},

	/** Compte le nombre d'effets
	 * @return entier
	 */
	count : function() {
		return this.aEffects.length;
	},

	/** Permet d'ajouter un effet à la liste
	 * @param oEffect un nouveau GXEffect
	 * @return oEffect
	 */
	addEffect : function(oEffect) {
		this.aEffects.push(oEffect);
		return oEffect;
	},

	/** Supprime tous les effet actuels
	 * Lance la methode terminate de chacun d'eux
	 */
	clear : function() {
		for ( var i = 0; i < this.aEffects.length; ++i) {
			this.aEffects[i].terminate();
			this.aEffects[i].done();
		}
		this.aEffects = [];
	},

	/** Lance la methode process() de chaque effet
	 * Supprime les effet qui sont arrivé à terme
	 */
	process : function() {
		var i = this.aEffects.length - 1;
		while (i >= 0) {
			this.aEffects[i].process();
			if (this.aEffects[i].isOver()) {
				this.aEffects[i].done();
				ArrayTools.removeItem(this.aEffects, i);
			}
			i--;
		}
	},

	/** Lance la methode render() de chaque effet
	 */
	render : function() {
		var nLen = this.aEffects.length;
		for ( var i = nLen - 1; i >= 0; i--) {
			this.aEffects[i].render();
		}
	}
});
