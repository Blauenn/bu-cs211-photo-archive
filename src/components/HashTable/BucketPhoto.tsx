import { XIcon } from "@phosphor-icons/react"
import type { Entry as EntryStructure, HashTable as HashTableStructure } from "../../data-structures/hash-table"
import type { Photo } from "../../types/photo"

type Props = {
	highlight: boolean;
	hashTable: HashTableStructure<number, Photo>;
	entry: EntryStructure<number, Photo>;
	onDelete: () => void
	selected: boolean
	onSelect: (photo: Photo) => void
}

export default function BucketPhoto({ highlight, hashTable, entry, onDelete, selected, onSelect }: Props) {
	function handleDelete() {
		if (hashTable.delete(entry.key)) {
			onDelete()
		}
	}

	return (
		<div
			onClick={() => { onSelect(entry.value) }}
			className={`
			    
			    group relative rounded-xl flex flex-col items-center gap-2 transition-all duration-100 cursor-pointer`}
		>
			<button
				onClick={(event) => {
					event.stopPropagation()
					handleDelete()
				}}
				className="hidden group-hover:block absolute z-50 bg-red-400 rounded-full p-1 -top-2 -right-3 cursor-pointer">
				<XIcon
					size={14} className="text-white" />
			</button>
			<img
				src={entry.value.photoUrl}
				alt={`photo-${entry.value.photoId}`}
				className={`shadow-md
				    ${selected
						? "border-2 border-purple-400"
						: "group-hover:border-2 group-hover:border-purple-400"
					}
				    ${highlight
						? "h-40 rounded-xl border-2 border-yellow-400"
						: "h-24 rounded-lg"}
				transition-all duration-100`}
			/>
			<p className={`text-sm font-semibold px-4 py-1 rounded-lg
			    ${selected
					? "bg-purple-400 text-white"
					: "group-hover:bg-purple-400 group-hover:text-white"
				}
			    ${highlight
					? "bg-yellow-400"
					: ""
				} transition-all duration-100`}>
				<span className={`${selected
					? "opacity-100"
					: "opacity-50 group-hover:opacity-100"}
				    `}>
					{entry.key}
				</span>
			</p>
		</div>
	)
}
