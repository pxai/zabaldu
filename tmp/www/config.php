<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es>.
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
// 		http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".

define("mnmpath", dirname(__FILE__));
define("mnminclude", dirname(__FILE__).'/libs/');

// Better to do local modification in hostname-local.php
$server_name	= $_SERVER['SERVER_NAME'];
$dblang			= 'es';
$page_size		= 30;
$anonnymous_vote = true;
$external_ads = true;
//$globals['external_ads'] = false;

// Specify you base url, "/" if is the root document
// $globals['base_dir'] = '/meneame/';
$globals['base_url'] = '/';
// leave empty if you don't have the rewrite rule in apache
$globals['base_story_url'] = 'story/';
$globals['base_search_url'] = 'search/';
$globals['base_user_url'] = 'user/';

// Give 4 minutes to edit a comment
$globals['comment_edit_time'] = 240;

$globals['tags'] = 'tecnología, internet, cultura, software libre, linux, open source, bitácoras, blogs, ciencia';
$globals['time_enabled_votes'] = 864000; // 10 days
$globals['mysql_persistent'] = true;
//$globals['lounge'] = 'lounge.html';
//$globals['redirect_feedburner'] = false;
//$globals['min_karma_for_links'] = 4.9;
//$globals['min_karma_for_comments'] = 4.9;
// Ensure you have a avar dir writeable by the web server
$globals['avatars_dir'] = 'avatars-local';
$globals['avatars_max_size'] = 200000;
$globals['avatars_files_per_dir'] = 1000;
$globals['avatars_allowed_sizes'] = Array (80, 25, 20);

// Forbidden email domains to avoid "clones" and  "too easy" impersoning
// http://en.wikipedia.org/wiki/Disposable_e-mail_address
// See http://c2.com/cgi/wiki?ThrowawayEmailAndRidYourselfOfSpam
// Comment it out if you don't care
$globals['forbidden_email_domains'] = 'mailinator.com spamgourmet.com sneakemail.com e4ward.com spammotel.com jetable.org maileater.com dodgeit.com ipoo.org tempinbox.com shortmail.net spamday.com bigfoot.com fakeinformation.com sogetthis.com mailinater.com klassmaster.com mailtic.com pookmail.com spambob.com spambob.net spambob.org temporaryinbox.com';

// Anti spams
// check http://meneame.net/story/aviso-spam-programado-contra-meneame
$globals['forbiden_domains'] = 'foo.domain.foo another.foo.domain';

// The maximun amount of annonymous votes vs user votes in 1/2 hour
// 3 means 3 times annonymous votes as user votes in that period
$anon_to_user_votes = 2;
$site_key = 12345679;
// Check this
$anon_karma	= 4;

// Don't touch behind this
$local_configuration = $_SERVER['SERVER_NAME'].'-local.php';
@include($local_configuration);

//ob_start();
include mnminclude.'db.php';
include mnminclude.'utils.php';
include mnminclude.'login.php';

// For production servers
$db->hide_errors();

?>
