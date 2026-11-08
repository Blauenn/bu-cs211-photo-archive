import { XIcon } from "@phosphor-icons/react"
import type { Entry as EntryStructure, HashTable as HashTableStructure } from "../../data-structures/hash-table"
import type { Photo } from "../../types/photo"

type Props = {
	highlight: boolean;
	hashTable: HashTableStructure<number, Photo>;
	entry: EntryStructure<number, Photo>;
	onDelete: () => void
}

export default function BucketPhoto({ highlight, hashTable, entry, onDelete }: Props) {
	function handleDelete() {
		if (hashTable.delete(entry.key)) {
			onDelete()
		}
	}

	return (
		<div
			className="group relative flex flex-col items-center gap-2"
		>
			<button
				onClick={handleDelete}
				className="hidden group-hover:block absolute z-50 bg-red-400 rounded-full p-1 -top-2 -right-3 cursor-pointer">
				<XIcon
					size={14} className="text-white" />
			</button>
			<img
				src={entry.value.photoUrl}
				alt={`photo-${entry.value.photoId}`}
				className={`shadow-md 
				    ${highlight
						? "h-40 rounded-xl border-2 border-yellow-400"
						: "h-24 rounded-lg"}
				`}
			/>
			<p className={`text-sm font-semibold px-4 py-1 rounded-lg
			    ${highlight ? "bg-yellow-400" : "opacity-50"}`}>
				{entry.key}
			</p>
		</div>
	)
}
