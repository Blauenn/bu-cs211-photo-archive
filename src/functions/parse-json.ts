import type { Photo } from "../types/photo"

export async function parseJson(file: File): Promise<Photo[]> {
	const jsonFile = await file.text()
	const data = JSON.parse(jsonFile)
	console.log("Raw SQL rows:", data.length)
	console.log("Unique image IDs:", new Set(data.map(row => row.image_id)).size)

	const photos = new Map<number, Photo>()
	const addedPeople = new Map<number, Set<number>>()

	for (const row of data) {
		// The JSON might return images with the same ID.

		// When turning JSON into objects, we do a check first...
		// to prevent duplicates.

		const imageId = row.image_id
		const personId = row.person_id

		const existingPhoto = photos.get(imageId)

		if (existingPhoto) {
			const personIds = addedPeople.get(imageId)!

			if (!personIds.has(personId)) {
				existingPhoto.people.push({
					personId: row.person_id,
					facebook: row.facebook ?? null,
					instagram: row.instagram ?? null,
				})

				personIds.add(personId)
			}
		}
		else {
			photos.set(imageId, {
				photoId: imageId,
				fileName: row.filename,
				people: [{
					personId: row.person_id,
					facebook: row.facebook ?? null,
					instagram: row.instagram ?? null,
				}],
				cameraName: row.camera_name,
				cameraModel: row.camera_model,
				lensModel: row.lens_model,
				exposureTime: row.exposure_time,
				aperture: row.aperture,
				iso: row.iso,
				shotFocalLength: row.shot_focal_length,
				flash: row.flash,
				dateTimeOriginal: row.datetime_original,
				photoUrl: row.image_url,
			})

			addedPeople.set(imageId, new Set([personId]))
		}
	}

	console.log("Parsed photos:", photos.size)
	return Array.from(photos.values())
}
