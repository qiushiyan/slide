export const pages = Array.from({ length: 5 }, (_, i) => ({
	index: String(i + 1),
}));

export const firstIndex = Number(pages[0].index);
export const lastIndex = Number(pages[pages.length - 1].index);
