import { create } from "zustand";
import { persist } from "zustand/middleware";

// This should probably be moved elsewhere
export type MarkerColor = {
	label: string;
	hexCode: string;
	textColor: "white" | "black";
};

type RegisteredComponent = {
	label: string;
	id: string;
};

interface GlobalState {
	registeredComponents: RegisteredComponent[];
	registerComponent: (component: RegisteredComponent) => void;

	currentComponentLabel: string | null;
	setCurrentComponentLabel: (label: string | null) => void;

	isTooltipEnabled: boolean;
	isTooltipVisible: boolean;
	isHighlightEnabled: boolean;
	toggleTooltip: () => void;
	setIsTooltipVisible: (isVisible: boolean) => void;
	toggleHighlight: () => void;
	markerColor: MarkerColor;
	setMarkerColor: (color: MarkerColor) => void;
}

export const useBoundStore = create<GlobalState>()(
	persist(
		(set) => ({
			registeredComponents: [],
			registerComponent: (component) =>
				set((state) => ({
					registeredComponents: [...state.registeredComponents, component],
				})),
			currentComponentLabel: null,
			setCurrentComponentLabel: (label) =>
				set((state) => ({ currentComponentLabel: label })),

			isTooltipEnabled: false,
			isTooltipVisible: true,
			isHighlightEnabled: false,
			toggleTooltip: () =>
				set((state) => ({ isTooltipEnabled: !state.isTooltipEnabled })),
			setIsTooltipVisible: (isVisible) =>
				set((state) => ({ isTooltipVisible: isVisible })),
			toggleHighlight: () =>
				set((state) => ({ isHighlightEnabled: !state.isHighlightEnabled })),
			markerColor: {
				label: "Orange",
				hexCode: "orangered",
				textColor: "white",
			},
			setMarkerColor: (color) => set((state) => ({ markerColor: color })),
		}),
		{
			name: "bound-store",
			partialize: (state) => ({
				isTooltipEnabled: state.isHighlightEnabled,
				isHighlightEnabled: state.isHighlightEnabled,
				markerColor: state.markerColor,
			}),
		}
	)
);
