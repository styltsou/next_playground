import Image from "next/image";
import styles from "./page.module.css";
import { ImageParallax } from "./_components/ImageParallax";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.whiteSection}></div>
			<ImageParallax />
			<div className={styles.whiteSection}></div>
		</main>
	);
}
styles;
