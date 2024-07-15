import { Swipable } from "./_components/swipable";
import { NavigationButton } from "./navigation-button";

export async function generateStaticParams() {
	return Array.from({ length: 5 }, (_, i) => ({
		index: String(i),
	}));
}

export default function ({
	params,
	children,
}: { params: { index: string }; children: React.ReactNode }) {
	const i = Number(params.index);

	return (
		<main className="grid grid-cols-[80px_1fr_80px] w-screen h-screen px-4">
			<aside className="flex justify-center items-center isolate">
				<NavigationButton index={i} direction="left" />
			</aside>
			<Swipable index={i}>
				<article className="text-xl xl:text-2xl p-8 lg:p-16">
					{children}
				</article>
			</Swipable>

			<aside className="flex justify-center items-center isolate">
				<NavigationButton index={i} direction="right" />
			</aside>
		</main>
	);
}
