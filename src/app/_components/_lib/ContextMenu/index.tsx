"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useComponentTooltip } from "../ComponentTooltip/provider";
import { useOnClickOutside } from "@/app/_hooks/useOnClickOutside";
import { IoCheckmarkOutline } from "react-icons/io5";

import classes from "./index.module.scss";

const animationVariants = {
	initial: { opacity: 0.5, scale: 0.9 },
	enter: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
	exit: { opacity: 0.2, scale: 0.9, transition: { duration: 0.08 } },
};

export const ContextMenu: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const menuRef = useRef(null);

	const {
		setIsTooltipVisible,
		isTooltipEnabled,
		isHighlightEnabled,
		toggleTooltip,
		toggleHighlight,
	} = useComponentTooltip();

	const [isActive, setIsActive] = useState<boolean>(false);

	const [mouseX, setMouseX] = useState<number>(0);
	const [mouseY, setMouseY] = useState<number>(0);

	const openContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		// Add this to trigger presence animations every time
		setIsActive(false);

		setMouseX(e.clientX);
		setMouseY(e.clientY);

		// TODO: Calculate transform-origing and menus position relative to the mouse

		setIsActive(true);
		setIsTooltipVisible(false);
	};

	const closeContextMenu = () => {
		setIsTooltipVisible(true);
		setIsActive(false);
	};

	const handleEnableToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
		toggleTooltip();
		closeContextMenu();
	};

	const handleEnableHighlight = (e: React.MouseEvent<HTMLButtonElement>) => {
		toggleHighlight();
		closeContextMenu();
	};

	const handleListComponents = (e: React.MouseEvent<HTMLButtonElement>) => {
		// TODO: Trigger a model to show the registered components of that page
		closeContextMenu();
	};

	useOnClickOutside(menuRef, closeContextMenu);

	return (
		<div onContextMenu={openContextMenu}>
			{children}
			<AnimatePresence mode='wait'>
				{isActive && (
					<motion.div
						ref={menuRef}
						className={classes.menu}
						initial={animationVariants.initial}
						animate={animationVariants.enter}
						exit={animationVariants.exit}
						style={{ x: mouseX, y: mouseY }}
					>
						<button onClick={handleEnableToolTip}>
							<span className={classes.label}>
								<IoCheckmarkOutline
									className={
										(!isTooltipEnabled && classes.iconHidden) || undefined
									}
								/>
								Enable tooltip
							</span>
							<span className={classes.hotKey}>T</span>
						</button>
						<button onClick={handleEnableHighlight}>
							<span className={classes.label}>
								<IoCheckmarkOutline
									className={
										(!isHighlightEnabled && classes.iconHidden) || undefined
									}
								/>
								Enable highlight
							</span>
							<span className={classes.hotKey}>H</span>
						</button>
						<button onClick={handleListComponents}>
							<span className={classes.label}>
								<IoCheckmarkOutline className={classes.iconHidden} />
								List components
							</span>
							<span className={classes.hotKey}>C</span>
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
