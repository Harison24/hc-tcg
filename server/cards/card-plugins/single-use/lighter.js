import SingleUseCard from './_single-use-card'
import {discardCard} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

// TODO - Can't use with no active hermit
class LighterSingleUseCard extends SingleUseCard {
	constructor() {
		super({
			id: 'lighter',
			name: 'Lighter',
			rarity: 'common',
			description: 'Discard your hand. Draw 5 cards.\n\nDiscard after use.',
		})
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.applyEffect.tap(this.id, () => {
			const {singleUseInfo, currentPlayer} = game.ds

			if (singleUseInfo?.id === this.id) {
				currentPlayer.hand.forEach((card) => discardCard(game, card))
				for (let i = 0; i < 3; i++) {
					const drawCard = currentPlayer.pile.shift()
					if (drawCard) currentPlayer.hand.push(drawCard)
				}
				return 'DONE'
			}
		})
	}
}

export default LighterSingleUseCard
