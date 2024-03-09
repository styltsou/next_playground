export const cn = (...args: string[]): string => {
	return args.filter(Boolean).join(" ");
};
