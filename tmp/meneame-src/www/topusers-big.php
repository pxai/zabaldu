<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es>.
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
// 		http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".

include('config.php');
include(mnminclude.'html1.php');
//include(mnminclude.'link.php');
include(mnminclude.'user.php');

$globals['ads'] = true;
$page_size = 20;

$range_names  = array( _('todas'), _('24 horas'), _('última semana'), _('último mes'), _('último año'));
$range_values = array(0, 86400, 604800, 2592000, 31536000);

$offset=(get_current_page()-1)*$page_size;

$items = array(_('usuario'), _('noticias'), _('noticias publicadas'), _('comentarios'), _('votos totales'), _('votos de publicadas'));

$sortby = preg_replace('/ /', '_', $_GET['sortby']);
if(intval($sortby) < 0 || intval($sortby) > 5) 
	$sortby = 4;
else $sortby = intval($sortby); // Be safe, always!!!!


switch ($sortby) {
	case 0:
		$select = "SELECT user_id ";
		$from_where = " FROM users ";
		$order_by = " ORDER BY user_login ";
		break;
	case 1:
		$select = "SELECT user_id, count(*) as count ";
		$from_where = " FROM links, users WHERE  link_status != 'discard' AND link_author=user_id GROUP BY link_author";
		$order_by = " ORDER BY count DESC ";
		break;
	case 2:
		$select = "SELECT user_id, count(*) as count ";
		$from_where = " FROM links, users WHERE  link_status = 'published' AND link_author=user_id GROUP BY link_author";
		$order_by = " ORDER BY count DESC ";
		break;
	case 3:
		$select = "SELECT user_id, count(*) as count ";
		$from_where = " FROM comments, users WHERE comment_user_id=user_id GROUP BY comment_user_id";
		$order_by = " ORDER BY count DESC ";
		break;
	case 4:
		$select = "SELECT user_id, count(*) as count ";
		$from_where = " FROM votes, users WHERE vote_type='links' and vote_user_id=user_id GROUP BY vote_user_id";
		$order_by = " ORDER BY count DESC ";
		break;
	case 5:
		$select = "SELECT user_id, count(*) as count ";
		$from_where = " FROM votes, users, links WHERE vote_type='links' and vote_user_id=user_id AND link_id=vote_link_id AND link_status='published' AND vote_date < link_published_date GROUP BY user_id";
		$order_by = " ORDER BY count DESC ";
		break;
}
// Sort by votes

do_header(_('usuarios'));
do_navbar('<a href="'.$globals['base_url'].'topusers.php">'._('usuarios') . '</a> &#187; ' . _('estadísticas'));
echo '<h2>'._('estadísticas').'</h2>';

echo '<p>&nbsp;</p> <table><tr>';

// Print headers
for($i=0; $i<count($items); $i++) {
	echo '<th class="short">';
	if($i==$sortby) 
		echo '<span class="info_s">'.$items[$i].'</span>';
	else 
		echo '<a href="'.htmlspecialchars($_SERVER['PHP_SELF']).'?sortby='.$i.'">'.$items[$i].'</a>';
	echo '</th>';
}

echo '<th class="short">karma</th>';
echo '</tr>';
$user = new User;
$rows = $db->get_var("SELECT count(*) as count $from_where");
$users = $db->get_results("$select $from_where $order_by LIMIT $offset,$page_size");
if ($users) {
	foreach($users as $dbuser) {
		$user->id=$dbuser->user_id;
		$user->read();
		$user->all_stats();
		echo '<tr>';
		echo '<td><a href="'.$globals['base_url'].'user.php?login='.$user->username.'"><img src="'.get_gravatar_url($user->email, 20).'" width="20" height="20" alt="icon gravatar.com" />'.$user->username.'</a></td>';
		echo '<td class="short">'.$user->total_links.'</td>';
		if($user->total_links>0) 
			echo '<td class="short">'.$user->published_links.'&nbsp;('.intval($user->published_links/$user->total_links*100).'%)</td>';
		else 
			echo '<td class="short">'.$user->published_links.'&nbsp;(-)</td>';
		echo '<td class="short">'.$user->total_comments.'</td>';
		echo '<td class="short">'.$user->total_votes.'</td>';
		if($user->total_votes>0) 
			echo '<td class="short">'.$user->published_votes.'&nbsp;('.intval($user->published_votes/$user->total_votes*100).'%)</td>';
		else
			echo '<td class="short">'.$user->published_votes.'&nbsp;(-)</td>';
		echo '<td class="short">'.$user->karma.'</td>';
		echo '</tr>';
	}
}
echo "</table>\n\n";
do_pages($rows, $page_size);
do_footer();


?>
