"use client";
import { createContext, useState, useContext } from "react";

const ComponentTooltipContext = createContext({
	isEnabled: false,
	currentComponentName: "",
	setComponentName: (name: string) => {},
	toggleTooltip: () => {},
});

export const ComponentTooltipProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [componentName, setComponentName] = useState<string>("");
	const toggleTooltip = () => {
		setIsEnabled((prev) => !prev);
	};

	return (
		<ComponentTooltipContext.Provider
			value={{
				isEnabled,
				currentComponentName: componentName,
				setComponentName,
				toggleTooltip,
			}}
		>
			{children}
		</ComponentTooltipContext.Provider>
	);
};

export const useComponentTooltip = () => useContext(ComponentTooltipContext);
