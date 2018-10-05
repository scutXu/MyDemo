import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const max = Math.max(width, height);
const min = Math.min(width, height);

export function alignToWidth(ratio) {
	return width * ratio;
}

export function alighToHeight(ratio) {
	return height * ratio;
}

export function alighToMin(ratio) {
	return min * ratio;
}

export function alighToMax(ratio) {
	return max * ratio;
}

export const FONT_SIZE = {
	h1: alighToMin(0.1),
	h2: alighToMin(0.06),
};
