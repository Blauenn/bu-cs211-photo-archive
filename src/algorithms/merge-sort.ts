export function mergeSort<T>(
	array: T[],
	compare: (a: T, b: T) => number
): T[] {
	if (array.length <= 1) {
		return array
	}

	const middle = Math.floor(array.length / 2)
	const left = array.slice(0, middle)
	const right = array.slice(middle)

	const sortedLeft = mergeSort(left, compare)
	const sortedRight = mergeSort(right, compare)

	return merge(sortedLeft, sortedRight, compare)
}

function merge<T>(
	left: T[],
	right: T[],
	compare: (a: T, b: T) => number
): T[] {
	const merged: T[] = []

	let leftIndex = 0
	let rightIndex = 0

	while (leftIndex < left.length && rightIndex < right.length) {
		if (compare(left[leftIndex], right[rightIndex]) <= 0) {
			merged.push(left[leftIndex])
			leftIndex++
		} else {
			merged.push(right[rightIndex])
			rightIndex++
		}
	}

	return merged
		.concat(left.slice(leftIndex))
		.concat(right.slice(rightIndex))
}
