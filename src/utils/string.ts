/**
 * Returns the initials of a given name.
 * For example, "Aqil Gifari" will return "AG".
 *
 * @param name - The full name from which to extract initials.
 * @returns The initials as a string.
 */
export function getInitials(name: string): string {
	if (!name) return ''; // Handle empty or undefined name input

	// Split the name into words
	const nameParts = name.trim().split(' ');

	// Extract the first letter of each word and join them
	const initials = nameParts.map(part => part[0].toUpperCase()).join('');

	return initials;
}
