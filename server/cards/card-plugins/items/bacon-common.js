import ItemCard from './_item-card'

class BaconCommonItemCard extends ItemCard {
	constructor() {
		super({
			id: 'item_bacon_common',
			name: 'Bacon',
			rarity: 'common',
			characterType: 'bacon',
		})
	}

	register(game) {}
}

export default BaconCommonItemCard
