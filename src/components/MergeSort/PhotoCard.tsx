import { XIcon } from "@phosphor-icons/react";
import type { LocalTime } from "../../types/date";
import type { SortKey } from "../../types/merge-sort";
import type { Photo } from "../../types/photo"
import { convertToLocalTime } from "../../utils/date";
import { formatShutterSpeed } from "../../utils/numbers";

type Props = {
	index: number;
	photo: Photo;
	sortBy: SortKey;
	onDelete: (photoId: number) => void
	selected: boolean
	onSelect: (photo: Photo) => void
}

export default function PhotoCard({ index, photo, sortBy, onDelete, selected, onSelect }: Props) {
	const dateTime: LocalTime = convertToLocalTime(String(photo.dateTimeOriginal))

	const formattedPhoto = {
		photoId: `${photo.photoId}`,
		fileName: `${photo.fileName}`,
		people: photo.people.map((person) => person.facebook || person.instagram).join(", "),
		cameraName: `${photo.cameraName}`,
		cameraModel: `${photo.cameraModel}`,
		lensModel: photo.lensModel.includes("----") ? "N/A" : photo.lensModel,
		exposureTime: `${formatShutterSpeed(photo.exposureTime)}s`,
		aperture: photo.aperture ? `f/${photo.aperture}` : "N/A",
		iso: `ISO ${photo.iso}`,
		shotFocalLength: photo.shotFocalLength ? `${photo.shotFocalLength}mm` : "N/A",
		dateTimeOriginal: `${dateTime.year}.${dateTime.month}.${dateTime.day} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`,
	}

	return (
		<div
			onClick={() => onSelect(photo)}
			className={`
			    ${selected
					? "border-2 border-purple-400/50"
					: "border border-gray-200 hover:border-purple-400/50"
				}
			    relative group border-gray-200 rounded-2xl shadow-sm flex flex-col items-center gap-4 p-3 transition-all duration-100 cursor-pointer`}>
			{sortBy != "unsorted" && (
				<div className="absolute size-10 -left-3 -top-3 z-10 bg-purple-400 text-white p-2 shadow-sm flex items-center justify-center rounded-full">
					<p className={`${String(index).length >= 3
						? "text-xs"
						: "text-sm"}
				    font-semibold`}>
						{index}
					</p>
				</div>
			)}

			<button
				onClick={(event) => {
					event.stopPropagation()
					onDelete(photo.photoId)
				}}
				className="hidden group-hover:block absolute z-50 bg-red-400 rounded-full p-1 -top-2 -right-3 cursor-pointer">
				<XIcon
					size={16} className="text-white" />
			</button>

			<div className="flex-1 flex items-center">
				<img
					src={photo.photoUrl}
					className="w-32 rounded-xl object-cover"
				/>
			</div>

			<p className="w-full line-clamp-2 text-center">
				{sortBy === "unsorted"
					? formattedPhoto.photoId
					: formattedPhoto[sortBy]
				}
			</p>
		</div>
	)
}
