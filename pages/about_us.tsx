import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Aboutus.module.css";
import { useState } from "react";

export default function AboutUs({ photos }: any) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentPhotoIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
    };

    const currentPhoto = photos[currentPhotoIndex];
    return (
        <div className={styles.container}>
            <Head>
                <title>About Us</title>
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
            <br />
            <h1 className={styles.title}>Membres</h1>
            <div className={styles.desc}>
                <p>DepInfo : [Elie]</p>
                <p>DepNRJ : [Erwan, Thomas, Valentin]</p>
            </div>
            <h1 className={styles.title}>Notre album</h1>
            <div className={styles.album_navigation}>
                <Image
                    src="/icons/left-arrow.png"
                    width={100}
                    height={100}
                    alt="left"
                    onClick={handlePrevious}
                    hidden={currentPhotoIndex === 0}
                    className={styles.arrow}
                />
                <div>
                    <Image
                        src={currentPhoto.src}
                        width={500}
                        height={500}
                        alt="Photo"
                    />
                </div>
                <Image
                    src="/icons/right-arrow.png"
                    width={100}
                    height={100}
                    alt="left"
                    onClick={handleNext}
                    hidden={currentPhotoIndex === photos.length - 1}
                    className={styles.arrow}
                />
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

export async function getStaticProps() {
    const photos = [
        { id: 1, src: "/album/photo1.jpg" },
        { id: 2, src: "/album/photo2.jpg" },
        { id: 3, src: "/album/photo3.jpg" },
        { id: 4, src: "/album/photo4.jpg" },
        { id: 5, src: "/album/photo5.jpg" },
        { id: 6, src: "/album/photo6.jpg" },
        { id: 7, src: "/album/photo7.jpg" },
        { id: 8, src: "/album/photo8.jpg" },
        { id: 9, src: "/album/photo9.jpg" },
        { id: 10, src: "/album/photo10.jpg" },
        { id: 11, src: "/album/photo11.jpg" },
        { id: 12, src: "/album/photo12.jpg" },
        { id: 13, src: "/album/photo13.jpg" },
    ];

    return {
        props: {
            photos,
        },
    };
}
