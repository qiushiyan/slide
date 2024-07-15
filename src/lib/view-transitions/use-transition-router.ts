import type {
	AppRouterInstance,
	NavigateOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useNextRouter } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";
import { useSetFinishViewTransition } from "./transition-context";

export type TransitionOptions = {
	onTransitionReady?: () => void;
	viewTransitionTypes?: string[];
};

type NavigateOptionsWithTransition = NavigateOptions &
	TransitionOptions & {
		viewTransitionTypes?: string[];
	};

export type TransitionRouter = AppRouterInstance & {
	push: (href: string, options?: NavigateOptionsWithTransition) => void;
	replace: (href: string, options?: NavigateOptionsWithTransition) => void;
};

export function useTransitionRouter() {
	const router = useNextRouter();
	const finishViewTransition = useSetFinishViewTransition();

	const triggerTransition = useCallback(
		(
			cb: () => void,
			{ onTransitionReady, viewTransitionTypes }: TransitionOptions = {},
		) => {
			const transition = document.startViewTransition({
				// @ts-ignore
				update: () =>
					new Promise<void>((resolve) => {
						startTransition(() => {
							cb();
							finishViewTransition(() => resolve);
						});
					}),
				types: viewTransitionTypes,
			});

			if (onTransitionReady) {
				transition.ready.then(onTransitionReady);
			}
		},
		[finishViewTransition],
	);

	const push = useCallback(
		(
			href: string,
			{
				onTransitionReady,
				viewTransitionTypes,
				...options
			}: NavigateOptionsWithTransition = {},
		) => {
			triggerTransition(() => router.push(href, options), {
				onTransitionReady,
				viewTransitionTypes,
			});
		},
		[triggerTransition, router],
	);

	const replace = useCallback(
		(
			href: string,
			{
				onTransitionReady,
				viewTransitionTypes,
				...options
			}: NavigateOptionsWithTransition = {},
		) => {
			triggerTransition(() => router.replace(href, options), {
				onTransitionReady,
				viewTransitionTypes,
			});
		},
		[triggerTransition, router],
	);

	return useMemo<TransitionRouter>(
		() => ({
			...router,
			push,
			replace,
		}),
		[push, replace, router],
	);
}
