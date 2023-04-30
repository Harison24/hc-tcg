import CharacterCard from './_character-card'
import {flipCoin} from '../../../utils'
import {CHARACTER_CARDS} from '../../../cards'
/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class ChubbyCharacterCard extends CharacterCard {
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
/*
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.attack.tap(this.id, (target, turnAction, attackState) => {
			const {moveRef, typeAction} = attackState

			if (typeAction !== 'PRIMARY_ATTACK') return target
			if (!target.isActive) return target
			if (moveRef.hermitCard.cardId !== this.id) return target

			const targetCharacterInfo = CHARACTER_CARDS[target.row.characterCard.cardId]
			if (targetCharacterInfo.cardId.startsWith('andrew')) {
				target.characterMultiplier *= 2
			}

			return target
		})
	}
}
export default ChubbyCharacterCard
