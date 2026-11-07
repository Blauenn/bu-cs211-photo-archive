import React, { type SetStateAction } from "react"
import { HashTable as HashTableStructure } from "../../data-structures/hash-table"
import type { Photo } from "../../types/photo"
import BucketPhoto from "./BucketPhoto"

type Props = {
	hashTable: HashTableStructure<number, Photo>;
	filteredPhoto: Photo | null;
	search: string;
	setRevision: React.Dispatch<SetStateAction<number>>
}

export default function Buckets({ hashTable, filteredPhoto, search, setRevision }: Props) {
	return (
		<div className="w-full border border-gray-200 rounded-2xl flex flex-col gap-4 p-4">
			{search.trim() && !filteredPhoto ? (
				<div className="">
					<p className="opacity-50 italic">No photo found.</p>
				</div>
			) : (
				hashTable.getBuckets().map((bucket, index) => {
					const isEmpty = bucket.length === 0
					const isTargetBucket =
						filteredPhoto !== null &&
						filteredPhoto.photoId % hashTable.getCapacity() === index

					// When searching, hide every bucket except the target.
					if (search.trim() && !isTargetBucket) {
						return null
					}

					return (
						<div
							key={index}
							className={`grid grid-cols-[max-content_1fr] gap-6 ${isEmpty ? "opacity-40" : ""}`}
						>
							{/* Bucket index */}
							<div className="min-w-20 flex items-center justify-end">
								<h1 className={`${isEmpty ? "text-xl" : "text-4xl"} font-bold opacity-50`}>
									{index}
								</h1>
							</div>

							{/* Bucket contents */}
							<div className={`${isEmpty ? "min-h-12" : "min-h-36"} w-full flex items-center flex-wrap gap-3 border border-gray-300 bg-gray-100 rounded-2xl px-3 pt-2 pb-1`}>
								{bucket.map((entry) => {
									let highlight = false

									if (entry.key == parseInt(search)) {
										highlight = true
									}

									return (
										<BucketPhoto
											key={entry.key}
											highlight={highlight}
											hashTable={hashTable}
											entry={entry}
											onDelete={() => setRevision(prev => prev + 1)}
										/>
									)
								}

								)}
							</div>
						</div>
					)
				})
			)}
		</div>
	)
}
