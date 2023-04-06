import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Image  from 'next/image';
import prisma from '../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';
import { useSession } from 'next-auth/react';
import { UserProps } from 'prisma/types';

export default function Profile() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const user = session?.user as UserProps;

  console.log("user: ", user, user?.image)

  if (!user?.image) return "";
  return (
    <Layout>
      <main className="main">
      <h2 className="faq-title">{t`profile`}</h2>
  <div id="faq-contents">
      <Image src={user?.image} alt="zabaldu.net"  width="128" height="128" />
 
      <div>
        <div><strong>{t`name`}:</strong>{user.name}</div>
      </div>

  </div>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { 
      ...(await serverSideTranslations(locale!, ['common']))
    }
  };
};