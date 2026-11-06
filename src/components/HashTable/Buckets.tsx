import type { HashTable as HashTableStructure } from "../../data-structures/hash-table"
import type { Photo } from "../../types/photo"

type Props = {
	hashTable: HashTableStructure<number, Photo>
}

export default function Buckets({ hashTable }: Props) {
	return (
		<div className="w-full border border-gray-200 rounded-2xl flex flex-col gap-4 p-4">
			{hashTable.getBuckets().map((bucket, index) => (
				<div
					key={index}
					className="grid grid-cols-[max-content_1fr] gap-6"
				>
					{/* Bucket index */}
					<div className="min-w-20 flex items-center justify-end">
						<h1 className="text-4xl font-bold opacity-50">
							{index}
						</h1>
					</div>

					{/* Bucket contents */}
					<div className="min-h-36 w-full flex items-center flex-wrap gap-3 border border-gray-300 bg-gray-100 rounded-2xl px-3 pt-2 pb-1">
						{bucket.map((entry) => (
							<div
								key={entry.key}
								className="flex flex-col items-center gap-3"
							>
								<img
									src={entry.value.photoUrl}
									alt={`photo-${entry.value.photoId}`}
									className="h-24 rounded-lg shadow-md"
								/>
								<p className="text-sm font-semibold opacity-50">
									{entry.key}
								</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
