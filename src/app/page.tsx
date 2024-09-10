import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project</p>
      </div>
      
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/classkick.png"
          alt="Classkick Logo"
          width={200}
          height={50}
          priority
        />
      </div>

      <div className={styles.description}>
        <p>
          Run it on <Link href="/playground">http://localhost:3000/playground</Link>
        </p>
      </div>

    </main>
  )
}
