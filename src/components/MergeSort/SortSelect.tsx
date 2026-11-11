import type { SortKey } from "../../types/merge-sort"

type Props = {
	value: SortKey
	onChange: (value: SortKey) => void
}

const sortOptions: { key: SortKey; label: string }[] = [
	{ key: "unsorted", label: "Unsorted" },
	{ key: "photoId", label: "Photo ID" },
	{ key: "fileName", label: "File Name" },
	{ key: "cameraName", label: "Camera Name" },
	{ key: "cameraModel", label: "Camera Model" },
	{ key: "lensModel", label: "Lens Model" },
	{ key: "exposureTime", label: "Exposure Time" },
	{ key: "aperture", label: "Aperture" },
	{ key: "iso", label: "ISO" },
	{ key: "shotFocalLength", label: "Focal Length" },
	{ key: "dateTimeOriginal", label: "Date Taken" },
]

export default function SortSelect({ value, onChange }: Props) {
	return (
		<select
			value={value}
			onChange={(event) => onChange(event.target.value as SortKey)}
			className="field"
		>
			{sortOptions.map(({ key, label }) => (
				<option key={key} value={key}>
					{label}
				</option>
			))}
		</select>
	)
}

