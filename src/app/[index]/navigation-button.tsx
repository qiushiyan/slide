"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/lib/view-transitions/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
	index: number;
	direction: "left" | "right";
};

export const NavigationButton = ({ direction, index }: Props) => {
	const type = direction === "left" ? "backwards" : "forwards";
	const disabled =
		(index === 1 && direction === "left") ||
		(index === 5 && direction === "right");

	return (
		<Link
			className={cn(
				"rounded-full border bg-slate-100 p-4 transition ease-out delay-100 hover:shadow-md hover:bg-slate-50",
				{
					"opacity-50 pointer-events-none": disabled,
				},
			)}
			viewTransitionTypes={["slide", type]}
			aria-disabled={index < 0 || index > 9}
			href={`/${direction === "left" ? index - 1 : index + 1}`}
		>
			{direction === "left" ? (
				<ArrowLeft className="size-6" />
			) : (
				<ArrowRight className="size-6" />
			)}
		</Link>
	);
};
