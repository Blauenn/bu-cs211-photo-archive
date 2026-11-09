import { useEffect, useState } from "react"
import { mergeSort } from "../algorithms/merge-sort"
import type { Photo } from "../types/photo"
import { SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react"
import PhotoCard from "../components/MergeSort/PhotoCard"
import SortSelect from "../components/MergeSort/SortSelect"
import type { SortKey } from "../types/merge-sort"

type Props = {
	photos: Photo[]
}

export default function MergeSort({ photos }: Props) {
	const [sortedPhotos, setSortedPhotos] = useState<Photo[]>([])
	const [sortBy, setSortBy] = useState<SortKey>("unsorted")
	const [descending, setDescending] = useState(false)

	useEffect(() => {
		setSortedPhotos([])
	}, [photos])

	useEffect(() => {
		if (sortBy === "unsorted") {
			setSortedPhotos([])
			return
		}

		handleSort()
	}, [sortBy, descending])

	function handleSort() {
		if (sortBy != "unsorted") {
			const result = mergeSort(photos, (a, b) => {
				const first = a[sortBy]
				const second = b[sortBy]

				// Handle null values
				if (first === null) return 1
				if (second === null) return -1

				let comparison = 0

				// Handle dates
				if (sortBy === "dateTimeOriginal") {
					comparison =
						new Date(first).getTime() - new Date(second).getTime()
				} else {
					// Handle numbers and strings
					if (first < second) comparison = -1
					if (first > second) comparison = 1
				}

				return descending ? -comparison : comparison
			})

			setSortedPhotos(result)
		} else {
			setSortedPhotos([])
		}
	}

	return (
		<div className="px-4">
			<div className="flex items-center justify-between gap-6 mb-8">
				<div className="flex items-center gap-2">
					<p className="text-2xl font-semibold">Merge sort <span className="opacity-40">— {!descending ? "Ascending" : "Descending"}</span></p>
				</div>
				<div className="flex gap-4">
					<button
						onClick={() => {
							setDescending(!descending)
						}}
						disabled={sortBy == "unsorted"}
						className={`
						    ${sortBy == "unsorted"
								? "opacity-50"
								: "hover:bg-purple-400 hover:text-white hover:border-transparent cursor-pointer"
							}
						    border border-gray-200 rounded-2xl px-4 py-2 flex items-center gap-3`}
					>
						{/* Ascending showing means click to switch to ascending and vice versa */}
						{descending
							? (
								<>
									<SortAscendingIcon size={20} />
									<p>Sort: Ascending</p>
								</>
							) : (
								<>

									<SortDescendingIcon size={20} />
									<p>Sort: Descending</p>
								</>
							)}
					</button>
					<SortSelect
						value={sortBy}
						onChange={setSortBy}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4">
				{sortedPhotos.length > 0 ? (
					sortedPhotos.map((photo, index) => (
						<PhotoCard
							key={photo.photoId}
							index={index}
							photo={photo}
							sortBy={sortBy}
						/>
					))
				) : (
					photos.map((photo, index) => (
						<PhotoCard
							key={photo.photoId}
							index={index}
							photo={photo}
							sortBy={sortBy}
						/>
					))
				)}
			</div>
		</div>
	)
}
