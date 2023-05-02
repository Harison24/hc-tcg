import HermitCard from './_hermit-card'
import {flipCoin} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class GoglinHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'hoglin',
			name: 'Hoglin',
			rarity: 'rare',
			characterType: 'bacon',
			health: 290,
			primary: {
				name: 'Charge',
				cost: ['bacon'],
				damage: 50,
				power: null,
			},
			secondary: {
				name: 'Fling',
				cost: ['bacon', 'bacon'],
				damage: 80,
				power:
					'After attack, opponent is forced to replace active Character with Benched Character.\n\nIf there are no Benched Characters, active Character remains in battle.',
			},
		})
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.attack.tap(this.id, (target, turnAction, attackState) => {
			const {opponentPlayer, opponentActiveRow} = game.ds
			const {moveRef, typeAction} = attackState

			if (typeAction !== 'SECONDARY_ATTACK') return target
			if (!target.isActive) return target
			if (moveRef.hermitCard.cardId !== this.id) return target

			const hasOtherHermits =
				opponentPlayer.board.rows.filter((row) => !!row.hermitCard).length > 1
			if (!hasOtherHermits || !opponentActiveRow) return target
			opponentActiveRow.ailments.push({id: 'knockedout', duration: 1})
			opponentPlayer.board.activeRow = null

			return target
		})
	}
}

export default HoglinHermitCard
