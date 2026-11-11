import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import type { Photo } from "../../types/photo"
import { XIcon } from "@phosphor-icons/react"
import type { PhotoNodeData } from "../../types/avl-tree-ui"

export default function PhotoNode({ data }: NodeProps<Node<PhotoNodeData, "photo">>) {
	const photo = data as Photo

	const isSelected = data.currentPhoto?.photoId === data.photoId

	function handleSelect() {
		data.onSelect(data)
	}

	function handleDelete() {
		data.onDelete(data.photoId)
	}

	return (
		<div
			onClick={(event) => {
				event.stopPropagation()
				handleSelect()
			}}
			className={`shadow-md 
			    ${isSelected
					? "border-2 border-purple-400"
					: "hover:border-2 hover:border-purple-400"}
			    ${data.isHighlighted
					? "bg-yellow-400 border-transparent"
					: "border-gray-200"
				}
			    border rounded-2xl bg-white transition-all duration-100`}
		>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={false}
			/>

			<div
				className="group relative flex flex-col items-center justify-center gap-1 p-2 hover:cursor-default"
			>
				<button
					onClick={handleDelete}
					className="hidden group-hover:block absolute z-50 bg-red-400 rounded-full p-1 -top-2 -right-3 cursor-pointer">
					<XIcon
						size={14} className="text-white" />
				</button>
				<img
					src={photo.photoUrl}
					className="h-16 rounded-xl mb-1"
				/>
				<p className="text-sm font-semibold opacity-50">{photo.photoId}</p>
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={false}
			/>
		</div>
	)
}
