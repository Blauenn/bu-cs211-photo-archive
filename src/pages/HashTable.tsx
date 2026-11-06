import { useEffect, useState } from "react"
import type { Photo } from "../types/photo"
import { createHashTable, HashTable as HashTableStructure } from "../data-structures/hash-table"
import { ArrowCounterClockwiseIcon, CaretLeftIcon, CaretRightIcon, MaskSadIcon, XCircleIcon } from "@phosphor-icons/react"
import Buckets from "../components/HashTable/Buckets"

type Props = {
	photos: Photo[]
}

export default function HashTable({ photos }: Props) {
	const [hashTable, setHashTable] = useState<HashTableStructure<number, Photo> | null>(null)

	const [search, setSearch] = useState<string>("")
	const [tableSize, setTableSize] = useState<number>(5)

	// Update table size when new JSON is uploaded.
	useEffect(() => {
		setTableSize(Math.max(1, Math.ceil(photos.length / 1.5)))
	}, [photos])

	useEffect(() => {
		const table = new HashTableStructure<number, Photo>(tableSize)

		for (const photo of photos) {
			table.insert(photo.photoId, photo)
		}

		setHashTable(table)
	}, [photos, tableSize])

	function initializeHashTable() {
		setHashTable(createHashTable(photos, tableSize))
	}



	return (
		<div className="px-4">
			{hashTable && (
				<div className="flex items-center justify-between gap-6 mb-4">
					<div className="w-full flex flex-col self-end gap-2">
						<p className="font-semibold opacity-50 ml-1">Search</p>
						<div
							className={`field flex items-center gap-2 border focus-within:border-purple-400`}
						>
							<input
								placeholder="Search photos..."
								value={search}
								onChange={(event) => {
									setSearch(event.target.value);
								}}
								className="flex-1 outline-none"
							/>

							<button
								type="button"
								onClick={() => setSearch("")}
								className="cursor-pointer opacity-50 hover:text-red-400 hover:opacity-100 transition-all duration-100"
							>
								<XCircleIcon size={20} />
							</button>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex self-end gap-2">
							<div className="">
								<div
									onClick={initializeHashTable}
									className="button px-4 py-2 flex items-center gap-4">
									<ArrowCounterClockwiseIcon size={20} />
									<p>Regenerate</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col self-end gap-2">
							<p className="font-semibold opacity-50 ml-1">Size</p>
							<div
								className={`w-32 field flex items-center gap-2 border focus-within:border-purple-400`}
							>
								<input
									value={tableSize}
									className="flex-1 min-w-0 outline-none"
									onChange={(event) => {
										const value = Number(event.target.value)

										if (Number.isNaN(value) || value < 1) {
											setTableSize(1)
											return
										}

										setTableSize(value)
									}}
									onKeyDown={(event) => {
										if (event.key === "ArrowUp" || event.key === "ArrowRight") {
											event.preventDefault()
											setTableSize((prev) => prev + 1)
										}

										if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
											event.preventDefault()
											setTableSize((prev) => Math.max(1, prev - 1))
										}
									}}
								/>

								<div className="flex">
									<button
										type="button"
										onClick={() => {
											setTableSize((prev) => Math.max(1, prev - 1))
										}}
										className="cursor-pointer opacity-50 hover:text-purple-400 hover:opacity-100 transition-all duration-100"
									>
										<CaretLeftIcon size={20} weight="duotone" />
									</button>
									<button
										type="button"
										onClick={() => {
											setTableSize((prev) => prev + 1)
										}}
										className="cursor-pointer opacity-50 hover:text-purple-400 hover:opacity-100 transition-all duration-100"
									>
										<CaretRightIcon size={20} weight="duotone" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{hashTable ? (
				<Buckets hashTable={hashTable} />
			) : (

				<div className="mt-32 min-w-screen flex flex-col items-center justify-center gap-8">
					<MaskSadIcon size={64} weight="duotone" className="opacity-50" />
					<h1 className="text-2xl opacity-50">No hash table</h1>
					<div
						onClick={initializeHashTable}
						className="button px-8 py-4 flex items-center gap-4">
						<p className="text-xl font-semibold">Genetate hash table</p>
					</div>
				</div>
			)}
		</div>
	)
}
