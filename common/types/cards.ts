import {PickRequirmentT} from './pick-process'

export type CardRarityT = 'common' | 'rare' | 'ultra_rare'

export type RankT = {
	name: string
	cost: number
}

export type HermitTypeT =
	| 'australian'
	| 'bacon'
	| 'bot'
	| 'cat'
	| 'iceCream'
	| 'minecraft'
	| 'toddler'

export type CardTypeT = 'item' | 'single_use' | 'effect' | 'hermit' | 'health'

export type DamageT = {
	target?: number
	afkTarget?: number
	self?: number
}

export type ProtectionT = {
	target?: number
	backlash?: number
	discard?: boolean
}

export type AttachRequirmentT = {
	target: 'player' | 'opponent'
	type: Array<CardTypeT | 'any'>
	active?: boolean
}

export type AnyCardT = {
	name: string
	type: string
	rarity: CardRarityT
	id: string
	pickOn?: 'attack' | 'apply' | 'followup' | 'use-opponent' | 'use-ally'
	useReqs?: Array<PickRequirmentT>
	pickReqs?: Array<PickRequirmentT>
	attachReq: AttachRequirmentT
}

export type ItemCardT = AnyCardT & {
	type: 'item'
	characterType: HermitTypeT
}

export type EffectCardT = AnyCardT & {
	type: 'effect' | 'single_use'
	description: string
	damage?: DamageT
	protection?: ProtectionT
}

export type HealthCardT = AnyCardT & {
	type: 'health'
	health: number
}

export type HermitAttackT = {
	name: string
	cost: Array<string>
	damage: number
	power: string | null
}

export type HermitCardT = AnyCardT & {
	type: 'hermit'
	characterType: HermitTypeT
	health: number
	primary: HermitAttackT
	secondary: HermitAttackT
}

export type CardInfoT = ItemCardT | EffectCardT | HermitCardT | HealthCardT

export type CardTypesMapT = {
	character: HermitCardT
	item: ItemCardT
	effect: EffectCardT
	single_use: EffectCardT
	health: HealthCardT
}
