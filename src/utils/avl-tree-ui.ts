import type { Edge } from "@xyflow/react";
import type { AvlNode } from "../data-structures/avl-tree";
import dagre from "@dagrejs/dagre";
import type { PhotoNode } from "../types/avl-tree-ui";


const NODE_WIDTH = 128
const NODE_HEIGHT = 128

const NODE_GAP = 40
const LEVEL_GAP = 100


export function convertAvlTree(root: AvlNode | null, onDelete: (photoId: number) => void) {
	const nodes: PhotoNode[] = []
	const edges: Edge[] = []

	// Traverse in preorder
	function traverse(node: AvlNode | null) {
		if (!node) return

		// Add current node
		nodes.push({
			id: String(node.photo.photoId),
			type: "photo",
			position: { x: 0, y: 0 },
			data: {
				...node.photo,
				onDelete
			},
		})

		// Connect its children 
		// Using source to point to parent.
		// Using target to point to child/ren.
		if (node.left) {
			edges.push({
				id: `${node.photo.photoId}-${node.left.photo.photoId}`,
				source: String(node.photo.photoId),
				target: String(node.left.photo.photoId),
				type: "smoothstep"
			})
		}

		if (node.right) {
			edges.push({
				id: `${node.photo.photoId}-${node.right.photo.photoId}`,
				source: String(node.photo.photoId),
				target: String(node.right.photo.photoId),
				type: "smoothstep"
			})
		}

		traverse(node.left)
		traverse(node.right)
	}

	traverse(root)

	const graph = new dagre.graphlib.Graph()
	graph.setDefaultEdgeLabel(() => ({}))
	graph.setGraph({
		rankdir: "TB",
		nodesep: 4,
		ranksep: 4
	})

	// Set each node position
	for (const node of nodes) {
		graph.setNode(node.id, {
			width: NODE_WIDTH,
			height: NODE_HEIGHT
		})
	}

	for (const edge of edges) {
		graph.setEdge(edge.source, edge.target)
	}

	if (root) {
		const totalWidth = calculateSubtreeWidth(root)

		calculatePositions(
			root,
			totalWidth / 2,
			0,
			nodes
		)
	}

	return { nodes, edges }
}

function calculateSubtreeWidth(node: AvlNode | null): number {
	if (!node) return 0

	const leftWidth = calculateSubtreeWidth(node.left)
	const rightWidth = calculateSubtreeWidth(node.right)

	if (node.left && node.right) {
		return leftWidth + NODE_GAP + rightWidth
	}

	return Math.max(NODE_WIDTH, leftWidth, rightWidth)
}

function calculatePositions(
	node: AvlNode | null,
	x: number,
	y: number,
	nodes: PhotoNode[]
): void {
	if (!node) return

	const leftWidth = calculateSubtreeWidth(node.left)
	const rightWidth = calculateSubtreeWidth(node.right)

	const currentNode = nodes.find(
		item => item.id === String(node.photo.photoId)
	)

	if (currentNode) {
		currentNode.position = {
			x: x - NODE_WIDTH / 2,
			y
		}
	}

	if (node.left) {
		const leftX = x - (rightWidth + NODE_GAP) / 2

		calculatePositions(
			node.left,
			leftX,
			y + NODE_HEIGHT + LEVEL_GAP,
			nodes
		)
	}

	if (node.right) {
		const rightX = x + (leftWidth + NODE_GAP) / 2

		calculatePositions(
			node.right,
			rightX,
			y + NODE_HEIGHT + LEVEL_GAP,
			nodes
		)
	}
}
