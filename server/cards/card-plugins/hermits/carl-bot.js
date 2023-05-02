import HermitCard from './_hermit-card'

class CarlBotHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'carl_bot',
			name: 'Carl Bot',
			rarity: 'common',
			hermitType: 'Bot',
			health: 250,
			primary: {
				name: 'Play a Game',
				cost: ['any'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: 'Run A Poll',
				cost: ['any', 'any'],
				damage: 70,
				power: null,
			},
		})
	}

	register(game) {}
}

export default CarlBotHermitCard
