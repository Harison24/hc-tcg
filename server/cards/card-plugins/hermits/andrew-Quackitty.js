import HermitCard from './_hermit-card'

class QuackittyHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'andrew_Quackitty',
			name: 'Quackitty',
			rarity: 'common',
			hermitType: 'cat',
			health: 260,
			primary: {
				name: 'Meow',
				cost: ['cat'],
				damage: 40,
				power: null,
			},
			secondary: {
				name: 'Hairball',
				cost: ['cat', 'cat', 'cat'],
				damage: 100,
				power: null,
			},
		})
	}

	register(game) {}
}

export default QuackittyHermitCard
