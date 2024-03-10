"use client";
import { MouseInfoProvider } from "@faceless-ui/mouse-info";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <MouseInfoProvider>{children}</MouseInfoProvider>;
};
