import HermitCard from './_hermit-card'

class IceCreamDealerHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'andrew-IceCreamDealer',
			name: 'Ice Cream Dealer',
			rarity: 'common',
			hermitType: 'iceCream',
			health: 300,
			primary: {
				name: 'Shady Salesman',
				cost: ['iceCream','any'],
				damage: 60,
				power: null,
			},
			secondary: {
				name: 'Alleyway Deals',
				cost: ['iceCream', 'iceCream', 'any'],
				damage: 90,
				power: null,
			},
		})
	}

	register(game) {}
}

export default IceCreamDealerHermitCard
