import Link from "next/link";
import Image from "next/image";
import Script from 'next/script'

export default function Footer () {
    return <footer>
        <Link href="/about">By Zabaldu</Link>
        <div>
        <Image src="https://dl.circleci.com/status-badge/img/gh/pxai/zabaldu/tree/master.svg" alt="Build" width={83} height={20}/>
        </div>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-89SBRYJM9Z" strategy="afterInteractive"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-89SBRYJM9Z');
            `}
        </Script>
    </footer>;
}
