
/**
 * Un composant simple qui affiche un texte Penser à redimensionner correctement
 * le controle, sinon le texte sera invisible
 */
O2.extendClass('H5UI.Text', H5UI.WinControl, {
	_sClass : 'Text',
	_sCaption : '',
	_bAutosize : true,
	_bWordWrap: false,
	_nTextWidth: 0,	
	_nLineHeight: 0,
	_yLastWritten: 0,
	_bUseColorCodes: false,

	// propriété publique
	font : null,

	__construct : function() {
		__inherited();
		O876.CanvasFactory.setImageSmoothing(this.getSurface(), true);
		this.font = new H5UI.Font(this);
	},
	
	setFontStyle: function(sStyle) {
		this.font.setStyle(sStyle);
		this.invalidate();
	},

	setFontSize: function(nSize) {
		this.font.setSize(nSize);
		this.invalidate();
	},

	setFontColor: function(sColor, sOutline) {
		this.font.setColor(sColor, sOutline);
		this.invalidate();
	},

	setFontFace: function(sName) {
		this.font.setFont(sName);
		this.invalidate();
	},

	/**
	 * Modification du caption
	 * 
	 * @param s
	 *            nouveau caption
	 */
	setCaption : function(s) {
		this._set('_sCaption', s);
		this.font.update();
		if (this._bAutosize && this._bInvalid && !this._bWordWrap) {
			var oMetrics = this.getSurface().measureText(this._sCaption);
			this.setSize(oMetrics.width, this.font._nFontSize);
		} else {
			this.renderSelf();
		}
	},


	/**
	 * Définition du flag autosize quand ce flag est actif, le control prend la
	 * dimension du texte qu'il contient
	 */
	setAutosize : function(b) {
		this._set('_bAutosize', b);
	},

	/**
	 * Définition du flag wordwrap, quand ce flag est actif, la taille est fixe
	 * et le texte passe à la ligne si celui-ci est plus long que la longeur.
	 */
	setWordWrap : function(b) {
		this._set('_bWordWrap', b);
	},

	multiColorLineRender: function (oSurface, sLine, x, y) {
		// découper la chaine en tronçons
		var i = 0, segm, color = '{#000}', t, r = /\{#[0-9A-Fa-f]+\}/g;
		var aResult = [];
		do {
			t = r.exec(sLine);
			if (t) {
				segm = {
					i: i,
					t: sLine.substr(i, t.index - i),
					c: color.substr(1, color.length - 2)
				};
				color = t[0];
				i = t.index + color.length;
			} else {
				segm = {
					i: i,
					t: sLine.substr(i),
					c: color.substr(1, color.length - 2)
				};
			}
			aResult.push(segm);
		} while (t);
		i = 0;
		aResult.forEach((function(s) {
			var w = oSurface.measureText(s.t).width;
			oSurface.fillStyle = s.c;
			oSurface.fillText(s.t, x + i, y);
			i += w;
		}).bind(this));
		return aResult;
	},



	renderSelf : function() {
		var oSurface = this.getSurface();
		var oMetrics;
		// Redimensionnement du texte
		oSurface.clearRect(0, 0, this.width(), this.height());
		if (this._bWordWrap){
			var aRenderLines = [];
			this.font.update();
			var aWords;
			var sLine = '', sWord, x = 0, y = 0;
			var sSpace;
			oSurface.textBaseline = 'top';
			var aParas = this._sCaption.split('\n');
			for (var iPara = 0, nParaCount = aParas.length; iPara < nParaCount; ++iPara) {
				aWords = aParas[iPara].split(' ');
				while (aWords.length) {
					sWord = aWords.shift();
					sSpace = sLine ? ' ' : '';
					oMetrics = oSurface.measureText(sLine + sSpace + sWord);
					if (oMetrics.width >= this.width()) {
						// flush
						x = 0;
						aRenderLines.push(sLine);
						y += this.font._nFontSize + this._nLineHeight;
						sLine = sWord;
					} else {
						sLine += sSpace + sWord;
						x += oMetrics.width;
					}
				}
				x = 0;
				aRenderLines.push(sLine);
				y += this.font._nFontSize + this._nLineHeight;
				sLine = '';
				this._yLastWritten = y;
			}
			if (this._bAutosize) {
				this.setSize(this.width(), y + this.font._nFontSize);
			}

			aRenderLines.forEach((function(s, i) {
				var x = 0, y = i * (this.font._nFontSize + this._nLineHeight);
				if (this.font._bOutline) {
					oSurface.strokeText(s, x, y);
				}
				if (this._bUseColorCodes) {
					this.multiColorLineRender(oSurface, s, x, y);
				} else {
					oSurface.fillText(s, x, y);
				}
			}).bind(this));
		} else {
			if (this._bAutosize) {
				this.font.update();
				oMetrics = oSurface.measureText(this._sCaption);
				this.setSize(oMetrics.width, this.font._nFontSize);
			} else {
			}
			oSurface.textBaseline = 'middle';
			if (this.font._bOutline) {
				oSurface.strokeText(this._sCaption, 0, this.height() / 2);
			}
			oSurface.fillText(this._sCaption, 0, this.height() / 2);
		}
	}
});

