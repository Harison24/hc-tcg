import SingleUseCard from './_single-use-card'
import {discardCard} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class RabidDoggoSingleUseCard extends SingleUseCard {
	constructor() {
		super({
			id: 'rabid_doggo',
			name: 'Rabid Doggo',
			rarity: 'rare',
			description:
				'gives RABIES the opposing Character.\n\nDoes an additional +20hp damage per turn until opponent is knocked out.\n\nGoing AFK does not eliminate the POISON. Discard after use.',
		})

		this.useReqs = [
			{target: 'opponent', type: 'character', amount: 1, active: true},
		]
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.applyEffect.tap(this.id, () => {
			const {singleUseInfo, opponentActiveRow, opponentEffectCardInfo} = game.ds
			if (singleUseInfo?.id === this.id) {
				if (opponentActiveRow === null) return 'INVALID'
				if (opponentEffectCardInfo?.id !== 'dr_mario') {
					opponentActiveRow.ailments.push({id: 'rabies', duration: -1})
				}
				return 'DONE'
			}
		})
	}
}

export default RabidDoggoSingleUseCard
