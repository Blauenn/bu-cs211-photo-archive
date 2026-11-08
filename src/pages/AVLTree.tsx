import { useEffect, useState } from "react"
import type { Photo } from "../types/photo"
import { AvlNode, AVLTree as AVLTreeStructure } from "../data-structures/avl-tree"
import { calculateCanvasHeight, calculatePositions, CANVAS_WIDTH, LEVEL_HEIGHT, START_Y } from "../utils/avl-tree-ui"

type Props = {
	photos: Photo[]
}

export default function AVLTree({ photos }: Props) {
	const [avlTree, setAvlTree] = useState<AVLTreeStructure | null>(null)

	function initializeAvlTree() {
		const tree = AVLTreeStructure.from(photos)
		setAvlTree(tree)
	}

	useEffect(() => {
		initializeAvlTree()
	}, [photos])

	const root = avlTree?.getRoot() ?? null
	const nodes = calculatePositions(
		root,
		CANVAS_WIDTH / 2,
		START_Y,
		0
	)

	const canvasWidth = CANVAS_WIDTH
	const canvasHeight = calculateCanvasHeight(
		nodes,
		LEVEL_HEIGHT,
		START_Y
	)

	const getNodePosition = (node: AvlNode) => {
		return nodes.find((item) => item.node === node)?.position
	}

	return (
		<div className="px-4">
			<h1 className="text-2xl font-semibold mb-4">AVL Tree</h1>

			<div className="w-full h-[1024px] overflow-auto border border-gray-200 rounded-2xl pt-16">
				<div
					className="relative"
					style={{
						width: canvasWidth,
						height: canvasHeight
					}}
				>
					<svg
						className="absolute inset-0 pointer-events-none"
						width={canvasWidth}
						height={canvasHeight}
					>
						{nodes.map((item) => {
							const leftChild = item.node.left
								? getNodePosition(item.node.left)
								: undefined

							const rightChild = item.node.right
								? getNodePosition(item.node.right)
								: undefined

							return (
								<g key={item.node.photo.photoId}>
									{leftChild && (
										<line
											x1={item.position.x}
											y1={item.position.y}
											x2={leftChild.x}
											y2={leftChild.y}
											stroke="black"
											strokeWidth={2}
										/>
									)}

									{rightChild && (
										<line
											x1={item.position.x}
											y1={item.position.y}
											x2={rightChild.x}
											y2={rightChild.y}
											stroke="black"
											strokeWidth={2}
										/>
									)}
								</g>
							)
						})}
					</svg>
					{nodes.map((item) => (
						<div
							key={item.node.photo.photoId}
							className="absolute border border-gray-200 flex items-center justify-center rounded-full"
							style={{
								width: 64,
								height: 64,
								left: item.position.x - 64,
								top: item.position.y - 64
							}}
						>
							<p className="text-2xl font-semibold">{item.node.photo.photoId}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
