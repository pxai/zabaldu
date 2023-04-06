import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout';

export default function About() {
  const { t } = useTranslation()

  return (
    <Layout>
      <main className="main">
      Zabaldu.net
      <h2 className="faq-title">Ohiko galderak</h2>
<div id="faq-contents">
<ol>
<li>
<h4>Zer da zabaldu.net?</h4>
<p>Zabaldu.com-en berpizkundea. Interneten aurkitutako albiste interesgarrienak zabaltzeko aukera ematen duen sistema da. Edozeinek bidali ditzake albisteak eta gainontzekoek bozkatu ditzakete, horrela boto kopuru bat jasoz, jendeari interesatzen zaionaren arabera. Eta horrela, boto gehien jasotzen dituztenak azalduko dira hasierako orrialdean. Hasiera batean bidalitako albisteak <a href="shakeit.php"><em>ilarara</em></a> doaz zuzenean, eta botoak jasotzen baditu orrialde printzipalera joango da.
</p>
</li>

<li>
<h4>Beharrezkoa da erregistratzea?</h4>
<p>Albisteak bidali eta iruzkinak idazteko bai, baina irakurri eta bozkatzeko ez, ordea. Dena dela, zure botoak balio handiagoa izango du erregistratuta baldin bazaude, eta honela zuk ere albisteak bidaltzeko aukera izango duzu.
</p>
</li>


<li>
<h4>Zein motatako albisteak bidali daitezke?</h4>
<p>Edozein gairekin erlazionatuta dauden albisteak bidali daitezke, interesgarriak badira, noski. Baldintza bakarra albistea bidaltzerakoan idazten duzun aipamena euskaraz egotea da. Bestalde, baliteke aurkitu duzun albiste hori euskaraz ez egotea, baina interesgarria dela uste izatea. Kasu hauetan, beste webgune batean albiste berbera euskaraz aurkituz gero, hori bidali, bestela erdarazkoa bidali. Albisteak blogetan, aldizkarietan... edonon egon daitezke.
</p>
</li>


<li>
<h4>Nola bozkatu albisteak?</h4>
<p>Jo <a href="/queued"><em>&quot;ilarakoak zabaldu&quot;</em></a> atalera eta argitaratu gabe dauden albisteak ikusiko dituzu, bidalpen dataren araberako hurrenkera beherakorrarekin. Gehien gustatzen zaizkizunak edo garrantzitsuenak baino ez dituzu &quot;zabaldu&quot; behar, horrela boto nahikoa jasotzen dituztenak agertuko dira hasierako orrialdean.</p>
</li>


<li>
<h4>Zer da albisteen behekaldean ageri den <em>arazorik?</em> formulario hori?</h4>
<p>Albiste bat errepikatuta dagoela, <em>spam</em> dela edo edozein arrazoigatik baliogarria ez dela bozkatzeko balio duen formularioa da.</p>
</li>


<li>
<h4>Boto kopurua da kontutan hartzen den gauza bakarra?</h4>
<p>Ez, <em>karma</em> ere izaten da kontutan, botoak erregistratuko erabiltzaileenak edo anonimoak diren, eta baita boto negatiboak ere.</p>
</li>


<li>
<h4>Zer da <em>karma</em>?</h4>
<p>Erregistratutako erabiltzaile bakoitzak karma bat du bere partehartze mailaren arabera. Hots, erabiltzaile bakoitzak 6 eta 20 arteko balio bat du, sarritan parte hartuz handituz doana. Horrela, erabiltzaile esperientzia saritzen da, karma altua duen erabiltzaile baten botoak balio altuagoa duelarik.</p>
</li>


<li>
<h4>Zer egin behar da albisteak bidaltzeko?</h4>
<p>Lehenik eta behin erregistratu, oso erraza da eta ez da batere kostatzen. Ondoren, albistea bidali atalera jo. Orain, hiru pauso sinple jarraitu baino ez duzu egin behar albistea bidaltzeko. Dena dela, albistea bidali aurretik, kontuan izan jendearentzako albiste interesgarria izan daitekeen, ez bidali interes gabeko albisterik.</p>
</li>

<li>
<h4>Boto eta karma kontzeptuek nola funtzionatzen dute?</h4>
<p>Erregistratutako erabiltzaile baten botoek eta anonimoenek ez dute berdin balio. Boto anonimo batek 4 puntu balio ditu, eta erabiltzaile erregistratu batenak 6 eta 20 artean, bere karmaren arabera.</p>
</li>

<li>
<h4>Nola hautatzen dira azaleratuko diren albisteak?</h4>
<p>Hau erabakitzeko 5 minuturo exekutatzen den prozesu konplexu bat dago. Azalera pasatzeko behar den boto kopurua erlatiboa da. Alde batetik, boto negatiboak jasotzeak boto positibo gehiago eskatzen ditu argitaratu ahal izateko. Eta honez gain, boto kopurua azken bi asteetako mugimendu eta karma guztien batezbestekoaren arabera kalkulatzen da.</p>
<p>Aipatutako prozesu honek albiste batek boto nahikoa jaso duela antzematen duenean, azalean argitaratzen du.</p>
</li>


<li>
<h4>Nola egina dago sistema hau?</h4>
<p>NextJS, TS, CockroachDB</p>
</li>


</ol>

<p>Kontuan izan <strong>zabaldu.com</strong> beta bertsioan dagoela oraindik eta litekeena dela zuk zeuk hobetzeko proposamenak izatea. Horrela balitz, eskertuko genizuke kontaktua(a bildua)zabaldu.com helbidean jakinaraziko bazenigu. Mila esker!</p>

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