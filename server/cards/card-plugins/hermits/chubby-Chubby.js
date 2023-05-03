import HermitCard from './_hermit-card'
import {HERMIT_CARDS} from '../../../cards'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class ChubbyHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'chubby-Chubby',
			name: 'Chubby',
			rarity: 'ultra_rare',
			characterType: 'australian',
			health: 260,
			primary: {
				name: 'Peratacly',
				cost: ['australian'],
				damage: 50,
				power: 'Does double damage against Andrews',
			},
			secondary: {
				name: 'That Moment',
				cost: ['australian','australian'],
				damage: 70,
				power:
					'THIS CODE WENT ON VACATION, SORRY FOR THE INCONVINENCE.',
			},
		})
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.attack.tap(this.id, (target, turnAction, attackState) => {
			const {moveRef, typeAction} = attackState

			if (typeAction !== 'PRIMARY_ATTACK') return target
			if (!target.isActive) return target
			if (moveRef.hermitCard.cardId !== this.id) return target

			const targetHermitInfo = HERMIT_CARDS[target.row.hermitCard.cardId]
			if (targetHermitInfo.id.startsWith === ('andrew')) {
				target.hermitMultiplier *= 2
			}

			return target
		})
	}
}

export default ChubbyHermitCard
