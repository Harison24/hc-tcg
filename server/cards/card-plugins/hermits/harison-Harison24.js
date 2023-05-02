import HermitCard from './_hermit-card'

class Harison24HermitCard extends HermitCard {
	constructor() {
		super({
			id: 'harison_Harison24',
			name: 'Harison24',
			rarity: 'common',
			hermitType: 'minecraft',
			health: 300,
			primary: {
				name: "Pickaxe Smack",
				cost: ['minecraft'],
				damage: 50,
				power: null,
			},
			secondary: {
				name: 'Kill Bob',
				cost: ['minecraft','minecraft'],
				damage: 80,
				power: null,
			},
		})
	}

	register(game) {}
}

export default Harison24HermitCard
