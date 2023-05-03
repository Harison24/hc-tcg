import HermitCard from './_hermit-card'

class BananaGunCharacterCard extends HermitCard {
	constructor() {
		super({
			id: 'andrew-BananaGun',
			name: 'Banana Gun',
			rarity: 'common',
			hermitType: 'cat',
			health: 290,
			primary: {
				name: 'Banana Blast',
				cost: ['cat'],
				damage: 50,
				power: null,
			},
			secondary: {
				name: 'School Shooting',
				cost: ['cat', 'cat','any'],
				damage: 90,
				power: null,
			},
		})
	}

	register(game) {}
}

export default BananaGunCharacterCard
