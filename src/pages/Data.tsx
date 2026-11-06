import { CalendarIcon, CameraIcon, FloppyDiskIcon, HashIcon, ImageIcon, LightbulbIcon, LightningIcon, LightningSlashIcon, UserCircleIcon } from "@phosphor-icons/react";
import type { Photo } from "../types/photo";
import { formatShutterSpeed } from "../utils/numbers";

type Props = {
	photos: Photo[]
}

export default function Data({ photos }: Props) {
	return (
		<div className="overflow-x-auto">
			<table className="data-table w-full border-collapse">
				<thead>
					<tr className="border border-gray-300">
						{/* ID */}
						<th title="Photo ID">
							<div>
								<HashIcon size={20} />
							</div>
						</th>

						{/* Image */}
						<th title="Image">
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

				<tbody>
					{photos.map((photo) => {
						const capturedDate = new Date(photo.dateTimeOriginal)
						const dateString =
							`${capturedDate.getFullYear()}.${(capturedDate.getMonth() + 1).toString().padStart(2, "0")}.${capturedDate.getDate().toString().padStart(2, "0")}`
						const timeString =
							`${capturedDate.getHours().toString().padStart(2, "0")}:${capturedDate.getMinutes().toString().padStart(2, "0")}:${capturedDate.getSeconds().toString().padStart(2, "0")}`

						return (
							<tr key={photo.photoId}>
								{/* ID */}
								<td>
									<div>
										<p className="text-end font-semibold">{photo.photoId}</p>
									</div>
								</td>

								{/* Image */}
								<td>
									<div className="flex items-center justify-center">
										<img
											className="w-16 rounded-md"
											src={photo.photoUrl}
											alt={`photo-${photo.photoId}`} />
									</div>
								</td>

								{/* File name*/}
								<td>
									<div>
										<p>{photo.fileName}</p>
									</div>
								</td>

								{/* Photographed person */}
								<td>
									<div>
										<ul className="list-inside list-disc">
											{photo.people
												.map((person) => (<li>{person.facebook || person.instagram}</li>))}
										</ul>
									</div>
								</td>

								{/* Camera information */}
								<td>
									<div>
										<p className="font-semibold">{photo.cameraName} {photo.cameraModel}</p>
										<p className="opacity-50 text-sm">{photo.lensModel}</p>
									</div>
								</td>

								{/* Exposure time */}
								<td>
									<div className="flex justify-end">
										<p className="text-end">
											{formatShutterSpeed(photo.exposureTime)}s
										</p>
									</div>
								</td>

								{/* Aperture */}
								<td>
									<div>
										{photo.aperture
											? (
												<p>f/{photo.aperture}</p>
											)
											: (
												<p className="opacity-25">-</p>
											)}
									</div>
								</td>

								{/* ISO */}
								<td>
									<div>
										{photo.iso ? (
											<p>ISO {photo.iso}</p>
										) : (
											<p className="opacity-25">-</p>
										)}
									</div>
								</td>

								{/* Focal length */}
								<td>
									<div className="flex justify-end">
										{photo.shotFocalLength
											? (
												<p className="text-end">{photo.shotFocalLength}mm</p>
											)
											: (
												<p className="opacity-25">-</p>
											)}
									</div>
								</td>

								{/* Flash */}
								<td>
									<div className="flex items-center justify-center">
										<p>
											{photo.flash
												? (
													<LightningIcon size={20} weight="duotone" className="text-yellow-500" />
												)
												: (
													<LightningSlashIcon size={20} weight="duotone" className="opacity-25" />
												)}
										</p>
									</div>
								</td>


								{/* Captured date */}
								<td>
									<div>
										{photo.dateTimeOriginal
											? (
												<>
													<p>{dateString}</p>
													<p className="opacity-50 text-sm">{timeString}</p>
												</>
											) : (
												<p className="opacity-25">-</p>
											)}
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
