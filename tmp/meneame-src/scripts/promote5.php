<?
include('../config.php');
include(mnminclude.'link.php');

header("Content-Type: text/html");
echo '<html><head><title>promote5.php</title></head><body>';
ob_end_flush();
?>
<style type="text/css">
body {
	font-family: Bitstream Vera Sans, Arial, Helvetica, sans-serif;
	font-size: 80%;
	margin: 0px;
	padding: 20px;
}
table {
	width: 90%;
	font-size: 110%;
	margin: 0px;
	padding: 4px;
}
td {
	margin: 0px;
	padding: 4px;
}
.thead {
	font-size: 115%;
	text-transform: uppercase;
	color: #FFFFFF;
	background-color: #FF6600;
	padding: 6px;
}
.tdata0 {
	background-color: #FFF;
}
.tdata1 {
	background-color: #FFF3E8;
}
.tnumber0 {
	text-align: center;
}
.tnumber1 {
	text-align: center;
	background-color: #FFF3E8;
}
</style>
<?

$min_karma_coef = 0.8;
define(MAX, 1.20);
define (MIN, 1.0);


$now = time();
echo "<p><b>BEGIN</b>: ".get_date_time($now)."<br>\n";

$from_time = "date_sub(now(), interval 4 day)";
#$from_where = "FROM votes, links WHERE  


$last_published = $db->get_var("SELECT SQL_NO_CACHE UNIX_TIMESTAMP(max(link_published_date)) from links WHERE link_status='published'");
if (!$last_published) $last_published = $now - 24*3600*30;

$diff = $now - $last_published;

$d = min(MAX, MAX - ($diff/3000)*(MAX-MIN) );
$d = max($min_karma_coef, $d);
print "Last published at: " . get_date_time($last_published) ."<br>\n";
echo "Decay: $d<br>\n";

$continue = true;
$published=0;


$past_karma_long = intval($db->get_var("SELECT SQL_NO_CACHE avg(link_karma) from links WHERE link_published_date > date_sub(now(), interval 7 day) and link_status='published'"));
$past_karma_short = intval($past_karma = $db->get_var("SELECT SQL_NO_CACHE avg(link_karma) from links WHERE link_published_date > date_sub(now(), interval 8 hour) and link_status='published'"));

$past_karma = 0.5 * max(40, $past_karma_long) + 0.5 * max($past_karma_long*0.8, $past_karma_short);

echo "Past karma. Long term: $past_karma_long, Short term: $past_karma_short, Average: <b>$past_karma</b><br>\n";
//////////////
$min_karma = round(max($past_karma * $d, 20));

if ($d >= 1) $max_to_publish = 3;
else $max_to_publish = 1;

$min_votes = 5;
/////////////

echo "Current MIN karma: <b>$min_karma</b>    MIN votes: $min_votes<br></p>\n";
$limit_karma = round($past_karma * 0.5);
$where = "link_date > $from_time AND link_status = 'queued' AND link_votes>=$min_votes  AND link_karma > $limit_karma and user_id = link_author and user_level != 'disabled'";
$sort = "ORDER BY link_karma DESC, link_votes DESC";

$links = $db->get_results("SELECT SQL_NO_CACHE link_id, link_karma as karma from links, users where $where $sort LIMIT 20");
$rows = $db->num_rows;
if (!$rows) {
	echo "There is no articles<br>\n";
	echo "--------------------------<br>\n";
	die;
}
	
$max_karma_found = 0;
$best_link = 0;
$best_karma = 0;
echo "<table>\n";	
if ($links) {
	print "<tr class='thead'><th>id</th><th>votes</th><th>negatives</th><th>karma</th><th>title</th><th>changes</th></tr>\n";
	$i=0;
	foreach($links as $dblink) {
		$link = new Link;
		$link->id=$dblink->link_id;
		$link->read();
		$karma_pos_user = 0;
		$karma_neg_user = 0;
		$karma_pos_ano = 0;
		$karma_neg_ano = 0;

		// Count number of votes
		$votes_pos = intval($db->get_var("select SQL_NO_CACHE count(*) from votes where vote_type='links' AND vote_link_id=$link->id and vote_value > 0"));
		$votes_neg = intval($db->get_var("select SQL_NO_CACHE count(*) from votes where vote_type='links' AND vote_link_id=$link->id and vote_value < 0"));

		// Calculate the real karma for the link
		$karma_pos_user = intval($db->get_var("select SQL_NO_CACHE sum(vote_value) from votes where vote_type='links' and vote_date > $from_time AND vote_link_id=$link->id and vote_user_id > 0 and vote_value > 0"));
		$karma_neg_user = intval($db->get_var("select SQL_NO_CACHE sum(vote_value-user_karma/2) from votes, users where vote_type='links' and vote_date > $from_time AND vote_link_id=$link->id and vote_user_id > 0 and vote_value < 0 and user_id=vote_user_id"));

		$karma_pos_ano = intval($db->get_var("select SQL_NO_CACHE sum(vote_value) from votes where vote_type='links' and vote_date > $from_time AND vote_link_id=$link->id and vote_user_id = 0 and vote_value > 0"));
		$karma_neg_ano = intval($db->get_var("select SQL_NO_CACHE sum(vote_value) from votes where vote_type='links' and vote_date > $from_time AND vote_link_id=$link->id and vote_user_id = 0 and vote_value < 0"));

		$karma_new = $karma_pos_user + $karma_neg_user;
		// To void votes spamming
		// Do not allow annonimous users to give more karma than registered users
		if ($karma_new > 0) 
			$karma_new += min($karma_new, $karma_pos_ano + $karma_neg_ano);


		// Aged karma
		$diff = max(0, $now - ($link->date + 18*3600)); // 1 hour without decreasing
		$oldd = 1 - $diff/(3600*144);
		$oldd = max(0.5, $oldd);
		$oldd = min(1, $oldd);
		$aged_karma =  $karma_new * $oldd;
		$dblink->karma=$aged_karma;

		$imod = $i%2;
		print "<tr><td class='tnumber$imod'>$link->id</td><td class='tnumber$imod'>".$link->votes."</td><td class='tnumber$imod'>".$link->negatives."</td><td class='tnumber$imod'>".intval($dblink->karma)."</td>";
		echo "<td class='tdata$imod'><a href='".$link->get_permalink()."'>$link->title</a>\n";
		$changes = 0;
		if (abs($link->karma - $dblink->karma) > 2 ||
			$link->votes != $votes_pos || $link->negatives != $votes_neg ) {
			printf ("<br>updated karma: %6d (%d, %d) -> %-6d (%d, %d)\n", $link->karma, $link->votes, $link->negatives, $dblink->karma, $votes_pos, $votes_neg);
			if ($link->karma > $dblink->karma) 
				$changes = 1; // to show a "decrease" later	
			else $changes = 2; // increase
			$link->karma = round($dblink->karma);
			$link->votes = $votes_pos;
			$link->negatives = $votes_neg;
			$link->store_basic();
		}
		echo "</td>\n";
			
		if ($link->votes >= $min_votes && $dblink->karma >= $min_karma && $published < $max_to_publish) {
			$published++;
			$link->karma = $dblink->karma;
			$link->status = 'published';
			$link->published_date=time();
			$link->store_basic();
			$changes = 3; // to show a "published" later	
		}
		echo "<td class='tnumber$imod'>";
		switch ($changes) {
			case 1:
				echo '<img src="../img/common/sneak-problem01.png" width="20" height="16" alt="'. _('descenso') .'"/>';
				break;
			case 2:
				echo '<img src="../img/common/sneak-vote01.png" width="20" height="16" alt="'. _('ascenso') .'"/>';
				break;
			case 3:
				echo '<img src="../img/common/sneak-published01.png" width="20" height="16" alt="'. _('publicada') .'"/>';
				break;
		}
		echo "</td>";
		echo "</tr>\n";
		$i++;
	}
	print "</table>\n";
	//////////
}  
echo "</body></html>\n";
?>
