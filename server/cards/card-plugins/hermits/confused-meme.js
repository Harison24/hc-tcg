import HermitCard from './_hermit-card'

class ConfusedMemeHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'confused-meme',
			name: 'Confused Meme',
			rarity: 'common',
			hermitType: 'toddler',
			health: 250,
			primary: {
				name: 'Baby Talk',
				cost: ['any'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: 'Cry',
				cost: ['toddler', 'any'],
				damage: 70,
				power: null,
			},
		})
	}

	register(game) {}
}

export default ConfusedMemeHermitCard
