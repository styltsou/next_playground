"use client";
import React, { ComponentType } from "react";
import { useComponentTooltip } from "./provider";

// Define the HOC function
export const withTooltip = <P extends object>(
	WrappedComponent: ComponentType<P>,
	tooltipLabel?: string
) => {
	// eslint-disable-next-line react/display-name
	return (props: P) => {
		const { isEnabled, setComponentName } = useComponentTooltip();

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isEnabled) setComponentName(tooltipLabel || "Not Defined");
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (isEnabled) setComponentName("");
		};

		return (
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<WrappedComponent {...props} />
			</div>
		);
	};
};
