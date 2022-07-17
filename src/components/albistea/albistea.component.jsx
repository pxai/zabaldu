import './albistea.styles.scss';

const Albistea = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="news-summary">
      <div class="news-body">
        <ul class="news-shakeit">
          <li class="mnm-published" id="main691"><a id="mnms-691" href="story.php?albistea=691">8 zabaltze</a></li>
          <li class="menealo" id="mnmlink-691"><a href="javascript:menealo(0, 691, 691, '95072a32dc57c060f9f8708a2b653a28')" title="bozkatu gogoko baduzu">zabaldu</a></li>
        </ul>
        <h3 id="title691">
          <a href="https://web.archive.org/web/20060901012937/http://alua.mundua.com/2006/08/29/kazetarientzat-eta-pertsonentzat-ikasbidea/">Kazetari eta pertsonentzat ikasbidea</a>
        </h3>
        <div class="news-submitted">
          <a href="user.php?login=hatxekin" title="hatxekin"><img src="https://web.archive.org/web/20060901012937im_/http://www.gravatar.com/avatar.php?gravatar_id=73c41b8144c402ee8e7df4902eaa75fc&amp;rating=PG&amp;size=25&amp;default=http%3A%2F%2Fwww.zabaldu.com%2Fimg%2Fcommon%2Fno-gravatar-2-25.jpg" width="25" height="25" alt="icon gravatar.com" /></a>
          <strong>alua.mundua.com/2006/08/29/kazetarientzat-eta-pertsonentzat-ikasbidea/</strong><br />
          <a href="user.php?login=hatxekin&amp;view=history"><strong>hatxekin</strong></a> (e)k bidali du duela 2 egun 7 ordu 10 minutu, duela 1 egun 16 ordu 39 minutu argitaratuta
        </div>
        <div class="news-body-text">
          Riszard Kapuscinzki journalista poloniarraren liburu bati buruzko iruzkina
        </div>
        <div class="news-details">
          <a href="story.php?albistea=691" class="tool comments">iruzkinik gabe</a><span class="tool"><a href="cloud.php" title="lainoa">etiketak</a>: <a href="index.php?search=liburua%2C+kazetaritza%2C.+nazioartea&amp;tag=true">liburua,  kazetaritza, . nazioartea</a></span>
          <span class="tool">hemen: <a href="./index.php?category=6" title="kategoria">Kultura</a></span>
        </div>
      </div>
    </div>
  );
};

export default Albistea;
