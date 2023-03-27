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

    const handleChange = () => {
       
      }
    
      const handleSearch = () => {

      }

    return (
        <>
        <div id="logo">
          <Link href='/'>
              <img src="/zabaldu.png" />
          </Link>
        </div>
        <div id="header">
          <ul>
            <li>
                <Link href="/queued">              
                    {t`queued`}
                </Link>{' | '}
            </li>
          {!session ? (
            <>
                <li>
                <Link href="/story/add" data-active={isActive('/profile')}>
                        {t`story.add`}
                </Link>
              </li>
              <li>
                <Link href="/profile" data-active={isActive('/profile')}>
                        {t`profile`}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/api/auth/signin" data-active={isActive('/signup')}>
                    {t`log_in`}
                </Link></li>
            </>

          )}
          <li>
            <div>
              <input name="search" placeholder="..." type="text" onChange={handleChange} onKeyDown={handleSearch}/>
            </div>
          </li>
          </ul>
        </div>
        <div id="nav-string">
          <div>» <Link href='/'><strong>Zabaldu</strong></Link></div>
        </div>
    </>

    )
}