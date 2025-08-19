import Image from 'next/image';
import styles from './page.module.css';
import { getResponseBodyFromExample } from './lib/serverAction';

export default async function Home() {
	const responseBody = await getResponseBodyFromExample();
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Image
					className={styles.logo}
					src='/next.svg'
					alt='Next.js logo'
					width={180}
					height={38}
					priority
				/>
				<>
					Below you see the api call response body
					<br />
				</>
				{responseBody}
			</main>
		</div>
	);
}
