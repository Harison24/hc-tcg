import HermitCard from './_hermit-card'
import {flipCoin} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class DonutHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'donut_Donut',
			name: 'Donut',
			rarity: 'rare',
			hermitType: 'bot',
			health: 300,
			primary: {
				name: 'Soon',
				cost: ['bot'],
				damage: 30,
				power: null,
			},
			secondary: {
				name: 'Grind',
				cost: ['bot', 'bot'],
				damage: 80,
				power:
					'Flip a Coin.\n\nIf heads, player draws another card at the end of their turn.',
			},
		})
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
			if (coinFlip[0] === 'tails') return target

			const drawCard = currentPlayer.pile.shift()
			if (drawCard) currentPlayer.hand.push(drawCard)

			return target
		})
	}
}

export default DonutHermitCard