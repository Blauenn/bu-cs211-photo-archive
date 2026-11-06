import { PlusCircleIcon } from "@phosphor-icons/react";
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
				className="flex items-center justify-center gap-4 border border-gray-300 cursor-pointer rounded-2xl p-4 transition-all duration-100 hover:bg-purple-400 hover:text-white hover:border-transparent"
			>
				<PlusCircleIcon size={32} weight="duotone" />
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
