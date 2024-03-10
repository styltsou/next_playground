"use client";
import React, { useState, useEffect, ComponentType } from "react";
import { ComponentToolTip } from "../ComponentTooltip";
import { ComponentHiglight } from "../ComponentHighlight";
import { useBoundStore } from "@/app/_store";
import { pascalToKebabCase } from "@/app/_utils/pascalToKebabCase";

export const withMarkers = <P extends object>(
	WrappedComponent: ComponentType<P>,
	tooltipLabel?: string
) => {
	// eslint-disable-next-line react/display-name
	return (props: P) => {
		const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

		const {
			markerColor,
			isTooltipEnabled,
			isHighlightEnabled,
			setCurrentComponentLabel,
			registerComponent,
		} = useBoundStore();

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isTooltipEnabled)
				setCurrentComponentLabel(tooltipLabel || "Not Defined");
			// Check here might be redundant but at least I avoid extra rerender?
			if (isHighlightEnabled) setIsHighlighted(true);
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isTooltipEnabled) setCurrentComponentLabel(null);
			setIsHighlighted(false);
		};

		// Register component
		useEffect(() => {
			registerComponent({
				label: tooltipLabel || "Not defined",
				id: pascalToKebabCase(tooltipLabel || ""),
			});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				id={pascalToKebabCase(tooltipLabel || "")}
				style={{ position: "relative", backgroundColor: markerColor.hexCode }}
			>
				<WrappedComponent {...props} />
				<ComponentHiglight isVisible={isHighlightEnabled && isHighlighted} />
				<ComponentToolTip blackText={markerColor.textColor === "black"} />
			</div>
		);
	};
};
