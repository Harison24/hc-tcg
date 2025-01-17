import SingleUseCard from './_single-use-card'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class DiscordSingleUseCard extends SingleUseCard {
	constructor() {
		super({
			id: 'discord',
			name: 'Discord',
			rarity: 'ultra_rare',
			description: 'Player draws 3 cards from deck.\n\nDiscard after use.',
		})
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.applyEffect.tap(this.id, () => {
			const {singleUseInfo, currentPlayer} = game.ds
			if (singleUseInfo?.id === this.id) {
				for (let i = 0; i < 3; i++) {
					const drawCard = currentPlayer.pile.shift()
					if (drawCard) currentPlayer.hand.push(drawCard)
				}
				return 'DONE'
			}
		})
	}
}

export default DiscordSingleUseCard
