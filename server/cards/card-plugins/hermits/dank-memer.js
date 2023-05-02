import HermitCard from './_hermit-card'

class DankMemerHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'dank_memer',
			name: 'Dank Memer',
			rarity: 'common',
			hermitType: 'bot',
			health: 290,
			primary: {
				name: '/beg',
				cost: ['bot'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: '/rob',
				cost: ['bot', 'bot', 'any'],
				damage: 90,
				power: null,
			},
		})
	}

	register(game) {}
}

export default DankMemerHermitCard
