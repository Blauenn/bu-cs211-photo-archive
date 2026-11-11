import type { AvlNode } from "../data-structures/avl-tree"
import type { Photo } from "./photo"
import type { Node } from "@xyflow/react";

type NodeHTMLPosition = {
	x: number
	y: number
}

export type TraversedNode = {
	node: AvlNode
	depth: number
	position: NodeHTMLPosition
}

export type PhotoNodeData = Photo & {
	balanceFactor: number
	isHighlighted: boolean
	onDelete: (photoId: number) => void
	onSelect: (photo: Photo) => void
	currentPhoto: Photo | null | undefined
}

export type PhotoNode = Node<PhotoNodeData, "photo">
