import './entry.styles.scss';

const Entry = ({ entry }) => {
  const { title, text, link, submitted, when, comments, tags, category, votes } = entry;
  return (
    <div className="news-summary">
      <div className="news-body">
        <ul className="news-shakeit">
          <li className="mnm-published" id="main691"><a id="mnms-691" href="story.php?albistea=691">{votes} zabaltze</a></li>
          <li className="menealo" id="mnmlink-691"><a href="/" title="bozkatu gogoko baduzu">zabaldu</a></li>
        </ul>
        <h3 id="title691">
          <a href={`${link}`}>{title}</a>
        </h3>
        <div className="news-submitted">
          <a href="user.php?login={submitted.user}" title="hatxekin"><img src="http://www.gravatar.com/avatar.php?gravatar_id=73c41b8144c402ee8e7df4902eaa75fc&amp;rating=PG&amp;size=25&amp;default=http%3A%2F%2Fwww.zabaldu.com%2Fimg%2Fcommon%2Fno-gravatar-2-25.jpg" width="25" height="25" alt="icon gravatar.com" /></a>
          <strong>{link}</strong><br />
          <a href="user.php?login=hatxekin&amp;view=history"><strong>{submitted.user}</strong></a> (e)k bidali du {when} argitaratuta
        </div>
        <div className="news-body-text">
          {text}
        </div>
        <div className="news-details">
          <a href="story.php?albistea=691" className="tool comments">{comments.length} iruzkinik gabe</a><span className="tool"><a href="cloud.php" title="lainoa">etiketak</a>: <a href="index.php?search=liburua%2C+kazetaritza%2C.+nazioartea&amp;tag=true">{tags.join(',')}</a></span>
          <span className="tool">hemen: <a href="./index.php?category=6" title="kategoria">{category}</a></span>
        </div>
      </div>
    </div>
  );
};

export default Entry;
