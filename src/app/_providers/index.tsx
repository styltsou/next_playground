"use client";
import { MouseInfoProvider } from "@faceless-ui/mouse-info";
import { ComponentTooltipProvider } from "../_components/_lib/ComponentTooltip/provider";
import { ComponentToolTip } from "../_components/_lib/ComponentTooltip";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<MouseInfoProvider>
			<ComponentTooltipProvider>
				{children}
				<ComponentToolTip />
			</ComponentTooltipProvider>
		</MouseInfoProvider>
	);
};
