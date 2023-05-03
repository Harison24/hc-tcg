import HermitCard from './_hermit-card'
import {flipCoin, discardCard} from '../../../utils'

/**
 * @typedef {import('models/game-model').GameModel} GameModel
 */

class CrackKittyHermitCard extends HermitCard {
	constructor() {
		super({
			id: 'andrew_CrackKitty',
			name: 'Crack Kitty',
			rarity: 'rare',
			hermitType: 'cat',
			health: 280,
			primary: {
				name: 'Cocaine',
				cost: ['any'],
				damage: 40,
				power: null,
			},
			secondary: {
				name: 'Feral',
				cost: ['cat', 'any'],
				damage: 80,
				power:
					'Flip a Coin.\n\nIf heads, this attack give the opponent RABIES. Does an additional +20HP damage per turn until opponent is knocked out.\n\nGoing AFK does not eliminate the RABIES.',
			},
		})
	}

	/**
	 * @param {GameModel} game
	 */
	register(game) {
		game.hooks.attack.tap(this.id, (target, turnAction, attackState) => {
			const {currentPlayer, opponentActiveRow, opponentEffectCardInfo} = game.ds
			const {moveRef, typeAction} = attackState

			if (typeAction !== 'SECONDARY_ATTACK') return target
			if (!target.isActive) return target
			if (moveRef.hermitCard.cardId !== this.id) return target

			const coinFlip = flipCoin(currentPlayer)
			currentPlayer.coinFlips[this.id] = coinFlip

			if (coinFlip[0] === 'heads') {
				const hasMilkBucket = target.row.effectCard?.cardId === 'dr_mario'
				const hasDamageEffect = target.row.ailments.some((a) =>
					['fire', 'poison'].includes(a.id)
				)
				if (!hasMilkBucket && !hasDamageEffect) {
					target.row.ailments.push({id: 'poison', duration: -1})
				}
			}

			return target
		})
	}
}

export default CrackKittyHermitCard
