import HermitCard from './_hermit-card'
import {flipCoin} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class OkuHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'oku',
			name: 'Oku',
			rarity: 'rare',
			characterType: 'australian',
			health: 260,
			primary: {
				name: 'Sonic Lore',
				cost: ['australian', 'australian'],
				damage: 70,
				power: null,
			},
			secondary: {
				name: 'Straight Lunge',
				cost: ['australian'],
				damage: 50,
				power:
					'Flip a Coin.\n\nIf heads, attack damage doubles.\n\nIf tails, its a regular attack.',
			},
		})

		this.headsMultiplier = 2
		this.tailsMultiplier = 0.5
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.attack.tap(this.id, (target, turnAction, attackState) => {
			const {currentPlayer} = game.ds
			const {moveRef, typeAction} = attackState

			if (typeAction !== 'SECONDARY_ATTACK') return target
			if (!target.isActive) return target

			if (moveRef.hermitCard.cardId !== this.id) return target
			const coinFlip = flipCoin(currentPlayer)
			currentPlayer.coinFlips[this.id] = coinFlip

			if (coinFlip[0] === 'heads') {
				target.hermitMultiplier *= this.headsMultiplier
			} else if (coinFlip[0] === 'tails') {
				target.hermitMultiplier *= this.tailsMultiplier
			}

			return target
		})
	}
}

export default OkuHermitCard
