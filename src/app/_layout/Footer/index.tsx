"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import classes from "./index.module.scss";
import { useRef } from "react";
import { withTooltip } from "@/app/_components/_lib/ComponentTooltip/withTooltip";

const FooterComponent = () => {
	const footerContainer = useRef(null);

	const { scrollYProgress } = useScroll({
		target: footerContainer,
		offset: ["start end", "end end"],
	});

	const trns = useTransform(scrollYProgress, [0, 1], [-200, 0]);

	return (
		<footer ref={footerContainer} className={classes.footer}>
			<div className={classes.roundedCornersWrapper}>
				<span></span>
			</div>
			<div className={classes.contentWrapper}>
				<motion.div className={classes.content} style={{ y: trns }}>
					This is a footer
				</motion.div>
			</div>
		</footer>
	);
};

export const Footer = withTooltip(FooterComponent, "Footer");
