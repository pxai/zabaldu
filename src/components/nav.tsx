import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import axios from 'axios';
import { StoryProps } from 'prisma/types';

export default function Nav () {
    const { t } = useTranslation();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data: session, status } = useSession();
    const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       setSearchTerm(event.target.value);
    }
    
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
      if (searchTerm.trim().length < 3 ) return;

      if (event.key === 'Enter') {
        router.push(`/search?term=${searchTerm}`)
      }
    }

    const handleSignOut = () => {
      signOut();
    }

    return (
        <>
        <div id="logo">
          <Link href='/'>
              <Image src="/zabaldu.png" alt="zabaldu.net" width="250" height="60" />
          </Link>
        </div>
        <div id="header">
          <ul>
            <li>
                <Link href="/queued">              
                    Ilarakoak
                </Link>{' | '}
            </li>
          {session ? (
            <>
                <li>
                <Link href="/story/add" data-active={isActive('/profile')}>
                        Bidali istorioa
                </Link>
              </li>
              <li>
                <Link href="/profile" data-active={isActive('/profile')}>
                        Profila
                </Link>
              </li>
              <li>
                <a onClick={handleSignOut}>
                        Atera
                </a>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/api/auth/signin" data-active={isActive('/signup')}>
                    Sartu
                </Link></li>
            </>

          )}
          <li>
            <div>
              <input name="search" placeholder="..." type="text" value={searchTerm} onChange={handleChange} onKeyDown={handleSearch}/>
            </div>
          </li>
          </ul>
        </div>
        <div id="nav-string">
          <div>» <Link href='/'><strong>Zabaldu</strong></Link>
          </div>
        </div>
    </>

    )
}