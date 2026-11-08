import type { AvlNode } from "../data-structures/avl-tree"

type NodeHTMLPosition = {
	x: number
	y: number
}

export type TraversedNode = {
	node: AvlNode
	depth: number
	position: NodeHTMLPosition
}
