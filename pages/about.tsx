import Head from "next/head";
import Link from "next/link";
import styles from "../styles/About.module.css";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>
            <header className={styles.header}>
                <Link href="https://www.symbio.one/">
                    <Image
                        src="/logo1.png"
                        alt="Logo"
                        width={250}
                        height={120}
                    />
                </Link>
                <div className={styles.bar}>
                    <Link href=".." className={styles.buttons}>
                        <h1>ACCUEIL</h1>
                    </Link>
                    <Link href="system" className={styles.buttons}>
                        <h1>
                            CONTRÔLE
                            <br />
                            -
                            <br />
                            COMMANDE
                        </h1>
                    </Link>
                    <Link href="about" className={styles.buttons}>
                        <h1>ANNEXES</h1>
                    </Link>
                    <Link href="about_us" className={styles.buttons}>
                        <h1>NOTRE GROUPE</h1>
                    </Link>
                </div>
            </header>
            <div className={styles.annexes}>
                <h1>
                    Notre vidéo "Mon projet industrie en 180s" (En cours de
                    réalisation)
                </h1>
                <video width="90%" controls>
                    <source
                        src="files/a_remplacer_video_180s.mp4"
                        type="video/mp4"
                    />
                </video>
                <h1>Notre rapport de projet industrie (En cours d'écriture)</h1>
                <iframe
                    src="files/rapport_projet.pdf"
                    width="90%"
                    height="500px"
                ></iframe>
            </div>
            <footer className={styles.footer}>
                <Link href="about_us">
                    Membres du groupe :{" "}
                    <b className={styles.noms}>
                        &nbsp;CORCORAL Erwan / ROCH Valentin / SALHI Thomas /
                        THELLIER Elie
                    </b>
                </Link>
            </footer>
        </div>
    );
}
