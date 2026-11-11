import { LightningIcon, LightningSlashIcon } from "@phosphor-icons/react";
import type { Photo } from "../types/photo";
import { formatShutterSpeed } from "../utils/numbers";
import DataTableHead from "../components/Data/DataTableHead";

type Props = {
	photos: Photo[]
}

export default function Data({ photos }: Props) {
	return (
		<div className="overflow-x-auto">
			<table className="data-table w-full border-collapse">
				<DataTableHead />

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
									<div className="flex items-center justify-center p-2">
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
												.map((person) => (<li className="w-full truncate" key={person.personId}>{person.facebook || person.instagram}</li>))}
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
