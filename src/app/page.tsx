import styles from "./page.module.css";
import { ImageParallax } from "./_components/ImageParallax";
import { CoveredSection } from "./_components/CoveredSection";

export default function Home() {
	return (
		<>
			<CoveredSection />
			<div className={styles.whiteSection}></div>
			<ImageParallax />
			<div className={styles.whiteSection}></div>
		</>
	);
}
