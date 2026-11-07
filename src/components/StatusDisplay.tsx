type Props = {
	value: number
	label: string
}

export default function StatusDisplay({ value, label }: Props) {
	return (
		<div className="flex flex-col items-center gap-3">
			<p className="bg-purple-400 text-white shadow-lg px-3 py-1 rounded-2xl">
				{label}
			</p>
			<div className="size-20 flex items-center justify-center p-8 shadow-lg bg-purple-400 text-white rounded-full">
				<p className="text-2xl font-semibold">{value}</p>
			</div>
		</div>
	)
}
