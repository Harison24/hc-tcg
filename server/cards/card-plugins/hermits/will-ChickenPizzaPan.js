import HermitCard from './_hermit-card'

class ChickenPizzaPanHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'will_ChickenPizzaPan',
			name: 'Chicken Pizza Pan',
			rarity: 'common',
			characterType: 'bacon',
			health: 300,
			primary: {
				name: 'Concrete Throw',
				cost: ['bacon'],
				damage: 50,
				power: null,
			},
			secondary: {
				name: 'Potatosium',
				cost: ['bacon', 'bacon', 'bacon'],
				damage: 100,
				power: null,
			},
		})
	}

	register(game) {}
}

export default ChickenPizzaPanHermitCard
