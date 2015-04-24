O2.createClass('GC.Item', {
	resref: '',					// référence de ressource
	stacksize: 1,				// capacité de la pile 1 = non empilable
	stackcount: 1,				// nombre d'éléments dans la pile
	
	__construct: function(sResRef) {
		this.resref = sResRef;
	},
	
	isStackable: function() {
		return this.stacksize > 1;
	},
	
	isStackFull: function() {
		return this.stackcount == this.stacksize;
	},
	
	/** Renvoie true si la pile n'a plus délements
	 * @return bool
	 */
	isStackEmpty: function() {
		return this.stackcount <= 0;
	},
	
	/** Modification du stackcount
	 * Le nombre est borné à [0..stacksize]
	 * @param n int, nouveau stackcount
	 * @return int nouveau stackcount, modifié pour qu'il reste entre les bornes 
	 */
	setStackCount: function(n) {
		this.stackcount = Math.max(0, Math.min(this.stacksize, n));
		return this.stackcount;
	},
	
	/** 
	 * Augmente le stackcount sans dépasser le max
	 * renvoie le nombre de stack ajouté
	 * @param n
	 * @return int
	 */
	stackInc: function(n) {
		if (n <= 0) {
			return 0;
		}
		var nOldCount = this.stackcount;
		this.setStackCount(nOldCount + n);
		return this.stackcount - nOldCount;
	},
	
	/**
	 * Retire des stacks
	 * renvoie le nombre de stack réellement supprimé
	 */
	stackDec: function(n) {
		if (n <= 0) {
			return 0;
		}
		var nOldCount = this.stackcount;
		this.setStackCount(nOldCount - n);
		return nOldCount - this.stackcount;
	}
	
});
