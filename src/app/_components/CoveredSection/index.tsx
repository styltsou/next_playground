"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import classes from "./index.module.scss";
import { withTooltip } from "../_lib/ComponentTooltip/withSectionTooltip";

const CoveredSectionComponent = () => {
	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end start"],
	});

	const trns = useTransform(scrollYProgress, [0, 1], [0, 200]);

	return (
		<div ref={container} className={classes.wrapper}>
			<motion.div className={classes.contentWrapper} style={{ y: trns }}>
				<div className={classes.content}>
					<h1>SFAGEIO * Agency</h1>
				</div>
			</motion.div>
			<div className={classes.roundedCorners}>
				<span />
			</div>
		</div>
	);
};

export const CoveredSection = withTooltip(
	CoveredSectionComponent,
	"CoveredSection"
);
