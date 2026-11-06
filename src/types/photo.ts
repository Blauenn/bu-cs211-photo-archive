type PhotoPerson = {
	personId: number;
	facebook: string | null;
	instagram: string | null;
}

export type Photo = {
	photoId: number;
	fileName: string;
	people: PhotoPerson[];
	cameraName: string;
	cameraModel: string;
	lensModel: string;
	exposureTime: number;
	aperture: number | null;
	iso: number;
	shotFocalLength: number | null;
	flash: boolean;
	dateTimeOriginal: string | Date;
	photoUrl: string;
}
