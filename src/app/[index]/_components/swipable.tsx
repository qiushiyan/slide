"use client";

import { cn } from "@/lib/utils";
import { useTransitionRouter } from "@/lib/view-transitions/use-transition-router";
import { useCallback, useEffect, useRef, useState } from "react";

const minSwipeDistance = 50;

type Props = {
	className?: string;
	children: React.ReactNode;
	index: number;
};

export const Swipable = ({ children, index, className }: Props) => {
	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);
	const router = useTransitionRouter();
	const isSelecting = useRef(false);

	const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
		null,
	);

	const disableRightSwipe = index === 1;
	const disableLeftSwipe = index === 5;

	const hasSelection = useCallback(() => {
		return window.getSelection()?.toString() !== "";
	}, []);

	const resetSwipeState = useCallback(() => {
		touchStartX.current = null;
		touchStartY.current = null;
		touchEndX.current = null;
		touchEndY.current = null;
		setSwipeDirection(null);
	}, []);

	const handleSwipe = useCallback(
		(distanceX: number, distanceY: number) => {
			if (!touchStartX.current || !touchStartY.current) return false;

			if (Math.abs(distanceX) > Math.abs(distanceY) && !hasSelection()) {
				const isLeftSwipe = distanceX > minSwipeDistance;
				const isRightSwipe = distanceX < -minSwipeDistance;

				if (isLeftSwipe && !disableLeftSwipe) {
					setSwipeDirection("left");
					return true;
				}

				if (isRightSwipe && !disableRightSwipe) {
					setSwipeDirection("right");
					return true;
				}
			}
			setSwipeDirection(null);
			return false;
		},
		[disableLeftSwipe, disableRightSwipe, hasSelection],
	);

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (isSelecting.current || hasSelection()) {
				isSelecting.current = true;
				resetSwipeState();
				return;
			}

			touchEndX.current = e.clientX;
			touchEndY.current = e.clientY;
			if (touchStartX.current !== null && touchStartY.current !== null) {
				const distanceX = touchStartX.current - touchEndX.current;
				const distanceY = touchStartY.current - touchEndY.current;
				handleSwipe(distanceX, distanceY);
			}
		},
		[handleSwipe, hasSelection, resetSwipeState],
	);

	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (hasSelection()) {
				isSelecting.current = true;
				resetSwipeState();
				return;
			}

			document.body.classList.add("dragging");
			isSelecting.current = false;
			touchStartX.current = e.clientX;
			touchStartY.current = e.clientY;
		},
		[hasSelection, resetSwipeState],
	);

	const onMouseUp = useCallback(
		(e: React.MouseEvent) => {
			document.body.classList.remove("dragging");
			if (isSelecting.current || hasSelection()) {
				isSelecting.current = false;
				resetSwipeState();
				return;
			}

			touchEndX.current = e.clientX;
			touchEndY.current = e.clientY;
			if (touchStartX.current !== null && touchStartY.current !== null) {
				const distanceX = touchStartX.current - touchEndX.current;
				const distanceY = touchStartY.current - touchEndY.current;

				if (handleSwipe(distanceX, distanceY)) {
					router.push(`/${swipeDirection === "left" ? index + 1 : index - 1}`, {
						viewTransitionTypes: [
							"slide",
							swipeDirection === "left" ? "forwards" : "backwards",
						],
					});
				}
			}
			resetSwipeState();
		},
		[handleSwipe, hasSelection, index, resetSwipeState, router, swipeDirection],
	);

	const onMouseLeave = useCallback(() => {
		resetSwipeState();
	}, [resetSwipeState]);

	useEffect(() => {
		return () => {
			resetSwipeState();
			isSelecting.current = false;
		};
	}, [resetSwipeState]);

	return (
		<div
			className={cn(
				className,
				"transition-transform duration-300 ease-in-out",
				swipeDirection === "left" && "translate-x-[-10%]",
				swipeDirection === "right" && "translate-x-[10%]",
			)}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</div>
	);
};
