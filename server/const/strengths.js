/**
 * @typedef {import('common/types/cards').HermitTypeT} HermitTypeT
 */

/** @type {Record<HermitTypeT, Array<HermitTypeT>>} */
const Strengths = {
	australian: ['bacon'],
	bacon: ['iceCream'],
	bot: ['minecraft'],
	cat: ['bot','iceCream'],
	iceCream: ['toddler', 'bot'],
	toddler: ['australian', 'cat'],
	minecraft: ['toddler','australian'],
}

export default Strengths
