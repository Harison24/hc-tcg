import HermitCard from './_hermit-card'

class BurgerHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'chubby-Burger',
			name: 'Burger',
			rarity: 'common',
			hermitType: 'bacon',
			health: 270,
			primary: {
				name: 'Patty',
				cost: ['bacon'],
				damage: 60,
				power: null,
			},
			secondary: {
				name: 'Tomato',
				cost: ['bacon', 'bacon'],
				damage: 70,
				power: null,
			},
		})
	}

	register(game) {}
}

export default BurgerHermitCard
