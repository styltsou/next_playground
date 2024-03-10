"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useComponentTooltip } from "../ComponentTooltip/provider";
import { useScrollLock } from "@/app/_hooks/useScrollLock";
import { useOnClickOutside } from "@/app/_hooks/useOnClickOutside";
import { cn } from "@/app/_utils/cn";
import { IoCheckmarkOutline } from "react-icons/io5";

import classes from "./index.module.scss";

// TODO: Find a way to FUCKING LOCK Lenis Scroll

type ViewportQuadrant =
	| "top-left"
	| "bottom-left"
	| "top-right"
	| "bottom-right";

const animationVariants = {
	initial: { opacity: 0.5, scale: 0.9 },
	enter: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
	exit: { opacity: 0.2, scale: 0.9, transition: { duration: 0.08 } },
};

export const ContextMenu: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const menuRef = useRef(null);

	// const { lock, unlock } = useScrollLock({
	// 	autoLock: false,
	// });

	const {
		setIsTooltipVisible,
		isTooltipEnabled,
		isHighlightEnabled,
		toggleTooltip,
		toggleHighlight,
	} = useComponentTooltip();

	const [isActive, setIsActive] = useState<boolean>(false);

	// Menu position
	const [x, setX] = useState<number>(0);
	const [y, setY] = useState<number>(0);

	// Viewport quadrant where the menu was opened
	const [viewportQuadrant, setViewportQuadrant] =
		useState<ViewportQuadrant>("top-left");

	const openContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		// lock();
		// Add this to trigger presence animations every time
		setIsActive(false);

		// Calculate the viewport quadrant that way in order to specify
		// the appropriate transform orgin to the menu (for presence animation)
		const horizontalOrientation =
			e.clientX <= window.innerWidth / 2 ? "left" : "right";
		const verticalOrientation =
			e.clientY <= window.innerHeight / 2 ? "top" : "bottom";

		setViewportQuadrant(`${verticalOrientation}-${horizontalOrientation}`);

		// TODO: Find a way to dynamically calculate context menu dimensions
		const menuW = 224;
		const menuH = 105;
		let menuOffset = {
			x: horizontalOrientation === "left" ? 0 : -menuW,
			y: verticalOrientation === "top" ? 0 : -menuH,
		};

		setX(e.clientX + menuOffset.x);
		setY(e.clientY + menuOffset.y);

		setIsActive(true);
		setIsTooltipVisible(false);
	};

	const closeContextMenu = () => {
		setIsTooltipVisible(true);
		setIsActive(false);
		// unlock();
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
						className={cn(classes.menu, classes[viewportQuadrant])}
						initial={animationVariants.initial}
						animate={animationVariants.enter}
						exit={animationVariants.exit}
						style={{ x, y }}
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
