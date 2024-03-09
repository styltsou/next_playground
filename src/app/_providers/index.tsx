"use client";
import { MouseInfoProvider } from "@faceless-ui/mouse-info";
import { RegisteredComponentsProvider } from "../_components/_lib/RegisteredComponentsContext";
import { ComponentTooltipProvider } from "../_components/_lib/ComponentTooltip/provider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<MouseInfoProvider>
			<RegisteredComponentsProvider>
				<ComponentTooltipProvider>{children}</ComponentTooltipProvider>
			</RegisteredComponentsProvider>
		</MouseInfoProvider>
	);
};
