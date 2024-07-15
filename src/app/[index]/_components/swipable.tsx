"use client";

import { useTransitionRouter } from "@/lib/view-transitions/use-transition-router";
import { debounce } from "es-toolkit";
import { useRef, useState } from "react";

const minSwipeDistance = 50;

type Props = {
	children: React.ReactNode;
	index: number;
};

export const Swipable = ({ children, index }: Props) => {
	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);
	const router = useTransitionRouter();
	const [canNavigate, setCanNavigate] = useState(false);

	const disableRightSwipe = index === 1;
	const disableLeftSwipe = index === 5;

	const onMouseMove = debounce((e: React.MouseEvent) => {
		touchEndX.current = e.clientX;
		touchEndY.current = e.clientY;
		if (touchStartX.current && touchEndX.current) {
			const distanceX = touchStartX.current - touchEndX.current;
			const distanceY =
				touchStartY.current && touchEndY.current
					? touchStartY.current - touchEndY.current
					: 0;

			if (Math.abs(distanceX) > Math.abs(distanceY)) {
				const isLeftSwipe = distanceX > minSwipeDistance;
				const isRightSwipe = distanceX < -minSwipeDistance;

				if (isLeftSwipe && !disableLeftSwipe) {
					setCanNavigate(true);
				}

				if (isRightSwipe && !disableRightSwipe) {
					setCanNavigate(true);
				}
			}
		}
	}, 50);

	const onMouseDown = (e: React.MouseEvent) => {
		document.body.classList.add("dragging");
		touchEndX.current = null;
		touchEndY.current = null;
		touchStartX.current = e.clientX;
		touchStartY.current = e.clientY;
	};

	const onMouseUp = (e: React.MouseEvent) => {
		document.body.classList.remove("dragging");
		touchEndX.current = e.clientX;
		touchEndY.current = e.clientY;
		if (!touchStartX.current || !touchEndX.current) {
			return;
		}
		const distanceX = touchStartX.current - touchEndX.current;
		const distanceY =
			touchStartY.current && touchEndY.current
				? touchStartY.current - touchEndY.current
				: 0;

		if (Math.abs(distanceX) > Math.abs(distanceY)) {
			const isLeftSwipe = distanceX > minSwipeDistance;
			const isRightSwipe = distanceX < -minSwipeDistance;

			if (isLeftSwipe && !disableLeftSwipe) {
				router.push(`/${index + 1}`, {
					viewTransitionTypes: ["slide", "forwards"],
				});
			}

			if (isRightSwipe && !disableRightSwipe) {
				router.push(`/${index - 1}`, {
					viewTransitionTypes: ["slide", "backwards"],
				});
			}
		}
	};

	return (
		<div
			className={canNavigate ? "opacity-50" : ""}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		>
			{children}
		</div>
	);
};
