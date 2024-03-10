"use client";
import { Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMouseInfo } from "@faceless-ui/mouse-info";
import { useBoundStore } from "@/app/_store";
import { cn } from "@/app/_utils/cn";
import classes from "./index.module.scss";

const tooltipVariants = {
	initial: { opacity: 0, scale: 0.7 },
	enter: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
	exit: { opacity: 0, scale: 0.7, transition: { duration: 0.1 } },
};

export const ComponentToolTip: React.FC<{ blackText: boolean }> = ({
	blackText,
}) => {
	const { x: mouseX, y: mouseY } = useMouseInfo();

	const {
		isTooltipEnabled,
		isTooltipVisible,
		currentComponentLabel,
		toggleTooltip,
		toggleHighlight,
	} = useBoundStore();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "t") {
				toggleTooltip();
			}

			if (event.key === "h") {
				toggleHighlight();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<AnimatePresence>
				{isTooltipEnabled &&
					isTooltipVisible &&
					currentComponentLabel !== null && (
						<motion.div
							className={cn(
								classes.wrapper,
								blackText == true && classes.blackText
							)}
							initial={tooltipVariants.initial}
							animate={tooltipVariants.enter}
							exit={tooltipVariants.initial}
							style={{
								x: mouseX,
								y: mouseY,
							}}
						>
							{currentComponentLabel}
						</motion.div>
					)}
			</AnimatePresence>
		</Fragment>
	);
};
