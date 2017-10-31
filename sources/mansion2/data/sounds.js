/**
 * @const MANSION
 * @property {object} MANSION.SOUNDS_DATA
 * Mansion sound database
 */
O2.createObject('MANSION.SOUNDS_DATA', {
	ambiance: {
		thunder: 'ambiance/thunder'
	},
	bgm: {
		levels: {
			tutorial: 'music/forest',
			ch1: 'music/forest',
		},
		woods: 'music/forest',
		atrium: 'music/atrium',
		inside: 'music/inside',
		jail: 'music/jail',
		cellar: 'music/manor',
		ghost: 'music/combat',
		cthulhu: 'music/cthulhu'
	},
	events: {
		// mechanical events
		dooropen: 'mechanisms/door-open-2',
		doorclose: 'mechanisms/door-close-2',
		doorlocked: 'mechanisms/door-locked',
		doorunlock: 'mechanisms/door-unlock',
		sigillocked: 'magic/magic-chime-low',
		sigilunlock: 'magic/magic-chime',
		secret: 'mechanisms/push-stone',
		camera: 'mechanisms/camera-trigger',
		charge: 'mechanisms/camera-charge',
		ring: 'events/phone-ringtone',
		fullcharge: 'mechanisms/camera-full-charge',
		stress: [
			'events/stress0',
			'events/stress1',
			'events/stress2',
			'events/stress3',
			'events/stress4',
			'events/stress5',
			'events/stress6',
		]
	},
	pickup: {
		key: 'pickup/key',
		book: 'pickup/book',
		scroll: 'pickup/scroll'
	},
	ghosts: {
		// supernatural events
		laugh: 'e-laugh',
		ropes: 'e-ropes',
		ghost: 'e-ghost',
		mourn: 'e-mournful',
	},
	missiles: {
		fire1: 'ghosts/generic/missile-fire',
		impact1: 'ghosts/generic/missile-hit'
	},
	visualeffects: {
		bluefire: 'ghosts/generic/ghost-burn'
	},
	intro: {
		stress1: 'intro/stress-1',
		stress2: 'intro/stress-2',
		stress3: 'intro/stress-3',
		stress4: 'intro/stress-4',
		stress5: 'intro/stress-5',
		stressfinal: 'intro/stress-final'
	},
	
	
});
