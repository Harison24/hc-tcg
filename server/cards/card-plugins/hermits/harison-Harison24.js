import CharacterCard from './_character-card'

class Harison24CharacterCard extends CharacterCard {
	constructor() {
		super({
			id: 'harison-Harison24',
			name: 'Harison24',
			rarity: 'common',
			characterType: 'minecraft',
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
//have a great day
export default Harison24CharacterCard