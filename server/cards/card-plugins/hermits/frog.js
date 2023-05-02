import HermitCard from './_hermit-card'

class FrogHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'frog',
			name: 'Frog',
			rarity: 'common',
			hermitType: 'minecraft',
			health: 280,
			primary: {
				name: 'Lick',
				cost: ['any'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: 'Pounce',
				cost: ['any', 'any'],
				damage: 60,
				power: null,
			},
		})
	}

	register(game) {}
}

export default FrogHermitCard
