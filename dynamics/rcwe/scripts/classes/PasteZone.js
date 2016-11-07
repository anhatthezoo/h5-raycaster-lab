O2.extendClass('RCWE.PasteZone', RCWE.Window, {

	_id: 'pastezone',

	oImageZone: null,
	oPasteBin: null,
	sTileType: '',
	
	build: function() {
		__inherited('Paste Tile');
		var c = this.getContainer();
		c.addClass('PasteZone');

		this.addCommand('<b>↵</b>', 'Close the paste zone and return to the editor', this.cmd_close.bind(this));
		this.addCommand('<span class="icon-map2"></span> Walls', 'Will paste wall tiles', this.cmd_wallTilesClick.bind(this)).addClass('command wall');
		this.addCommand('<span class="icon-delicious"></span> Flats', 'Will paste flat tiles', this.cmd_flatTilesClick.bind(this)).addClass('command flat');
	//		this.addCommand('<span class="icon-folder"></span> Open', 'Load the selected file', this.cmd_open.bind(this));
//		this.addCommand('<span class="icon-bin" style="color: #A00"></span> Delete', 'Delete the selected file', this.cmd_delete.bind(this));

		this.getBody().append('<p><b>Paste Zone</b></p><p>Copy an image from any other application and paste it here by pressing <i>ctrl-v</i>. This will create several tiles.</p>');
		this.getBody().append('<p>This will paste <b class="tile-type">unknown</b> tiles.</p>');
		var $imageZone = $('<div class="imageZone"></div>');
		this.getBody().append($imageZone);
		this.oImageZone = $imageZone;

		this.oPasteBin = new RCWE.PasteBin(true);
		this.oPasteBin.on('paste.image', this.cmd_pasteImage.bind(this));
		this.oPasteBin.on('error', function(e) {
			W.error(e);
		});
		this.oPasteBin.bActive = false;
	},


	show: function(sTileType) {
		__inherited();
		this.cmd_selectTileType(sTileType);
		this.oPasteBin.bActive = true;
	},

	hide: function() {
		__inherited();
		this.oPasteBin.bActive = false;
	},

	cmd_pasteImage: function(oImage) {
		var x = 0;
		var $canvas;
		var $iz = $(this.oImageZone);
		$iz.empty();
		var h = this.sTileType === 'wall' ? 96 : 64;
		var w = 64;
		while (x < oImage.width) {
			$fig = $('<figure class="paste-tile"></figure>');
			$figcap = $('<figcaption></figcaption>');
			$b = $('<button type="button"><span class="icon-checkmark" style="color: #080"></span></button>');
			$bDel = $('<button type="button"><span class="icon-cross" style="color: #A00"></span></button>');
			$figcap.append($b);
			$figcap.append($bDel);
			$canvas = $('<canvas width="' + w + '" height="' + h + '"></canvas>');
			$canvas.data('tile-type', this.sTileType);
			ctx = $canvas.get(0).getContext('2d');
			ctx.drawImage(oImage, x, 0, Math.min(w, oImage.width - x), h, 0, 0, Math.min(w, oImage.width - x), h);
			$fig.append($canvas);
			$fig.append($figcap);
			$iz.append($fig);
			$bDel.one('click', (function(oEvent) {
				var $btn = $(oEvent.target);
				var $f = $btn.parents('figure').eq(0);
				var $c = $('canvas', $f);
				$f.fadeOut(function() {
					$f.remove();
				});
			}).bind(this));
			$b.one('click', (function(oEvent) {
				var $btn = $(oEvent.target);
				var $f = $btn.parents('figure').eq(0);
				var $c = $('canvas', $f);
				this.doAction('importtile', $c.get(0), $c.data('tile-type'));
				$f.fadeOut(function() {
					$f.remove();
				});
			}).bind(this));
			x += w;
		}
		// one 64x96 tile
		// a 1:1 tileset
		// a height-resized tileset
	},
	
	cmd_close: function() {
		this.doAction('close');
	},

	cmd_selectTileType: function(sTileType) {
		this.sTileType = sTileType;
		$('.command.selected', this.getToolBar()).removeClass('selected');
		$('.command.' + sTileType, this.getToolBar()).addClass('selected');
		$('.tile-type', this.getBody()).text(sTileType);
	},

	cmd_wallTilesClick: function(oEvent) {
		this.cmd_selectTileType('wall');
	},

	cmd_flatTilesClick: function(oEvent) {
		this.cmd_selectTileType('flat');
	},
});
