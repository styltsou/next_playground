"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1, smoothWheel: true }}>
			{children}
		</ReactLenis>
	);
};
