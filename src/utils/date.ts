export function convertToLocalTime(dateTime: string) {
	const [datePart, timePart] = dateTime.split(" ");
	const [year, month, day] = datePart.split("-").map(Number);
	const [hours, minutes, seconds] = timePart.split(":").map(Number);

	const date = new Date(year, month - 1, day, hours + 7, minutes, seconds);

	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Bangkok",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).formatToParts(date);

	return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
}

