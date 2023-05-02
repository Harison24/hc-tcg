import HermitCard from './_hermit-card'

class NyanCatHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'nyan_cat',
			name: 'Nyan Cat',
			rarity: 'common',
			characterType: 'cat',
			health: 280,
			primary: {
				name: 'Annoying Song',
				cost: ['cat'],
				damage: 50,
				power: null,
			},
			secondary: {
				name: 'Rainbow Blast',
				cost: ['cat', 'cat','any'],
				damage: 90,
				power: null,
			},
		})
	}

	register(game) {}
}

export default NyanCatHermitCard
