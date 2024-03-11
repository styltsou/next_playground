"use client";
import { MouseInfoProvider } from "@faceless-ui/mouse-info";
import { ModalProvider } from "../_components/_lib/Modal/provider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<MouseInfoProvider>
			<ModalProvider>{children}</ModalProvider>
		</MouseInfoProvider>
	);
};
