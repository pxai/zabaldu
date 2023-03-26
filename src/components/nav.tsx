import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next'

export default function Nav () {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

    return (
        <nav>
            <Link href="/">
                {t`home`}
            </Link>{' | '}  
            <Link href="/queued">              
                {t`queued`}
            </Link>{' | '}
         { 
            !session ?
                <Link href="/api/auth/signin" data-active={isActive('/signup')}>
                    {t`log_in`}
                </Link>
                :
                <>
                    <Link href="/profile" data-active={isActive('/profile')}>
                        {t`profile`}
                    </Link>{' | '}
                    <Link href="/story/add" data-active={isActive('/profile')}>
                        {t`story.add`}
                    </Link>{' | '}
                    <Link href="/api/auth/signout" data-active={isActive('/signup')}>
                        {t`logout`}
                    </Link>
                </>
         }
        </nav>
    )
}