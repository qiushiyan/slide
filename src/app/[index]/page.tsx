import { delay } from "es-toolkit";
import { Suspense } from "react";
import { Spinner } from "./_components/spinner";

export const dynamic = "force-dynamic";

export default async function ({ params }: { params: { index: string } }) {
	return (
		<div>
			<h1 className="flex items-center gap-2 text-4xl font-extrabold mb-8">
				<span>Page {params.index}</span>
			</h1>
			<p className="leading-relaxed font-light">
				Tempor Lorem irure voluptate laborum fugiat occaecat consectetur. Tempor
				officia dolor aliqua eu est Lorem deserunt esse ullamco. Ex ullamco
				proident culpa laborum excepteur magna do voluptate reprehenderit.
				Cupidatat enim eiusmod tempor in elit mollit eiusmod do minim nulla
				voluptate. Enim commodo nulla consequat exercitation. Est fugiat aute
				occaecat est dolore laborum nulla sit sit nostrud veniam. Nisi sint in
				laboris officia Lorem ullamco laboris. Adipisicing voluptate ipsum
				ullamco incididunt culpa officia esse in id ullamco non laborum
				adipisicing. Enim aliqua in sit elit tempor et culpa sunt reprehenderit
				dolore. Cillum amet aute in aliquip incididunt id sunt cupidatat.
				Exercitation cupidatat pariatur ullamco velit ullamco adipisicing aliqua
				ex culpa veniam tempor laborum. Duis eiusmod labore ipsum Lorem do do eu
				aute cillum. Ullamco tempor dolor nulla velit. Sit ipsum et pariatur
				anim deserunt cupidatat ut labore esse. Reprehenderit sit officia
				reprehenderit aliquip cillum cillum. Ad aliqua ea ea deserunt ipsum non
				aliquip sit consequat. Sint ad elit minim eiusmod irure labore quis ad
				incididunt dolore commodo cillum.
			</p>
			<Suspense fallback={<Spinner className="size-4 mt-4" />}>
				<ExpensiveComponent />
			</Suspense>
		</div>
	);
}

const ExpensiveComponent = async () => {
	await delay(1000);
	return <p className="text-sm mt-4"> expensive content loaded</p>;
};
