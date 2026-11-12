import { useEffect, useState } from "react"
import { mergeSort } from "../algorithms/merge-sort"
import type { Photo } from "../types/photo"
import { ArrowCounterClockwiseIcon, SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react"
import PhotoCard from "../components/MergeSort/PhotoCard"
import SortSelect from "../components/MergeSort/SortSelect"
import type { SortKey } from "../types/merge-sort"
import PhotoPreview from "../components/PhotoInfo/PhotoPreview"

type Props = {
	photos: Photo[]
}

export default function MergeSort({ photos }: Props) {
	const [localPhotos, setLocalPhotos] = useState<Photo[]>(photos)
	const [sortedPhotos, setSortedPhotos] = useState<Photo[]>([])
	const [sortBy, setSortBy] = useState<SortKey>("unsorted")
	const [descending, setDescending] = useState(false)

	useEffect(() => {
		setLocalPhotos(photos)
		setSortedPhotos([])
	}, [photos])

	function initializePhotos() {
		setLocalPhotos([...photos])
		setSortedPhotos([])
		setSortBy("unsorted")
		setDescending(false)
	}

	useEffect(() => {
		if (sortBy === "unsorted") {
			setSortedPhotos([])
			return
		}

		handleSort()
	}, [sortBy, descending])

	function handleSort() {
		if (sortBy != "unsorted") {
			const result = mergeSort(localPhotos, (a, b) => {
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

				// Only sort by the first person in the people array 
				// for simplicity sake.
				if (sortBy === "people") {
					const firstPerson =
						a.people[0]?.facebook ?? a.people[0]?.instagram ?? ""

					const secondPerson =
						b.people[0]?.facebook ?? b.people[0]?.instagram ?? ""

					return descending
						? secondPerson.localeCompare(firstPerson)
						: firstPerson.localeCompare(secondPerson)
				}

				return descending ? -comparison : comparison
			})

			setSortedPhotos(result)
		} else {
			setSortedPhotos([])
		}
	}

	function handleDelete(photoId: number) {
		setLocalPhotos((prev) =>
			prev.filter((photo) => photo.photoId !== photoId)
		)

		setSortedPhotos((prev) =>
			prev.filter((photo) => photo.photoId !== photoId)
		)
		setCurrentPhoto((prev) =>
			prev?.photoId === photoId ? null : prev
		)
	}

	const [currentPhoto, setCurrentPhoto] = useState<Photo | null>()

	function handleSetCurrentPhoto(photo: Photo) {
		setCurrentPhoto(photo)
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
					<button
						onClick={initializePhotos}
						className="button px-4 py-2 flex self-end items-center gap-3">
						<ArrowCounterClockwiseIcon size={20} />
						<p>Regenerate</p>
					</button>
				</div>
			</div>

			<div className="flex gap-8">
				<div className={`h-full grid grid-cols-2 
				    ${currentPhoto
						? "basis-9/12 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
						: "basis-12/12 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"} 
				     gap-4`}>
					{sortedPhotos.length > 0 ? (
						sortedPhotos.map((photo, index) => (
							<PhotoCard
								key={photo.photoId}
								index={index}
								photo={photo}
								sortBy={sortBy}
								onDelete={handleDelete}
								selected={photo.photoId == currentPhoto?.photoId}
								onSelect={handleSetCurrentPhoto}
							/>
						))
					) : (
						localPhotos.map((photo, index) => (
							<PhotoCard
								key={photo.photoId}
								index={index}
								photo={photo}
								sortBy={sortBy}
								onDelete={handleDelete}
								selected={photo.photoId == currentPhoto?.photoId}
								onSelect={handleSetCurrentPhoto}
							/>
						))
					)}
				</div>

				{currentPhoto && (
					<PhotoPreview photo={currentPhoto} sortBy={sortBy} className="sticky top-32 h-[80vh] overflow-scroll" />
				)}
			</div>
		</div>
	)
}
