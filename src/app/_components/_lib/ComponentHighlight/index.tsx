"use client";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./index.module.scss";

const variants = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 0.2,
		transition: { duration: 0.15 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.15 },
	},
};

export const ComponentHiglight: React.FC<{ isVisible: boolean }> = ({
	isVisible,
}) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className={classes.highlight}
					initial={variants.initial}
					animate={variants.enter}
					exit={variants.exit}
				></motion.div>
			)}
		</AnimatePresence>
	);
};
