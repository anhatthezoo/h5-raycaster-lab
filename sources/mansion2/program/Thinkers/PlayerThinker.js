O2.extendClass('MANSION.PlayerThinker', O876_Raycaster.CameraMouseKeyboardThinker, {
	
	oEasingAngle: null,
	
	damage: function(oAggressor) {
	},
	
	forceAngle: function(fTarget) {
		var m = this.oMobile;
		var fMe = m.getAngle();
		while (fTarget < 0) {
			fTarget += 2 * PI;
			fMe += 2 * PI;
		}
		var fTurn = fMe - fTarget;
		var e = new O876.Easing();
		e.setFunction('cubeDeccel');
		if (fTurn > PI) {
			e.setMove(fMe, fMe + fTurn, 6);
		} else {
			e.setMove(fMe, fMe - fTurn, 6);
		}
		this.oEasingAngle = e;
	},
	
	getGhostAngle: function(xMe, yMe, xTarget, yTarget) {
		return Math.atan2(yTarget - yMe, xTarget - xMe);
	},
	
	/**
	 * Check all present ghosts, For each ghost, compute angle
	 * 
	 */
	getAllGhostAngles: function() {
		// get present ghosts
		var x, y;
		var m = this.oMobile;
		var xMe = m.x, yMe = m.y;
		var aGhosts = [];
		var vm = this.oGame.oRaycaster.aVisibleMobiles;
		for (var i = 0, l = vm.length; i < l; ++i) {
			m = vm[i];
			if (m && m.getData('ghost')) {
				m.setData('frameAngle', this.getGhostAngle(xMe, yMe, m.x, m.y));
				aGhosts.push(m);
			}
		}
		return aGhosts;
	},
	
	/**
	 * Un fantome menace.
	 * Tourner l'angle de vue vers le fantome
	 */
	ghostThreat: function(oGhost) {
		var oMe = this.oMobile;
		var fAngle = this.getGhostAngle(oMe.x, oMe.y, oGhost.x, oGhost.y);
		this.forceAngle(fAngle);
	},
	
	processAngle: function() {
		var bLastMove = this.oEasingAngle.move();
		this.oMobile.setAngle(this.oEasingAngle.x);
		if (bLastMove) {
			this.oEasingAngle = null;
		}
	},
	
	think: function() {
		if (this.oEasingAngle) {
			this.processAngle();
		}
		__inherited();
	},
	
	readMouseMovement: function(x, y) {
		if (this.oEasingAngle === null) {
			__inherited(x, y);
		}
	},	
});
