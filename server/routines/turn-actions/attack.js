import CARDS from '../../cards'
import STRENGTHS from '../../const/strengths'
import {applySingleUse, discardCard} from '../../utils'

/**
 * @typedef {import("models/game-model").GameModel} GameModel
 * @typedef {import("redux-saga").SagaIterator} SagaIterator
 */

export const ATTACK_TO_ACTION = {
	primary: 'PRIMARY_ATTACK',
	secondary: 'SECONDARY_ATTACK',
	zero: 'ZERO_ATTACK',
}

export const WEAKNESS_DAMAGE = 20

/**
 * @param {GameModel} game
 * @param {*} turnAction
 * @param {ActionState} actionState
 * @return {SagaIterator}
 */
function* attackSaga(game, turnAction, actionState) {
	const {
		currentPlayer,
		opponentPlayer,
		playerActiveRow,
		opponentActiveRow,
		playerCharacterInfo,
	} = game.ds
	const {pickedCardsInfo} = actionState
	const {type} = turnAction.payload
	const typeAction = ATTACK_TO_ACTION[type]
	if (!typeAction) {
		console.log('Unknown attack type: ', type)
		return 'INVALID'
	}
	// TODO - send hermitCard from frontend for validation?

	const attackerActiveRow = playerActiveRow

	const singleUseCard = !currentPlayer.board.singleUseCardUsed
		? currentPlayer.board.singleUseCard
		: null

	if (!attackerActiveRow) return 'INVALID'

	const attackerCharacterCard = attackerActiveRow.characterCard
	const attackerCharacterInfo = CARDS[attackerCharacterCard.cardId]
	if (!attackerCharacterInfo) return 'INVALID'
	const strengths = STRENGTHS[attackerCharacterInfo.characterType]

	const makeTarget = (row) => ({
		row,
		applyHermitDamage: row === opponentActiveRow,
		attackerRow: playerActiveRow,
		effectCardId: row.effectCard?.cardId,
		attackerEffectCardId: playerActiveRow.effectCard?.cardId,
		isActive: row === opponentActiveRow,
		extraEffectDamage: 0,
		extraHermitDamage: 0,
		recovery: [], // Array<{amount: number, discardEffect: boolean}>
		ignoreEffects: false,
		reverseDamage: false,
		backlash: 0,
		multiplier: 1,
	})

	const targets = {}

	// Add active row
	if (opponentActiveRow?.characterCard) {
		const instance = opponentActiveRow.characterCard.cardInstance
		targets[instance] = makeTarget(opponentActiveRow)
	}

	// Add picked targets (generally AFK bow/hypno)
	Object.values(pickedCardsInfo).forEach((pickedCards) => {
		if (!pickedCards.length) return
		const firstCard = pickedCards[0]
		if (firstCard.slotType !== 'character') return
		if (firstCard.playerId !== opponentPlayer.id) return
		if (!firstCard.row.characterCard) return
		const instance = firstCard.card.cardInstance
		if (Object.hasOwn(targets, instance)) return
		targets[instance] = makeTarget(firstCard.row)
	})
	if (!Object.values(targets).length) return 'INVALID'

	for (let id in targets) {
		const target = targets[id]
		const result = game.hooks.attack.call(target, turnAction, {
			...actionState,
			typeAction,
			attackerActiveRow,
			attackerCharacterCard,
			attackerCharacterInfo,
		})
		const targetCharacterInfo = CARDS[target.row.characterCard.cardId]
		const characterAttack = target.applyCharacterDamage
			? attackerCharacterInfo[type]?.damage || 0
			: 0

		/* --- Damage to target --- */
		const health = target.row.health
		const maxHealth = targetCharacterInfo.health
		const targetEffectInfo = CARDS[target.row.effectCard?.cardId]
		const protection = target.ignoreEffects
			? 0
			: targetEffectInfo?.protection?.target || 0
		const weaknessDamage =
			strengths.includes(targetCharacterInfo.characterType) &&
			characterAttack + target.extraCharacterDamage > 0
				? WEAKNESS_DAMAGE
				: 0
		const totalDamage =
			target.multiplier *
				(characterAttack + target.extraCharacterDamage + weaknessDamage) +
			target.extraEffectDamage

		const finalDamage = Math.max(totalDamage - protection, 0)

		const targetResult = {
			row: target.row,
			totalDamage,
			finalDamage,
			revived: false,
			died: false,
		}

		// Discard single use protective cards (Shield/Gold Armor)
		if (
			totalDamage > 0 &&
			targetEffectInfo?.protection?.discard &&
			!target.reverseDamage
		) {
			discardCard(game, target.row.effectCard)
		}

		// Deal damage
		if (!target.reverseDamage) {
			target.row.health = Math.min(maxHealth, health - finalDamage)
		}

		/* --- Revival (Totem/Scar) --- */

		target.recovery.sort((a, b) => b.amount - a.amount)

		const isDead = target.row.health <= 0
		const recovery = target.recovery[0]
		const ignoreRecovery = target.ignoreEffects && recovery?.discardEffect
		if (isDead) targetResult.died = true
		if (isDead && recovery) {
			if (!ignoreRecovery) {
				target.row.health = recovery.amount
				target.row.ailments = []
				targetResult.revived = true
				targetResult.died = false
			}
			if (recovery.discardEffect) discardCard(game, target.row.effectCard)
		}

		/* --- Counter attack (TNT/Thorns/Wolf/Zed) --- */

		const attackerEffectInfo = CARDS[playerActiveRow.effectCard?.cardId]
		const attackerProtection = attackerEffectInfo?.protection?.target || 0
		const attackerBacklash = targetEffectInfo?.protection?.backlash || 0

		// from su effects & special movs
		let totalDamageToAttacker = target.backlash
		// from opponent's effects
		if (!target.ignoreEffects && !target.reverseDamage && totalDamage > 0)
			totalDamageToAttacker += attackerBacklash
		// hacky flag for Zedaph
		if (target.reverseDamage) totalDamageToAttacker += totalDamage
		// protection
		let finalDamageToAttacker = totalDamageToAttacker
		if (attackerProtection) {
			finalDamageToAttacker = Math.max(
				totalDamageToAttacker - attackerProtection,
				0
			)
		}

		// We don't need to worry about revival of attacker here
		// since there is no way to lose the totem effect card while attacking

		// Discard single use protective cards (Shield/Gold Armor)
		if (totalDamageToAttacker > 0 && attackerEffectInfo?.protection?.discard) {
			discardCard(game, playerActiveRow.effectCard)
		}

		const attackMaxHealth = attackerCharacterInfo.health
		attackerActiveRow.health = Math.min(
			attackMaxHealth,
			attackerActiveRow.health - finalDamageToAttacker
		)

		targetResult.totalDamageToAttacker = totalDamageToAttacker
		targetResult.finalDamageToAttacker = finalDamageToAttacker

		game.hooks.attackResult.call(targetResult, turnAction, {
			...actionState,
			typeAction,
			attackerActiveRow,
			attackerCharacterCard,
			attackerCharacterInfo,
		})
	}

	const anyEffectDamage = Object.values(targets).some(
		(target) => target.extraEffectDamage
	)
	if (anyEffectDamage) applySingleUse(currentPlayer)

	// --- Provide result of attack ---

	return 'DONE'
}

export default attackSaga
