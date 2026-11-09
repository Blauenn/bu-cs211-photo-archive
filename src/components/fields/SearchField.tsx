import { XCircleIcon } from "@phosphor-icons/react"

type Props = {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export default function SearchField({
	value,
	onChange,
	placeholder = "Search...",
}: Props) {
	return (
		<div className="field flex items-center gap-2 border focus-within:border-purple-400">
			<input
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="flex-1 outline-none"
			/>

			<button
				type="button"
				onClick={() => onChange("")}
				className="cursor-pointer opacity-50 hover:text-red-400 hover:opacity-100 transition-all duration-100"
			>
				<XCircleIcon size={20} />
			</button>
		</div>
	)
}

