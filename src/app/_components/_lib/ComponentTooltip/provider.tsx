"use client";
import { createContext, useState, useContext } from "react";
import { ComponentToolTip } from ".";

const ComponentTooltipContext = createContext({
	isTooltipEnabled: false,
	isTooltipVisible: true,
	isHighlightEnabled: false,
	currentComponentName: "",
	setComponentName: (name: string) => {},
	setIsTooltipVisible: (isVisible: boolean) => {},
	toggleTooltip: () => {},
	toggleHighlight: () => {},
});

export const ComponentTooltipProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isTooltipEnabled, setIsTooltipEnabled] = useState<boolean>(false);
	const [componentName, setComponentName] = useState<string>("");

	const toggleTooltip = () => {
		setIsTooltipEnabled((prev) => !prev);
	};

	const [isHighlightEnabled, setIsHighlightEnabled] = useState<boolean>(false);
	const toggleHighlight = () => {
		setIsHighlightEnabled((prev) => !prev);
	};

	// This state is used to not show the tooltip when the context menu is open
	const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(true);

	return (
		<ComponentTooltipContext.Provider
			value={{
				isTooltipEnabled,
				isTooltipVisible,
				isHighlightEnabled,
				currentComponentName: componentName,
				setComponentName,
				setIsTooltipVisible,
				toggleTooltip,
				toggleHighlight,
			}}
		>
			{children}
			<ComponentToolTip />
		</ComponentTooltipContext.Provider>
	);
};

export const useComponentTooltip = () => useContext(ComponentTooltipContext);
