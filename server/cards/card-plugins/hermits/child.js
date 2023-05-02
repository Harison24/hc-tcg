import HermitCard from './_hermit-card'

class ChildHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'child',
			name: 'Child',
			rarity: 'common',
			hermitType: 'toddler',
			health: 270,
			primary: {
				name: 'Spelling',
				cost: ['toddler'],
				damage: 60,
				power: null,
			},
			secondary: {
				name: 'Screaming',
				cost: ['toddler', 'toddler'],
				damage: 80,
				power: null,
			},
		})
	}

	register(game) {}
}

export default ChildHermitCard
