import { cn } from "@/app/_utils/cn";
import classes from "./index.module.scss";

export const Modal: React.FC<{
	className: string;
	children: React.ReactNode;
}> = ({ className, children }) => {
	return (
		<div className={classes.fixedContainer}>
			<div className={classes.wrapper}>
				<div className={classes.overlay} />
				<div className={cn(classes.modalContainer, className)}>{children}</div>
			</div>
		</div>
	);
};
