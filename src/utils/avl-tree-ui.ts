import type { AvlNode } from "../data-structures/avl-tree";
import type { TraversedNode } from "../types/avl-tree-ui";

// Traversals will put all the values within the array...
// into nodes in their respective method.
// For UI use.

export function preOrderTraversal(
	node: AvlNode | null,
	depth = 0,
	nodes: TraversedNode[] = []
) {
	if (!node) return nodes

	nodes.push({
		node: node,
		depth: depth,
		position: {
			x: 0,
			y: 0
		}
	})

	preOrderTraversal(node.left, depth + 1, nodes)
	preOrderTraversal(node.right, depth + 1, nodes)

	return nodes
}

export function inOrderTraversal(
	node: AvlNode | null,
	depth = 0,
	nodes: TraversedNode[] = []
): TraversedNode[] {
	if (!node) return nodes

	inOrderTraversal(node.left, depth + 1, nodes)

	nodes.push({
		node,
		depth,
		position: {
			x: 0,
			y: 0
		}
	})

	inOrderTraversal(node.right, depth + 1, nodes)

	return nodes
}

export const CANVAS_WIDTH = 1024
export const LEVEL_HEIGHT = 96
export const START_Y = 64
export const NODE_RADIUS = 24
export const NODE_SPACING = 128
export const INITIAL_OFFSET = 128

export function calculateCanvasHeight(
	nodes: TraversedNode[],
	levelHeight: number,
	startY: number
) {
	const maxDepth = Math.max(
		...nodes.map((item) => item.depth),
		0
	)

	return startY + maxDepth * levelHeight + 50
}

export function calculatePositions(
	node: AvlNode | null,
	x: number,
	y: number,
	depth: number,
	nodes: TraversedNode[] = []
): TraversedNode[] {
	if (!node) return nodes

	nodes.push({
		node,
		depth,
		position: {
			x,
			y
		}
	})

	const nextOffset = INITIAL_OFFSET * Math.pow(2, depth)

	if (node.left) {
		calculatePositions(
			node.left,
			x - nextOffset,
			y + LEVEL_HEIGHT,
			depth + 1,
			nodes
		)
	}

	if (node.right) {
		calculatePositions(
			node.right,
			x + nextOffset,
			y + LEVEL_HEIGHT,
			depth + 1,
			nodes
		)
	}

	return nodes
}
