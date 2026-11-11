import { type Icon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";

type Props = {
	to: string
	icon: Icon;
	label: string;
	duotone?: boolean;
}

export default function NavButton({ to, icon: Icon, label, duotone }: Props) {
	const location = useLocation()

	const isActive = location.pathname === to

	return (
		<Link to={to}>

			<div className={`flex items-center justify-center gap-4 border border-gray-300 cursor-pointer rounded-2xl p-4 transition-all duration-100 
			    ${isActive
					? "bg-purple-400 text-white border-transparent"
					: "hover:bg-purple-400 hover:text-white hover:border-transparent"}
				`}>
				<Icon size={32} weight={duotone ? "duotone" : "regular"} />
				<p className="text-xl font-semibold">{label}</p>
			</div>
		</Link>
	)
}
