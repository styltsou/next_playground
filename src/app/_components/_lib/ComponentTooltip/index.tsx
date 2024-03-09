"use client";
import { Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useComponentTooltip } from "./provider";
import classes from "./index.module.scss";
import { useMouseInfo } from "@faceless-ui/mouse-info";

const tooltipVariants = {
	initial: { opacity: 0, scale: 0.7 },
	enter: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
	exit: { opacity: 0, scale: 0.7, transition: { duration: 0.1 } },
};

export const ComponentToolTip = () => {
	const { x: mouseX, y: mouseY } = useMouseInfo();

	const {
		isTooltipEnabled,
		isTooltipVisible,
		currentComponentName,
		toggleTooltip,
	} = useComponentTooltip();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "t") {
				toggleTooltip();
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
					currentComponentName !== "" && (
						<motion.div
							className={classes.wrapper}
							initial={tooltipVariants.initial}
							animate={tooltipVariants.enter}
							exit={tooltipVariants.initial}
							style={{
								x: mouseX,
								y: mouseY,
							}}
						>
							{currentComponentName}
						</motion.div>
					)}
			</AnimatePresence>
		</Fragment>
	);
};
