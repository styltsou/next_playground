"use client";
import { createContext, useState, useContext } from "react";

type RegisteredComponent = {
	label: string;
	id: string;
};

const RegisteredComponentsContext = createContext<{
	components: RegisteredComponent[];
	registerComponent: (component: RegisteredComponent) => void;
}>({
	components: [],
	registerComponent: () => {},
});

export const RegisteredComponentsProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [components, setComponents] = useState<RegisteredComponent[]>([]);

	const registerComponent = (component: RegisteredComponent) => {
		setComponents((prev) => [...prev, component]);
	};

	return (
		<RegisteredComponentsContext.Provider
			value={{
				components,
				registerComponent,
			}}
		>
			{children}
		</RegisteredComponentsContext.Provider>
	);
};

export const useRegisterComponent = () =>
	useContext(RegisteredComponentsContext);
