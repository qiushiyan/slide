import { lastIndex, pages } from "@/lib/pages";
import { SwipeControl } from "./_components/swipable";
import { NavigationButton } from "./navigation-button";

export async function generateStaticParams() {
	return pages;
}

export default function ({
	params,
	children,
}: { params: { index: string }; children: React.ReactNode }) {
	const i = Number(params.index);

	return (
		<main className="grid grid-cols-[4rem_1fr_4rem] w-screen h-screen px-4">
			<aside className="flex justify-center items-center isolate">
				<NavigationButton index={i} direction="left" />
			</aside>
			<SwipeControl
				index={i}
				className="grid grid-rows-[1fr_3rem] pb-4 lg:pb-6"
			>
				<article className="text-xl xl:text-2xl p-8 lg:p-16">
					{children}
				</article>
				<footer className="flex items-center justify-center">
					<p className="text-slate-700 text-lg">
						{i} / {lastIndex}
					</p>
				</footer>
			</SwipeControl>

			<aside className="flex justify-center items-center isolate">
				<NavigationButton index={i} direction="right" />
			</aside>
		</main>
	);
}
