"use client";
import React, { useState, ComponentType } from "react";
import { useComponentTooltip } from "./provider";
import { ComponentHiglight } from "../ComponentHighlight";

// Define the HOC function
export const withTooltip = <P extends object>(
	WrappedComponent: ComponentType<P>,
	tooltipLabel?: string
) => {
	// eslint-disable-next-line react/display-name
	return (props: P) => {
		const { isTooltipEnabled, isHighlightEnabled, setComponentName } =
			useComponentTooltip();

		const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isTooltipEnabled) setComponentName(tooltipLabel || "Not Defined");
			// Check here might be redundant but at least I avoid extra rerender?
			if (isHighlightEnabled) setIsHighlighted(true);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isTooltipEnabled) setComponentName("");
			setIsHighlighted(false);
		};

		return (
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				id={tooltipLabel}
				style={{ position: "relative" }}
			>
				<WrappedComponent {...props} />
				<ComponentHiglight isHighlighted={isHighlighted} />
			</div>
		);
	};
};
