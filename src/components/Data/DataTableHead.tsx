import { CalendarIcon, CameraIcon, FloppyDiskIcon, HashIcon, ImageIcon, LightbulbIcon, UserCircleIcon } from "@phosphor-icons/react";

export default function DataTableHead() {
	return (
		<thead>
			<tr className="border border-gray-300">
				{/* ID */}
				<th title="Photo ID">
					<div>
						<HashIcon size={20} />
					</div>
				</th>

				{/* Image */}
				<th title="Image" className="min-w-32">
					<div>
						<ImageIcon size={20} weight="duotone" />
					</div>
				</th>

				{/* File name */}
				<th title="File name">
					<div>
						<FloppyDiskIcon size={20} weight="duotone" />
						<p>File name</p>
					</div>
				</th>

				{/* Person */}
				<th title="Photograhped person">
					<div>
						<UserCircleIcon size={20} weight="duotone" />
						<p>Photographed person</p>
					</div>
				</th>

				{/* Camera information */}
				<th title="Camera information">
					<div>
						<CameraIcon size={20} weight="duotone" />
						<p>Camera information</p>
					</div>
				</th>

				{/* Exposure settings */}
				<th title="Exposure settings" colSpan={5}>
					<div>
						<LightbulbIcon size={20} weight="duotone" />
						<p>Exposure settings</p>
					</div>
				</th>

				{/* Captured date time */}
				<th title="Captured date time">
					<div>
						<CalendarIcon size={20} weight="duotone" />
					</div>
				</th>
			</tr>
		</thead>
	)
}
