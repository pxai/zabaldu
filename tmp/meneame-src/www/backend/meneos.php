<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es> and 
// Beldar <beldar.cat at gmail dot com>
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
// 		http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".
// The code below was made by Beldar <beldar at gmail dot com>
if (! defined('mnmpath')) {
	include_once('../config.php');
	header('Content-Type: text/html; charset=utf-8');
}

include_once('pager.php');

global $db, $globals;

if (!isset($globals['link_id']) && !empty($_GET['id'])) {
	$globals['link_id'] = intval($_GET['id']);
} 
/** Show voters always
	else {
	// Don't show all voters if it's called from story.php
	$no_show_voters = true;
}
***/

if (! $globals['link_id'] > 0 ) die;

if (!isset($_GET['p']))  {
	$votes_page = 1;
} else $votes_page = intval($_GET['p']);

$votes_page_size = 20;
$votes_offset=($votes_page-1)*$votes_page_size;


$votes_users = $db->get_var("SELECT count(*) FROM votes WHERE vote_type='links' and vote_link_id=".$globals['link_id']." AND vote_user_id!=0 AND vote_value > 0");
$votes_anon = $db->get_var("SELECT count(*) FROM votes WHERE vote_type='links' and vote_link_id=".$globals['link_id']." AND vote_user_id=0 AND vote_value > 0");

echo '<div class="news-details">';
echo _('votos usuarios'). ': '.$votes_users.',&nbsp;&nbsp;';
echo _('votos anónimos'). ': '.$votes_anon;
$negatives = $db->get_results("select vote_value, count(vote_value) as count from votes where vote_type='links' and vote_link_id=".$globals['link_id']." and vote_value < 0 group by vote_value order by count desc");
if ($negatives) {
	foreach ($negatives as $negative) {
		echo ',&nbsp; ';
		echo get_negative_vote($negative->vote_value) . ':&nbsp;' . $negative->count;
	}
}
echo '</div>';

if ($no_show_voters) {
	// don't show voters if the user votes the link
	echo '<br /><br />&#187;&nbsp;' . '<a href="javascript:get_votes(\'meneos.php\',\'voters\',\'voters-container\',1,'.$globals['link_id'].')" title="'._('quiénes han votado').'">'._('ver quiénes han votado').'</a>';
} else {
	//echo '<script type="text/javascript">var update_voters=true;</script>';
	$votes = $db->get_results("SELECT vote_user_id, vote_ip, user_email, user_avatar, user_login, date_format(vote_date,'%d/%m %T') as date FROM votes, users WHERE vote_type='links' and vote_link_id=".$globals['link_id']." AND vote_user_id > 0 AND vote_value > 0 AND user_id = vote_user_id ORDER BY vote_date ASC LIMIT $votes_offset,$votes_page_size");
	if (!$votes) die;
	echo '<div class="voters-list">';
	foreach ( $votes as $vote ){
		echo '<div class="item">';
		echo '<a href="'.$globals['base_url'].'user.php?login='.urlencode($vote->user_login).'" title="'.$vote->date.'">';
		echo '<img src="'.get_avatar_url($vote->vote_user_id, $vote->user_avatar, $vote->user_email, 20).'" width="20" height="20" alt="'.$vote->user_login.'"/>';
		echo $vote->user_login.'</a>';
		echo '</div>';
	}
	echo "</div>\n";
	do_contained_pages($globals['link_id'], $votes_users, $votes_page, $votes_page_size, 'meneos.php', 'voters', 'voters-container');
}

?>
