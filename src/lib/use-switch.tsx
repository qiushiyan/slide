"use client";

import { useCallback } from "react";
import { firstIndex } from "./pages";
import { useTransitionRouter } from "./view-transitions/use-transition-router";

export const useSwitch = ({ index }: { index: number }) => {
	const router = useTransitionRouter();

	const backward = useCallback(() => {
		if (index <= firstIndex) return;
		router.push(`/${index - 1}`, {
			viewTransitionTypes: ["slide", "backwards"],
		});
	}, [index]);

	const forward = useCallback(() => {
		router.push(`/${index + 1}`, {
			viewTransitionTypes: ["slide", "forwards"],
		});
	}, [index]);

	return { backward, forward };
};
