// O (n log n)
export function mergeSort<T>(
	array: T[],
	compare: (a: T, b: T) => number
): T[] {
	// If there's only 1 element, nothing to sort, skip the sorting
	if (array.length <= 1) {
		return array
	}

	// Split the array in half
	const middle = Math.floor(array.length / 2)
	const left = array.slice(0, middle) // from the first to the middle
	const right = array.slice(middle) // from the middle onwards

	const sortedLeft = mergeSort(left, compare)
	const sortedRight = mergeSort(right, compare)

	// Merge them back together
	return merge(sortedLeft, sortedRight, compare)
}

// O (n + m)
function merge<T>(
	left: T[],
	right: T[],
	compare: (a: T, b: T) => number
): T[] {
	const merged: T[] = []

	let leftIndex = 0
	let rightIndex = 0

	// If there's still elements to be sorted
	while (leftIndex < left.length && rightIndex < right.length) {
		// If left element is less than the right, add the left element
		if (compare(left[leftIndex], right[rightIndex]) <= 0) {
			merged.push(left[leftIndex])
			leftIndex++
		}
		// else, add the right
		else {
			merged.push(right[rightIndex])
			rightIndex++
		}
	}

	// Append the remaining values from either half
	return merged
		.concat(left.slice(leftIndex))
		.concat(right.slice(rightIndex))
}
