export function pascalToKebabCase(str: string): string {
	return str.replace(
		/[A-Z]/g,
		(match, offset) => (offset ? "-" : "") + match.toLowerCase()
	);
}
