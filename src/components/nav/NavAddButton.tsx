import { FileArrowUpIcon } from "@phosphor-icons/react";
import type React from "react";
import type { SetStateAction } from "react";
import type { Photo } from "../../types/photo";
import { parseJson } from "../../utils/parse-json";

type Props = {
	setPhotos: React.Dispatch<SetStateAction<Photo[]>>
}

export default function NavAddButton({ setPhotos }: Props) {
	async function handleFileChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const file = event.target.files?.[0]

		if (!file) return

		try {
			const newPhotos = await parseJson(file)

			setPhotos(newPhotos)
		} catch (error) {
			console.error("Failed to import JSON:", error)
		}
	}

	return (
		<>
			<label
				htmlFor="json-upload"
				className="flex items-center justify-center px-4"
			>
				<FileArrowUpIcon size={42} weight="duotone" className="opacity-40 hover:opacity-100 hover:text-purple-400 transition-all duration-100 cursor-pointer" />
			</label>

			<input
				id="json-upload"
				type="file"
				accept=".json,application/json"
				onChange={handleFileChange}
				className="hidden"
			/>
		</>
	)
}
