import Link from "next/link";
import Script from 'next/script'

export default function Header () {
    return <footer>
        <Link href="/about">By Zabaldu</Link>
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
