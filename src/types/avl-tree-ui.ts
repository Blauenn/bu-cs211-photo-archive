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
	onDelete: (photoId: number) => void
}

export type PhotoNode = Node<PhotoNodeData, "photo">
