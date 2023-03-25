<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es>.
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
// 		http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".

require_once(mnminclude.'log.php');

class Link {
	var $id = 0;
	var $author = -1;
	var $blog = 0;
	var $username = false;
	var $randkey = 0;
	var $karma = 0;
	var $valid = false;
	var $date = false;
	var $published_date = 0;
	var $modified = 0;
	var $url = false;
	var $url_title = false;
	var $encoding = false;
	var $status = 'discard';
	var $type = '';
	var $category = 0;
	var $votes = 0;
	var $negatives = 0;
	var $title = '';
	var $tags = '';
	var $uri = '';
	var $content = '';
	var $html = false;
	var $trackback = false;
	var $read = false;
	var $voted = false;
	var $votes_enabled = true;
	var $banned = false;

	function print_html() {
		echo "Valid: " . $this->valid . "<br>\n";
		echo "Url: " . $this->url . "<br>\n";
		echo "Title: " . $this->url_title . "<br>\n";
		echo "encoding: " . $this->encoding . "<br>\n";
	}

	function check_url($url, $check_local = true) {
		global $globals;
		if(!preg_match('/^http[s]*:/', $url)) return false;
		$url_components = parse_url($url);
		if($check_local && $url_components[host] == get_server_name()) {
			syslog(LOG_NOTICE, "Meneame, server name is local name: $url");
			return false;
		}
		if(check_ban_list($url_components[host], $globals['forbiden_domains'])) {
			syslog(LOG_NOTICE, "Meneame, server name is banned: $url");
			$this->banned = true;
			return false;
		}
		return true;
	}

	function get($url) {
		global $globals;
		$url=trim($url);
		if (!$this->check_url($url)) return false;
		if(version_compare(phpversion(), '5.0.0') >= 0) {
			$opts = array(
				'http' => array('user_agent' => 'Mozilla/5.0 (compatible; Meneame; +http://meneame.net/) Gecko/Meneame Firefox', 'max_redirects' => 7),
				'https' => array('user_agent' => 'Mozilla/5.0 (compatible; Meneame; +http://meneame.net/) Gecko/Meneame Firefox', 'max_redirects' => 7)
			);
			$context = stream_context_create($opts);
			if(($stream = @fopen($url, 'r', false, $context))) {
				$meta_data = stream_get_meta_data($stream);
				foreach($meta_data['wrapper_data'] as $response) {
					/* Were we redirected? */
					if (substr(strtolower($response), 0, 10) == 'location: ') {
						/* update $url with where we were redirected to */
						$answer = split(' ', $response);
						$new_url = trim($answer[1]);
					}
				}
				if (!empty($new_url) && $new_url != $url) {
					syslog(LOG_NOTICE, "Meneame, redirected: $url -> $new_url");
					/* Check again the url */
					// Warn: relative path can come in "Location:" headers, manage them
					if(!preg_match('/^http[s]*:/', $new_url)) {
						// It's relative
						$new_url = $url . $new_url;
					}
					if (!$this->check_url($new_url)) return false;
					//if (strlen($new_url) < 250) $url = $new_url;
				}
				$url_ok = $this->html = @stream_get_contents($stream, 200000);
				fclose($stream);
			} else {
				syslog(LOG_NOTICE, "Meneame, error getting: $url");
				$url_ok = false;
			}
			//$url_ok = $this->html = @file_get_contents($url, false, $context, 0, 200000);
		} else {
			$url_ok = $this->html = @file_get_contents($url);
		}
		$this->url=$url;
		// NO more to do
		if (!$url_ok) return true;

		if(preg_match('/charset=([a-zA-Z0-9-_]+)/i', $this->html, $matches)) {
			$this->encoding=trim($matches[1]);
			if(strcasecmp($this->encoding, 'utf-8') != 0) {
				$this->html=iconv($this->encoding, 'UTF-8//IGNORE', $this->html);
			}
		}

		// Now we analyse the html to find links to banned domains
		// It avoids the trick of using google or technorati
		preg_match_all('/<a[^>]+href=[\'"]*(https*:\/\/[^\s \/"\'>]+)/i', $this->html, $matches);
		foreach ($matches[1] as $embeded_link) {
			if (! $checked_links[$embeded_link]) {
				$checked_links[$embeded_link] = true;
				if (!$this->check_url($embeded_link, false) && $this->banned) return false;
			}
		}

		// The URL has been checked
		$this->valid = true;

		if(preg_match('/<title>([^<>]*)<\/title>/i', $this->html, $matches)) {
			$this->url_title=strip_tags(trim($matches[1]));
		}
		// Detect trackbacks
		if (!empty($_POST['trackback'])) {
			$this->trackback=trim($_POST['trackback']);
		} elseif (preg_match('/trackback:ping="([^"]+)"/i', $this->html, $matches) ||
			preg_match('/trackback:ping +rdf:resource="([^>]+)"/i', $this->html, $matches) || 
			preg_match('/<trackback:ping>([^<>]+)/i', $this->html, $matches)) {
			$this->trackback=trim($matches[1]);
		} elseif (preg_match('/<a[^>]+rel="trackback"[^>]*>/i', $this->html, $matches)) {
			if (preg_match('/href="([^"]+)"/i', $matches[0], $matches2)) {
				$this->trackback=trim($matches2[1]);
			}
		} elseif (preg_match('/<a[^>]+href=[^>]+>trackback<\/a>/i', $this->html, $matches)) {
			if (preg_match('/href="([^"]+)"/i', $matches[0], $matches2)) {
				$this->trackback=trim($matches2[1]);
			}
		}  elseif (preg_match('/(http:\/\/[^\s]+\/trackback\/*)/i', $this->html, $matches)) {
			$this->trackback=trim($matches[0]);
		}  
		return true;
		
	}

	function create_blog_entry() {
		require_once(mnminclude.'blog.php');
		$blog = new Blog();
		$blog->analyze_html($this->url, $this->html);
		if(!$blog->read('key')) {
			$blog->store();
		}
		$this->blog=$blog->id;
		$this->type=$blog->type;
	}

	function type() {
		if (empty($this->type)) {
			if ($this->blog > 0) {
				require_once(mnminclude.'blog.php');
				$blog = new Blog();
				$blog->id = $this->blog;
				if($blog->read()) {
					$this->type=$blog->type;
					return $this->type;
				}
			}
			return 'normal';
		}
		return $this->type;
	}

	function store() {
		global $db, $current_user;

		$this->store_basic();
		$link_url = $db->escape($this->url);
		$link_uri = $db->escape($this->uri);
		$link_url_title = $db->escape($this->url_title);
		$link_title = $db->escape($this->title);
		$link_tags = $db->escape($this->tags);
		$link_content = $db->escape($this->content);
		$db->query("UPDATE links set link_url='$link_url', link_uri='$link_uri', link_url_title='$link_url_title', link_title='$link_title', link_content='$link_content', link_tags='$link_tags' WHERE link_id=$this->id");
		
	}

	function store_basic() {
		global $db, $current_user;

		if(!$this->date) $this->date=time();
		$link_author = $this->author;
		$link_blog = $this->blog;
		$link_status = $this->status;
		$link_votes = $this->votes;
		$link_negatives = $this->negatives;
		$link_comments = $this->comments;
		$link_karma = $this->karma;
		$link_randkey = $this->randkey;
		$link_category = $this->category;
		$link_date = $this->date;
		$link_published_date = $this->published_date;
		if($this->id===0) {
			$db->query("INSERT INTO links (link_author, link_blog, link_status, link_randkey, link_category, link_date, link_published_date, link_votes, link_negatives, link_karma) VALUES ($link_author, $link_blog, '$link_status', $link_randkey, $link_category, FROM_UNIXTIME($link_date), FROM_UNIXTIME($link_published_date), $link_votes, $link_negatives, $link_karma)");
			$this->id = $db->insert_id;
		} else {
		// update
			$db->query("UPDATE links set link_author=$link_author, link_blog=$link_blog, link_status='$link_status', link_randkey=$link_randkey, link_category=$link_category, link_date=FROM_UNIXTIME($link_date), link_published_date=FROM_UNIXTIME($link_published_date), link_votes=$link_votes, link_negatives=$link_negatives, link_comments=$link_comments, link_karma=$link_karma WHERE link_id=$this->id");
		}
		if ($this->votes == 1 && $this->negatives == 0 && $this->status == 'queued') {
			// This is a new link, add it to the events, it an additional control
			// just in case the user dind't do the last submit phase and voted later
			log_conditional_insert('link_new', $this->id, $this->author);
		} 
	}
	
	function read($key='id') {
		global $db, $current_user;
		switch ($key)  {
			case 'id':
				$cond = "link_id = $this->id";
				break;
			case 'uri':
				$cond = "link_uri = '$this->uri'";
				break;
			case 'url':
				$cond = "link_url = '$this->url'";
				break;
			default:
				$cond = "link_id = $this->id";
		}
		if(($link = $db->get_row("SELECT links.*, UNIX_TIMESTAMP(link_date) as link_ts, UNIX_TIMESTAMP(link_published_date) as published_ts, UNIX_TIMESTAMP(link_modified) as modified_ts, users.user_login, users.user_email, users.user_avatar FROM links, users WHERE $cond AND user_id=link_author"))) {
			$this->id=$link->link_id;
			$this->author=$link->link_author;
			$this->username=$link->user_login;
			$this->avatar=$link->user_avatar;
			$this->email=$link->user_email;
			$this->blog=$link->link_blog;
			$this->status=$link->link_status;
			$this->votes=$link->link_votes;
			$this->negatives=$link->link_negatives;
			$this->comments=$link->link_comments;
			$this->karma=$link->link_karma;
			$this->randkey=$link->link_randkey;
			$this->category=$link->link_category;
			$this->url= $link->link_url;
			$this->uri= $link->link_uri;
			$this->url_title=$link->link_url_title;
			$this->title=$link->link_title;
			$this->tags=$link->link_tags;
			$this->content=$link->link_content;
			$this->date=$link->link_ts;
			$this->published_date=$link->published_ts;
			$this->modified=$link->modified_ts;
			$this->read = true;
			return true;
		}
		$this->read = false;
		return false;
	}

	function duplicates($url) {
		global $db;
		$link_url=$db->escape($url);
		$n = intval($db->get_var("SELECT count(*) FROM links WHERE link_url = '$link_url' AND (link_status != 'discard' OR link_votes>0)"));
		return $n;
	}

	function print_summary($type='full') {
		global $current_user, $current_user, $globals, $db;

		if(!$this->read) return;
		if($this->is_votable()) {
			$this->voted = $this->vote_exists($current_user->user_id);
		}

		$url = $this->url;
		$title_short = wordwrap($this->title, 36, " ", 1);

		echo '<div class="news-summary" id="news-'.$this->id.'">';
		echo '<div class="news-body">';
		if ($type != 'preview' && !empty($this->title) && !empty($this->content)) {
			$this->print_shake_box($votes_enabled);
		}

		$this->print_warn();

		if($globals['external_ads']) echo "<!-- google_ad_section_start -->\n";
		
		if ($this->status != 'published') $nofollow = ' rel="nofollow"';
		else $nofollow = '';
		echo '<h3 id="title'.$this->id.'">';
		echo '<a href="'.htmlspecialchars($url).'"'.$nofollow.'>'. $title_short. '</a>';
		echo '</h3>';
		echo '<div class="news-submitted">';
		if ($type != 'short')
			echo '<a href="'.get_user_uri($this->username).'" title="'.$this->username.'"><img src="'.get_avatar_url($this->author, $this->avatar, 25).'" width="25" height="25" alt="avatar" /></a>';
		echo '<strong>'.htmlentities(preg_replace('/^https*:\/\//', '', txt_shorter($this->url))).'</strong>'."<br />\n";
		echo _('enviado por').' <a href="'.get_user_uri($this->username, 'history').'">'.$this->username.'</a> ';
		// Print dates
		if (time() - $this->date > 604800) { // 7 days
			echo _('el').get_date_time($this->date);
			if($this->status == 'published')
				echo ', '  ._('publicado el').get_date_time($this->published_date);
		} else {
			echo _('hace').txt_time_diff($this->date);
			if($this->status == 'published')
				echo ', '  ._('publicado hace').txt_time_diff($this->published_date);
		}
		echo "</div>\n";

		if($type=='full' || $type=='preview') {
			echo '<div class="news-body-text">'.text_to_html($this->content).'</div>';
		}
		if (!empty($this->tags)) {
			echo '<div class="news-tags">';
			echo '<strong><a href="'.$globals['base_url'].'cloud.php" title="'._('nube').'">'._('etiquetas').'</a></strong>:';
			$tags_array = explode(",", $this->tags);
			$tags_counter = 0;
			foreach ($tags_array as $tag_item) {
				$tag_item=trim($tag_item);
				$tag_url = urlencode($tag_item);
				if ($tags_counter > 0) echo ',';
				echo ' <a href="'.$globals['base_url'].'index.php?search=tag:'.$tag_url.'">'.$tag_item.'</a>';
				$tags_counter++;
			}
			echo '</div>' . "\n";
		}
		if($globals['external_ads']) echo "<!-- google_ad_section_end -->\n";

		echo '<div class="news-details">';
		if($this->comments > 0) {
			$comments_mess = $this->comments . ' ' . _('comentarios');
			$comment_class = "comments";
		} else  {
			$comments_mess = _('sin comentarios');
			$comment_class = "comments_no";
		}
		echo '<a href="'.$this->get_relative_permalink().'" class="tool '.$comment_class.'">'.$comments_mess. '</a>';

		echo '<span class="tool">'._('categoría'). ': <a href="'.$globals['base_url'].'index.php?category='.$this->category.'" title="'._('categoría').'">'.$this->category_name().'</a></span>';

		if ($this->status != 'published') {
			echo ' <span class="tool"><a href="'.$this->get_relative_permalink().'/voters">'._('negativos').'</a>: '.intval($this->negatives).'</span>';
		}
		echo ' <span class="tool">karma: '.intval($this->karma).'</span>';

		// Allow to modify it
		if ($type != 'preview' && $this->is_editable()) {
			echo ' <span  class="tool"><a href="'.$globals['base_url'].'editlink.php?id='.$this->id.'&amp;user='.$current_user->user_id.'">'._('editar').'</a></span> ';
		}

		if(!$this->voted && $current_user->user_id > 0 && $this->status!='published' && $this->votes > 0 && $type != 'preview' &&
				$current_user->user_karma >= 5 && $this->votes_enabled /*&& $this->author != $current_user->user_id*/) {
			$this->print_problem_form();
		}

		echo '</div>'."\n";
		echo '</div></div>'."\n";

	}
	
	function print_shake_box() {
		global $current_user, $anonnymous_vote, $site_key, $globals;
		
		switch ($this->status) {
			case 'queued': // another color box for not-published
				$box_class = 'mnm-queued';
				break;
			case 'discard': // another color box for discarded
				$box_class = 'mnm-discarded';
				break;
			case 'published': // default for published
			default:
				$box_class = 'mnm-published';
				break;
		}
		echo '<ul class="news-shakeit">';
		echo '<li class="'.$box_class.'" id="main'.$this->id.'">';
		echo '<a id="mnms-'.$this->id.'" href="'.$this->get_relative_permalink().'"><strong>'.$this->votes.'</strong><br />'._('meneos').'</a></li>';
		echo '<li class="menealo" id="mnmlink-'.$this->id.'">';

		if ($this->votes_enabled == false) {
			echo '<span>'._('cerrado').'</span>';
		} elseif( !$this->voted) {
			echo '<a href="javascript:menealo('."$current_user->user_id,$this->id,$this->id,"."'".md5($site_key.$current_user->user_id.$this->id.$this->randkey.$globals['user_ip'])."'".')">'._('menéalo').'</a>';
		} else {
			if ($this->voted > 0) $mess = _('&#161;chachi!');
			else $mess = ':-(';
			echo '<span>'.$mess.'</span>';
		}
		echo '</li>'."\n";
		echo '</ul>'."\n";
	}

	function print_warn() {
		global $db;

		if ( $this->status == 'queued' &&  $this->negatives > 3 && $this->negatives > $this->votes/4 ) {
			echo '<div class="warn"><strong>'._('Aviso automático').'</strong>: ';
			// Only says "what" if most votes are "wrong" or "duplicated" 
			$negatives = $db->get_row("select vote_value, count(vote_value) as count from votes where vote_type='links' and vote_link_id=$this->id and vote_value < 0 group by vote_value order by count desc limit 1");
			if ($negatives->count > 2 && $negatives->count >= $this->negatives/2 && ($negatives->vote_value == -6 || $negatives->vote_value == -8)) {
				echo _('Esta noticia podría ser <strong>'). get_negative_vote($negatives->vote_value) . '</strong>. ';
			} else {
				echo _('Esta noticia tiene varios votos negativos.');
			}
			if( $this->votes_enabled && !$this->voted ) {
				echo ' <a href="'.$this->get_relative_permalink().'/voters">' ._('Asegúrate').'</a> ' . _('antes de menear') . '.';
			}
			echo "</div>\n";
		}
	}

	function print_problem_form() {
		global $current_user, $db, $anon_karma, $anonnymous_vote, $globals, $site_key;

		if(!$anonnymous_vote && $current_user->user_id == 0) return;

		//echo '<span class="tool-right">';
		echo '<form class="tool" action="" id="problem-'.$this->id.'">';
		echo '<select '.$status.' name="ratings"  onchange="';
		echo 'report_problem(this.form,'."$current_user->user_id, $this->id, "."'".md5($site_key.$current_user->user_id.$this->randkey.$globals['user_ip'])."'".')';
		echo '">';
		echo '<option value="0" selected="selected">¿problema?</option>';
		foreach (array_keys($globals['negative_votes_values']) as $pvalue) {
			echo '<option value="'.$pvalue.'">'.$globals['negative_votes_values'][$pvalue].'</option>';
		}
		echo '</select>';
//		echo '<input type="hidden" name="return" value="" disabled />';
		echo '</form>';
	}

	function vote_exists($user) {
		require_once(mnminclude.'votes.php');
		$vote = new Vote;
		$vote->user=$user;
		$vote->link=$this->id;
		return $vote->exists();	
	}
	
	function votes($user) {
		require_once(mnminclude.'votes.php');

		$vote = new Vote;
		$vote->user=$user;
		$vote->link=$this->id;
		return $vote->count();
	}

	function insert_vote($user, $value) {
		global $db, $current_user;
		require_once(mnminclude.'votes.php');

		$vote = new Vote;
		$vote->user=$user;
		$vote->link=$this->id;
		if ($vote->exists()) return false;
		$vote->value=$value;
		// For karma calculation
		if ($this->status != 'published') {
			if($value < 0 && $user > 0) {
				$karma_value = round(($value - $current_user->user_karma)/2);
			} else {
				$karma_value=round($value);
			}
		} else {
			$karma_value = 0;
		}
		if($vote->insert()) {
			if ($value < 0) {
				$db->query("update links set link_negatives=link_negatives+1, link_karma=link_karma+$karma_value where link_id = $this->id");
				$new = $db->get_row("select link_negatives, link_karma from links where link_id = $this->id");
				$this->negatives = $new->link_negatives;
			} else {
				$db->query("update links set link_votes = link_votes+1, link_karma=link_karma+$karma_value where link_id = $this->id");
				$new = $db->get_row("select link_votes, link_karma from links where link_id = $this->id");
				$this->votes = $new->link_votes;
			}
			$this->karma = $new->link_karma;
			return true;
		}
		return false;
	}

	function category_name() {
		global $db, $dblang;
		return $db->get_var("SELECT category_name FROM categories WHERE category_lang='$dblang' AND category_id=$this->category");
	}

	function publish() {
		if(!$this->read) $this->read_basic();
		$this->published_date = time();
		$this->status = 'published';
		$this->store_basic();
	}

	function update_comments() {
		global $db;
		$this->comments = $db->get_var("SELECT count(*) FROM comments WHERE comment_link_id = $this->id");
		$db->query("update links set link_comments = $this->comments where link_id = $this->id");
	}

	function is_editable() {
		global $current_user, $db;

		if($current_user->user_id ==  0) return false;
		if($this->status != 'published' && 
			(($this->author == $current_user->user_id && time() - $this->date < 1800) 
					|| $current_user->user_level != 'normal')
			|| $current_user->user_level == 'admin' || $current_user->user_level == 'god') 
			return true;
		return false;
	}

	function is_votable() {
		global $globals;

		if($globals['time_enabled_votes'] > 0 && $this->date < time() - $globals['time_enabled_votes'])  {
			$this->votes_enabled = false;
		} else {
			$this->votes_enabled = true;
		}
		return $this->votes_enabled;
	}

	function get_uri() {
		global $db, $globals;
		$seq = 0;
		require_once(mnminclude.'uri.php');
		$new_uri = $base_uri = get_uri($this->title);
		while ($db->get_var("select count(*) from links where link_uri='$new_uri' and link_id != $this->id") && $seq < 20) {
			$seq++;
			$new_uri = $base_uri . "-$seq";
		}
		// In case we tried 20 times, we just add the id of the article
		if ($seq >= 20) {
			$new_uri = $base_uri . "-$this->id";
		}
		$this->uri = $new_uri;
	}
	
	function get_relative_permalink() {
		global $globals;
		if (!empty($this->uri) && !empty($globals['base_story_url']) ) {
			return $globals['base_url'] . $globals['base_story_url'] . $this->uri;
		} else {
			return $globals['base_url'] . 'story.php?id=' . $this->id;
		}
	}
	function get_permalink() {
		return 'http://'.get_server_name().$this->get_relative_permalink();
	}

	function get_trackback() {
		global $globals;
		return "http://".get_server_name().$globals['base_url'].'trackback.php?id='.$this->id;
	}
}
