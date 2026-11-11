import type { ReactNode } from "react"

type Props = {
	icon: ReactNode
	label: string
	value: ReactNode
	highlight?: boolean
}

export default function PhotoInfoRow({ icon, label, value, highlight }: Props) {
	return (
		<div className="flex items-center justify-between">
			<div className={`w-[50%]
			    ${highlight
					? "text-yellow-500"
					: "opacity-50"
				}
			    flex items-center gap-3
			    `}>
				{icon}
				<p className="text-start">{label}</p>
			</div>
			<p className={`w-[50%]
			    ${highlight && "text-yellow-500 font-semibold"}
			    text-end
			    `}>{value}</p>
		</div>
	)
}
