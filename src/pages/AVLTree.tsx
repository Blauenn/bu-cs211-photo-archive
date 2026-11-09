import { useEffect, useRef, useState } from "react"
import type { Photo } from "../types/photo"
import { AVLTree as AVLTreeStructure, balanceFactor } from "../data-structures/avl-tree"
import { convertAvlTree, NODE_HEIGHT, NODE_WIDTH } from "../utils/avl-tree-ui"
import { ReactFlow, type ReactFlowInstance } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import PhotoNode from "../components/AVLTree/PhotoNode"
import StatusDisplay from "../components/StatusDisplay"
import SearchField from "../components/fields/SearchField"
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react"

type Props = {
	photos: Photo[]
}

const nodeTypes = {
	photo: PhotoNode
}

export default function AVLTree({ photos }: Props) {
	const [avlTree, setAvlTree] = useState<AVLTreeStructure | null>(null)
	const reactFlowInstance = useRef<ReactFlowInstance | null>(null)

	const [_, setRevision] = useState(0)

	function initializeAvlTree() {
		const tree = AVLTreeStructure.from(photos)
		setAvlTree(tree)
	}

	const [search, setSearch] = useState("")
	const [foundPhoto, setFoundPhoto] = useState<Photo | null>(null)

	function handleSearch(value: string) {
		setSearch(value)
		setFoundPhoto(null)

		if (!avlTree || !value.trim()) return

		const photoId = Number(value)

		if (Number.isNaN(photoId)) return

		const photo = avlTree.get(photoId)

		if (!photo) return

		setFoundPhoto(photo)
		centerOnNode(photo.photoId)
	}

	function handleDelete(photoId: number) {
		if (!avlTree) return

		const deleted = avlTree.delete(photoId)

		if (deleted) {
			setRevision(prev => prev + 1)
		}
	}

	useEffect(() => {
		initializeAvlTree()
	}, [photos])

	const root = avlTree?.getRoot() ?? null
	const { nodes, edges } = convertAvlTree(root, handleDelete, foundPhoto)

	function centerOnNode(photoId: number) {
		if (!reactFlowInstance.current) return

		const targetNode = nodes.find(
			node => node.id === String(photoId)
		)

		if (!targetNode) return

		reactFlowInstance.current.setCenter(
			targetNode.position.x + NODE_WIDTH / 2,
			targetNode.position.y + NODE_HEIGHT / 2,
			{
				zoom: 1,
				duration: 500
			}
		)
	}

	useEffect(() => {
		if (root) {
			centerOnNode(root.photo.photoId)
		}
	}, [root])

	return (
		<div className="px-4">
			<div className="flex items-center justify-between gap-6 mb-4">
				<div className="w-full flex flex-col self-end gap-2">
					<p className="font-semibold opacity-50 ml-1">Search</p>
					<SearchField
						value={search}
						onChange={handleSearch}
						placeholder="Search photos by key..."
					/>
				</div>
				<button
					onClick={initializeAvlTree}
					className="button px-4 py-2 flex self-end items-center gap-3">
					<ArrowCounterClockwiseIcon size={20} />
					<p>Regenerate</p>
				</button>
			</div>

			<div className="relative w-full h-[80vh] border border-gray-200 bg-gray-100 rounded-2xl">
				{avlTree && (
					<div className="fixed z-10 bottom-16 right-16 flex items-end flex-row-reverse gap-6">
						<StatusDisplay label="Size" value={avlTree.size} />
						{avlTree.size > 0 && (
							<>
								<StatusDisplay label="Tree height" value={Number(avlTree.treeHeight)} />
								<StatusDisplay
									label="Balance factor"
									value={avlTree.getRoot()
										? balanceFactor(avlTree.getRoot()!)
										: 0}
								/>
							</>
						)}
					</div>
				)}

				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					fitView={nodes.length < 20}
					onInit={(instance) => {
						reactFlowInstance.current = instance
						centerOnNode(root?.photo.photoId)
					}}
					nodesDraggable={false}
					nodesConnectable={false}
				/>
			</div>
		</div>
	)
}
