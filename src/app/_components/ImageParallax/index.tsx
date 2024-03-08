"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import classes from "./index.module.scss";

const images = [
	"https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1955&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1548248823-ce16a73b6d49?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1582045253062-f63cfbd45bcb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1611816055460-618287c870bd?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1548566862-2c9b1fed780a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=2108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1696418001896-272e1bb8bf23?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Column: React.FC<{ images: string[]; y?: MotionValue }> = ({
	images,
	y,
}) => {
	return (
		<motion.div className={classes.column} style={{ y }}>
			{images.map((image) => (
				<div key={crypto.randomUUID()} className={classes.imageContainer}>
					<Image src={image} fill alt='some alt description' />
				</div>
			))}
		</motion.div>
	);
};

export const ImageParallax = () => {
	const galleryContainer = useRef(null);

	const { scrollYProgress } = useScroll({
		target: galleryContainer,
		offset: ["start end", "end start"],
	});

	// TODO: use window height as a base for the translate
	const trns1 = useTransform(scrollYProgress, [0, 1], [0, 1700]);
	const trns2 = useTransform(scrollYProgress, [0, 1], [0, 3200]);
	const trns3 = useTransform(scrollYProgress, [0, 1], [0, 1250]);
	const trns4 = useTransform(scrollYProgress, [0, 1], [0, 3000]);

	useEffect(() => {
		console.log(scrollYProgress);
	}, [scrollYProgress]);

	return (
		<section ref={galleryContainer} className={classes.wrapper}>
			<Column images={[images[0], images[1], images[2]]} y={trns1} />
			<Column images={[images[3], images[4], images[5]]} y={trns2} />
			<Column images={[images[6], images[7], images[8]]} y={trns3} />
			<Column images={[images[9], images[10], images[11]]} y={trns4} />
		</section>
	);
};
