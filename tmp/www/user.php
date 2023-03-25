<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es>.
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
//              http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".

include('config.php');
include(mnminclude.'html1.php');
include(mnminclude.'link.php');
include(mnminclude.'user.php');

$offset=(get_current_page()-1)*$page_size;
$globals['ads'] = true;


if (!empty($globals['base_user_url']) && !empty($_SERVER['PATH_INFO'])) {
	$url_args = preg_split('/\/+/', $_SERVER['PATH_INFO']);
	array_shift($url_args); // The first element is always a "/"
	$_REQUEST['login'] = clean_input_string($url_args[0]);
	$_REQUEST['view'] = $url_args[1];
} else {
	$_REQUEST['login'] = clean_input_string($_REQUEST['login']);
	if (!empty($globals['base_user_url']) && !empty($_REQUEST['login'])) {
		header('Location: ' . get_user_uri($_REQUEST['login'], clean_input_string($_REQUEST['view'])));
		die;
	}
}

$login = $_REQUEST['login'];
if(empty($login)){
	if ($current_user->user_id > 0) {
		header('Location: ' . get_user_uri($current_user->user_login));
		die;
	} else {
		header('Location: '.$globals['base_url']);
		die;
	}
}
$user=new User();
$user->username = $db->escape($login);
if(!$user->read()) {
	not_found();
}

$view = clean_input_string($_REQUEST['view']);
if(empty($view)) $view = 'profile';
do_header(_('perfil de usuario'). ': ' . $login);
do_navbar('<a href="'.$globals['base_url'].'topusers.php">'._('usuarios') . '</a> &#187; ' . $user->username);
echo '<div id="genericform-contents">'."\n";

// Tabbed navigation
if (strlen($user->names) > 0) {
	$display_name = $user->names;
}
else {
	$display_name = $user->username;
}
echo '<h2>'.$display_name.'</h2>'."\n";

$url_login = urlencode($login);
switch ($view) {
	case 'history':
		do_user_tabs(2, $login);
		do_history();
		do_pages($rows, $page_size);
		break;
	case 'commented':
		do_user_tabs(3, $login);
		do_commented();
		do_pages($rows, $page_size);
		break;
	case 'shaken':
		do_user_tabs(4, $login);
		do_shaken();
		do_pages($rows, $page_size);
		break;
	case 'preferred':
		do_user_tabs(5, $login);
		do_preferred();
		break;
	case 'voters':
		do_user_tabs(6, $login);
		do_voters();
		break;
	case 'profile':
	default:
		do_user_tabs(1, $login);
		do_profile();
		break;
}

echo '</div>'."\n";

do_footer();

//echo '<div id="contents">';
//echo '</div>';



function do_profile() {
	global $user, $current_user, $login, $db, $globals;


	echo '<fieldset><legend>';
	echo _('información personal');
	if($login===$current_user->user_login) {
		echo ' (<a href="'.$globals['base_url'].'profile.php">'._('modificar').'</a>)';
	} elseif ($current_user->user_level == 'god') {
		echo ' (<a href="'.$globals['base_url'].'profile.php?login='.urlencode($login).'">'._('modificar').'</a>)';
	}
	echo '</legend>';
	echo '<img class="sub-nav-img" src="'.get_avatar_url($user->id, $user->avatar, 80).'" width="80" height="80" alt="'.$user->username.'" title="avatar" />';

	echo '<dl>';	
	if(!empty($user->username)) {
		echo '<dt>'._('usuario').':</dt><dd>'.$user->username;
		if ($login===$current_user->user_login || $current_user->user_level == 'god') {
			echo " (" . _('id'). ": <em>$user->id</em>)";
			echo " (<em>$user->level</em>)";
		}
		if($current_user->user_level=='god') {
			echo " (" . _('registro'). ": <em>$user->username_register</em>)";
		}

		echo '</dd>';
	}
	if(!empty($user->names))
		echo '<dt>'._('nombre').':</dt><dd>'.$user->names.'</dd>';
	if(!empty($user->url)) {
		if (!preg_match('/^http/', $user->url)) $url = 'http://'.$user->url;
		else $url = $user->url;
		echo '<dt>'._('sitio web').':</dt><dd><a href="'.$url.'">'.$url.'</a></dd>';
	}
	echo '<dt>'._('desde').':</dt><dd>'.get_date($user->date).'</dd>';
	if(!empty($user->karma))
		echo '<dt>'._('karma').':</dt><dd>'.$user->karma.'</dd>';
	if($current_user->user_level=='god')
		echo '<dt>'._('email').':</dt><dd>'.$user->email. ' (' .  _('registro'). ": <em>$user->email_register</em>)</dd>";
	echo '</dl></fieldset>';

	$user->all_stats();
	echo '<fieldset><legend>'._('estadísticas de meneos').'</legend><dl>';

        echo '<dt>'._('noticias enviadas').':</dt><dd>'.$user->total_links.'</dd>';
		if ($user->total_links > 0 && $user->published_links > 0) {
			$percent = intval($user->published_links/$user->total_links*100);

		} else {
			$percent = 0;
		}
		if ($user->total_links > 1) {
			$entropy = intval(($user->blogs() - 1) / ($user->total_links - 1) * 100);
        	echo '<dt><em>'._('entropía').'</em>:</dt><dd>'.$entropy.'%</dd>';
		}
        echo '<dt>'._('noticias publicadas').':</dt><dd>'.$user->published_links.' ('.$percent.'%)</dd>';
        echo '<dt>'._('comentarios').':</dt><dd>'.$user->total_comments.'</dd>';
        echo '<dt>'._('número de votos').':</dt><dd>'.$user->total_votes.'</dd>';
        echo '<dt>'._('votos de publicadas').':</dt><dd>'.$user->published_votes.'</dd>';

	echo '</dl></fieldset>';

	
	// Only show voters to registered users
	if ($current_user->user_id == 0) return;
	

	echo '<fieldset style="width: 45%; display: block; float: left;"><legend>';
	echo _('autores preferidos');
	echo '</legend>';
	$prefered_id = $user->id;
	$prefered_type = 'friends';
	echo '<div id="friends-container">'. "\n";
	require('backend/get_prefered_bars.php');
	echo '</div>'. "\n";
	echo '</fieldset>'. "\n";


	echo '<fieldset style="width: 45%; display: block; float: right;"><legend>';
	echo _('votado por');
	echo '</legend>';
	$prefered_id = $user->id;
	$prefered_type = 'voters';
	echo '<div id="voters-container">'. "\n";
	require('backend/get_prefered_bars.php');
	echo '</div>'. "\n";
	echo '</fieldset>'. "\n";

	echo '<br clear="all" />';

	// Show first numbers of the addresss if the user has god privileges
	if ($current_user->user_level == 'god' &&
			$user->level != 'god' && $user->level != 'admin' ) { // tops and admins know each other for sure, keep privacy
		$addresses = $db->get_results("select distinct vote_ip as ip from votes where vote_type='links' and vote_user_id = $user->id and vote_date > date_sub(now(), interval 60 day) order by vote_date desc limit 20");

		// Try with comments
		if (! $addresses) {
			$addresses = $db->get_results("select distinct comment_ip as ip from comments where comment_user_id = $user->id and comment_date > date_sub(now(), interval 60 day) order by comment_date desc limit 20");
		}

		// Not addresses to show
		if (! $addresses) {
			return;
		}

		$clone_counter = 0;
		echo '<fieldset><legend>'._('últimas direcciones IP').'</legend>';
		echo '<ol>';
		foreach ($addresses as $dbaddress) {
			$ip_pattern = preg_replace('/\.[0-9]+$/', '', $dbaddress->ip);
			echo '<li>'. $ip_pattern . ': <span id="clone-container-'.$clone_counter.'"><!--<a href="javascript:get_votes(\'ip_clones.php\',\''.$ip_pattern.'\',\'clone-container-'.$clone_counter.'\',0,'.$user->id.')" title="'._('clones').'">&#187;&#187;</a>--></span></li>';
			$clone_counter++;
		}
		echo '</ol>';
		echo '</fieldset>';
	}

}


function do_history () {
	global $db, $rows, $user, $offset, $page_size;

	$link = new Link;
	echo '<h2>'._('noticias enviadas').'</h2>';
	$rows = $db->get_var("SELECT count(*) FROM links WHERE link_author=$user->id AND link_votes > 0");
	$links = $db->get_col("SELECT link_id FROM links WHERE link_author=$user->id AND link_votes > 0 ORDER BY link_date DESC LIMIT $offset,$page_size");
	if ($links) {
		foreach($links as $link_id) {
			$link->id=$link_id;
			$link->read();
			$link->print_summary('short');
		}
	}
}

function do_shaken () {
	global $db, $rows, $user, $offset, $page_size;

	$link = new Link;
	echo '<h2>'._('noticias votadas').'</h2>';
	$rows = $db->get_var("SELECT count(*) FROM links, votes WHERE vote_type='links' and vote_user_id=$user->id AND vote_link_id=link_id and vote_value > 0");
	$links = $db->get_col("SELECT link_id FROM links, votes WHERE vote_type='links' and vote_user_id=$user->id AND vote_link_id=link_id  and vote_value > 0 ORDER BY link_date DESC LIMIT $offset,$page_size");
	if ($links) {
		foreach($links as $link_id) {
			$link->id=$link_id;
			$link->read();
			$link->print_summary('short');
		}
	}
}


function do_commented () {
	global $db, $rows, $user, $offset, $page_size;

	$link = new Link;
	echo '<h2>'._('noticias comentadas').'</h2>';
	$rows = $db->get_var("SELECT count(distinct comment_link_id) FROM comments WHERE comment_user_id=$user->id");
	$links = $db->get_col("SELECT DISTINCT link_id FROM links, comments WHERE comment_user_id=$user->id AND comment_link_id=link_id  ORDER BY link_date DESC LIMIT $offset,$page_size");
	if ($links) {
		foreach($links as $link_id) {
			$link->id=$link_id;
			$link->read();
			$link->print_summary('short');
		}
	}
}

function do_preferred () {
	global $db, $user;

	echo '<fieldset><legend>';
	echo _('autores preferidos');
	echo '</legend>';
	$prefered_id = $user->id;
	$prefered_type = 'friends';
	echo '<div id="friends-container">'. "\n";
	require('backend/get_prefered.php');
	echo '</div>'. "\n";
	echo '</fieldset>';
}


function do_voters () {
	global $db, $user;

	echo '<fieldset><legend>';
	echo _('los que votan');
	echo '</legend>';
	$prefered_id = $user->id;
	$prefered_type = 'voters';
	echo '<div id="voters-container">'. "\n";
	require('backend/get_prefered.php');
	echo '</div>'. "\n";
	echo '</fieldset>';
}

function do_user_tabs($option, $user) {

		$active = array();
		$active[$option] = 'class="active"';

		echo '<div class="sub-nav">'."\n";
		echo '<ul>'."\n";
		echo '<li '.$active[1].'><a href="'.get_user_uri($user).'">'._('perfil'). '</a></li>';
		echo '<li '.$active[2].'><a href="'.get_user_uri($user, 'history').'">'._('enviadas'). '</a></li>';
		echo '<li '.$active[3].'><a href="'.get_user_uri($user, 'commented').'">'._('comentadas'). '</a></li>';
		echo '<li '.$active[4].'><a href="'.get_user_uri($user, 'shaken').'">'._('votadas'). '</a></li>';
		echo '<li '.$active[5].'><a href="'.get_user_uri($user, 'preferred').'">'._('autores preferidos'). '</a></li>';
		echo '<li '.$active[6].'><a href="'.get_user_uri($user, 'voters').'">'._('votado por'). '</a></li>';
		echo '</ul><br /></div>';

}

?>
