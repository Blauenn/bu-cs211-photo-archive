import {
	HashIcon,
	CameraIcon,
	TimerIcon,
	ApertureIcon,
	LightbulbIcon,
	MountainsIcon,
	CalendarIcon,
	FloppyDiskIcon,
} from "@phosphor-icons/react"
import type { Photo } from "../../types/photo"
import PhotoInfoRow from "./PhotoInfoRow"
import { convertToLocalTime } from "../../utils/date"
import { formatShutterSpeed } from "../../utils/numbers"
import type { SortKey } from "../../types/merge-sort"

type Props = {
	photo: Photo
	sortBy?: SortKey
	className?: string
}

export default function PhotoPreview({ photo, sortBy, className }: Props) {
	const dateTime = convertToLocalTime(String(photo.dateTimeOriginal))

	return (
		<div className={`
		    ${className} 
		    basis-3/12 self-start w-full border border-gray-200 shadow-sm p-8 rounded-2xl flex flex-col`}>
			<div className="flex flex-col gap-2 mb-4">
				<PhotoInfoRow
					icon={<HashIcon size={20} />}
					label="Photo ID"
					value={photo.photoId}
					highlight={sortBy == "photoId"}
				/>
			</div>

			<div className="mb-6">
				<PhotoInfoRow
					icon={<FloppyDiskIcon size={20} weight="duotone" />}
					label="File name"
					value={photo.fileName}
					highlight={sortBy == "fileName"}
				/>
			</div>

			<img
				src={photo.photoUrl}
				className="rounded-xl shadow-sm mb-6"
			/>

			<div className="opacity-50 flex items-center gap-3 mb-2">
				<CameraIcon size={18} weight="duotone" />
				<p className="text-sm">Camera information</p>
			</div>

			<div className="flex flex-col gap-1 mb-6">
				<p className="text-lg font-semibold">
					<span className={`${sortBy == "cameraName" && "text-yellow-400 font-semibold underline"}`}>{photo.cameraName}</span> <span className={`${sortBy == "cameraModel" && "text-yellow-400 font-semibold underline"}`}>{photo.cameraModel}</span>
				</p>
				<p className="opacity-50"><span className={`${sortBy == "lensModel" && "text-yellow-400 font-semibold underline"}`}>{photo.lensModel}</span></p>
			</div>

			<div className="flex flex-col gap-1">

				<PhotoInfoRow
					icon={<TimerIcon size={20} weight="duotone" />}
					label="Exposure time"
					value={`${formatShutterSpeed(photo.exposureTime)}s`}
					highlight={sortBy == "exposureTime"}
				/>

				<PhotoInfoRow
					icon={<ApertureIcon size={20} weight="duotone" />}
					label="Aperture"
					value={photo.aperture
						? `f/${photo.aperture}`
						: "N/A"
					}
					highlight={sortBy == "aperture"}
				/>

				<PhotoInfoRow
					icon={<LightbulbIcon size={20} weight="duotone" />}
					label="ISO"
					value={photo.iso}
					highlight={sortBy == "iso"}
				/>

				<div className="mb-4">
					<PhotoInfoRow
						icon={<MountainsIcon size={20} weight="duotone" />}
						label="Focal length"
						value={
							photo.shotFocalLength
								? `${photo.shotFocalLength}mm`
								: "N/A"
						}
						highlight={sortBy == "shotFocalLength"}
					/>
				</div>

				<PhotoInfoRow
					icon={<CalendarIcon size={20} weight="duotone" />}
					label="Date taken"
					value={`${dateTime.year}.${dateTime.month}.${dateTime.day} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}
					highlight={sortBy == "dateTimeOriginal"}
				/>
			</div>
		</div>
	)
}
