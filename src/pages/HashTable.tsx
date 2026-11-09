import { useEffect, useState } from "react"
import type { Photo } from "../types/photo"
import { createHashTable, HashTable as HashTableStructure } from "../data-structures/hash-table"
import { ArrowCounterClockwiseIcon, CaretLeftIcon, CaretRightIcon, MaskSadIcon, XCircleIcon } from "@phosphor-icons/react"
import Buckets from "../components/HashTable/Buckets"
import StatusDisplay from "../components/StatusDisplay"
import SearchField from "../components/fields/SearchField"

type Props = {
	photos: Photo[]
}

export default function HashTable({ photos }: Props) {
	const [hashTable, setHashTable] = useState<HashTableStructure<number, Photo> | null>(null)
	const [tableSize, setTableSize] = useState<number>(5)

	const [search, setSearch] = useState("")
	const [filteredPhoto, setFilteredPhoto] = useState<Photo | null>(null)

	function initializeHashTable() {
		setHashTable(createHashTable(photos, tableSize))
	}

	function handleSearch(value: string) {
		setSearch(value)

		if (!value.trim()) {
			setFilteredPhoto(null)
			return
		}

		const photoId = Number(value)

		if (!Number.isInteger(photoId)) {
			setFilteredPhoto(null)
			return
		}

		setFilteredPhoto(hashTable?.get(photoId) ?? null)
	}

	const [_, setRevision] = useState(0)

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

	return (
		<div className="relative px-4">
			{hashTable && (
				<div className="fixed z-10 bottom-8 right-8 flex items-end flex-row-reverse gap-6">
					<StatusDisplay label="Size" value={hashTable.size} />
					{hashTable.size > 0 && (
						<StatusDisplay label="Load factor" value={Number(hashTable.loadFactor.toFixed(2))} />
					)}
				</div>
			)}

			{hashTable && (
				<div className="flex items-center justify-between gap-6 mb-4">
					<div className="w-full flex flex-col self-end gap-2">
						<p className="font-semibold opacity-50 ml-1">Search</p>
						<SearchField
							value={search}
							onChange={handleSearch}
							placeholder="Search photos by key..."
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex flex-col self-end gap-2">
							<p className="font-semibold opacity-50 ml-1">Size</p>
							<div
								className={`w-32 field flex items-center gap-2 border focus-within:border-purple-400`}>
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

								<div className="translate-x-1 flex">
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
										className="-translate-x-1 cursor-pointer opacity-50 hover:text-purple-400 hover:opacity-100 transition-all duration-100"
									>
										<CaretRightIcon size={20} weight="duotone" />
									</button>
								</div>
							</div>
						</div>
						<button
							onClick={initializeHashTable}
							className="button px-4 py-2 flex self-end items-center gap-3">
							<ArrowCounterClockwiseIcon size={20} />
							<p>Regenerate</p>
						</button>
					</div>
				</div>
			)}

			{hashTable ? (
				<Buckets hashTable={hashTable} filteredPhoto={filteredPhoto} search={search} setRevision={setRevision} />
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
