"use client";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./provider";
import { useOnClickOutside } from "@/app/_hooks/useOnClickOutside";
import { cn } from "@/app/_utils/cn";
import classes from "./index.module.scss";

export const Modal: React.FC<{
	slug: string;
	children: React.ReactNode;
	className?: string;
}> = ({ slug, className, children }) => {
	const modalRef = useRef(null);

	const { isModalOpen, closeModal } = useModal();

	useOnClickOutside(modalRef, () => {
		closeModal(slug);
	});

	return (
		<div className={classes.fixedContainer}>
			<AnimatePresence>
				{isModalOpen(slug) && (
					<motion.div className={classes.wrapper}>
						<motion.div className={classes.overlay} />
						<motion.div
							ref={modalRef}
							className={cn(classes.modalContainer, className)}
						>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
