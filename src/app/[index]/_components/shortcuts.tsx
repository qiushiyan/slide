"use client";

import { firstIndex, lastIndex } from "@/lib/pages";
import { useSwitch } from "@/lib/use-switch";
import { useEffect, useState } from "react";

export const useShortcuts = ({ index }: { index: number }) => {
	const { forward, backward } = useSwitch({ index });
	const [disabled, setDisabled] = useState<"left" | "right" | null>();

	const handleSwitch = (e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "ArrowRight") {
			if (index < lastIndex) {
				forward();
			} else {
				setDisabled("right");
			}
			return;
		}

		if (e.key === "ArrowLeft") {
			if (index > firstIndex) {
				backward();
			} else {
				setDisabled("left");
			}
			return;
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleSwitch);
		return () => {
			document.removeEventListener("keydown", handleSwitch);
		};
	}, []);

	return disabled;
};
