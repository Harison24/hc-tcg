import HermitCard from './_hermit-card'

class MEE6HermitCard extends HermitCard {
	constructor() {
		super({
			id: 'mee6',
			name: 'MEESEXY',
			rarity: 'common',
			hermitType: 'bot',
			health: 280,
			primary: {
				name: 'Play Jams',
				cost: ['bot'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: 'Level Up',
				cost: ['bot', 'bot','bot'],
				damage: 100,
				power: null,
			},
		})
	}
// done
	register(game) {}
}

export default MEE6HermitCard

