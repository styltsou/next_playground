"use client";
import { Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useComponentTooltip } from "./provider";
import classes from "./index.module.scss";
import { useMouseInfo } from "@faceless-ui/mouse-info";

export const ComponentToolTip = () => {
	const { x: mouseX, y: mouseY } = useMouseInfo();

	const { isEnabled, currentComponentName, toggleTooltip } =
		useComponentTooltip();

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
				{isEnabled && currentComponentName !== "" && (
					<motion.div
						className={classes.wrapper}
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
						exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.1 } }}
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
