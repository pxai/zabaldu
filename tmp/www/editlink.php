<?
// The source code packaged with this file is Free Software, Copyright (C) 2005 by
// Ricardo Galli <gallir at uib dot es>.
// It's licensed under the AFFERO GENERAL PUBLIC LICENSE unless stated otherwise.
// You can get copies of the licenses here:
// 		http://www.affero.org/oagpl.html
// AFFERO GENERAL PUBLIC LICENSE is also included in the file called "COPYING".
include('config.php');
include(mnminclude.'html1.php');
include(mnminclude.'link.php');
include(mnminclude.'tags.php');

force_authentication();



do_header(_("editar noticia"), "post");
do_navbar(_('editar noticia'));


echo '<div id="genericform-contents">'."\n";

if (!empty($_REQUEST['id']) && is_numeric($_REQUEST['id'])) { 
	$linkres=new Link;
	$linkres->id=$link_id = intval($_REQUEST['id']);
	$linkres->read();
	if (!$linkres->is_editable() || intval($_GET['user'] != $current_user->user_id)) {
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("noticia no modificable").'</div>'."\n";
		return;
	} 
	if ($_POST['phase'] == "1") 
		do_save();
	else 
		do_edit();
} else {
	echo '<div class="form-error-submit">&nbsp;&nbsp;'._("¿duh?").'</div>';
}



echo "</div>";

do_footer();

function do_edit() {
	global $linkres, $dblang, $db, $current_user;

	$link_title = trim($linkres->title);
	$link_content = trim($linkres->content);
	$link_tags = htmlspecialchars(trim($linkres->tags));
	$link_url = $linkres->url;

	echo '<h2>'._('editar noticia').'</h2>'."\n";
	echo '<div id="genericform">'."\n";
	echo '<form action="editlink.php?user='.$current_user->user_id.'" method="post" id="thisform" name="thisform">'."\n";
	$now = time();
	echo '<input type="hidden" name="key" value="'.md5($now.$linkres->randkey).'" />'."\n";
	echo '<input type="hidden" name="timestamp" value="'.$now.'" />'."\n";
	echo '<input type="hidden" name="phase" value="1" />'."\n";
	echo '<input type="hidden" name="id" value="'.$linkres->id.'" />'."\n";

	echo '<fieldset><legend><span class="sign">'._('detalles de la noticia').'</span></legend>'."\n";

	if($current_user->user_level == 'admin' || $current_user->user_level == 'god') {
		echo '<label for="url" accesskey="1">'._('url de la noticia').':</label>'."\n";
		echo '<p><span class="genericformnote">'._('url de la noticia.').'</span>'."\n";
		echo '<br/><input type="url" id="url" name="url" value="'.htmlspecialchars($link_url).'" size="80" /></p>'."\n";
	}

	echo '<label for="title" accesskey="2">'._('título de la noticia').':</label>'."\n";
	echo '<p><span class="genericformnote">'._('título de la noticia. máximo: 120 caracteres').'</span>'."\n";
	echo '<br/><input type="text" id="title" name="title" value="'.$link_title.'" size="60" maxlength="120" />';

	// Allow to change the status
	if ($linkres->status != 'published' && (($linkres->status != 'discard' && $current_user->user_id == $linkres->author) 
							|| $current_user->user_level == 'admin' || $current_user->user_level == 'god')) {
		echo '&nbsp;&nbsp;&nbsp;&nbsp;';
		echo '<select name="status">';
		echo '<option value="discard"';
		if ($linkres->status == 'discard') echo ' selected="selected"';
		echo '>'._('descartada').'</option>';
		echo '<option value="queued"';
		if ($linkres->status == 'queued') echo ' selected="selected"';
		echo '>'._('pendiente').'</option>';
		echo '</select>';
	}

	echo '</p>'."\n";

	echo '<label for="tags" accesskey="3">'._('etiquetas').':</label>'."\n";
	echo '<p><span class="genericformnote"><strong>'._('pocas palabras, genéricas, cortas y separadas por "," (coma)').'</strong> Ejemplo: <em>web, programación, software libre</em></span>'."\n";
	echo '<br/><input type="text" id="tags" name="tags" value="'.$link_tags.'" size="50" maxlength="50" /></p>'."\n";

	echo '<p><label for="bodytext" accesskey="4">'._('descripción de la noticia').':</label>'."\n";
	echo '<br /><span class="genericformnote">'._('describe la noticia con tus palabras. entre dos y cinco frases es suficiente. sé cuidadoso.').'</span>'."\n";
	echo '<br/><textarea name="bodytext"  rows="10" cols="60" id="bodytext" onKeyDown="textCounter(document.thisform.bodytext,document.thisform.bodycounter,550)" onKeyUp="textCounter(document.thisform.bodytext,document.thisform.bodycounter,550)">'.$link_content.'</textarea>'."\n";
	$body_left = 550 - mb_strlen(htmlspecialchars_decode($link_content), 'UTF-8');
	echo '<br /><input readonly type="text" name="bodycounter" size="3" maxlength="3" value="'. $body_left . '" /> <span class="genericformnote">' . _('caracteres libres') . '</span>';
	echo '</p>'."\n";
	echo '<p><label accesskey="4">'._('categoría').':</label><br />'."\n";
	echo '<span class="genericformnote">'._('selecciona la categoría más apropiada').'</span></p>'."\n";
	echo '<div class="column-list categorylist">'."\n";
	echo '<ul>'."\n";
	$categories = $db->get_results("SELECT category_id, category_name FROM categories WHERE category_lang='$dblang' ORDER BY category_name ASC");
	foreach ($categories as $category) {
	 	echo '<li><input name="category" type="radio" '; 
//		echo "\n<!-- category: $linkres->category, $category->category_id -->\n";
		if ($linkres->category == $category->category_id) echo '  checked="true" ';
		echo 'value="'.$category->category_id.'"/>'._($category->category_name).'</li>'."\n";
	}
	// TODO: no standard
	echo '<br style="clear: both;" /></ul>' . "\n";
	echo '</div>'."\n";

	/* TODO
	echo '<p><label for="trackback">'._('trackback').':</label><br />'."\n";
	echo '<span class="genericformnote">'._('puedes agregar un trackback').'</span>'."\n";
	echo '<input type="text" name="trackback" id="trackback" value="'.$trackback.'" class="form-full" /></p>'."\n";
	*/

	echo '<input class="genericsubmit" type="submit" value="'._('guardar &#187;').'" />'."\n";
	echo '</fieldset>'."\n";
	echo '</form>'."\n";
	echo '</div>'."\n";
}

function do_save() {
	global $linkres, $dblang, $current_user;

	$linkres->category=intval($_POST['category']);
	if (!empty($_POST['url'])) {
		$linkres->url = trim($_POST['url']);
	}
	$linkres->title = clean_text($_POST['title']);
	$linkres->content = clean_text($_POST['bodytext']);
	$linkres->tags = tags_normalize_string(clean_text($_POST['tags']));
	// change the status
	if ($linkres->status != 'published' && ($_POST['status'] == 'queued' || $_POST['status'] == 'discard')) {
		if ($linkres->status != 'discard' && $_POST['status'] == 'discard') {
			// Insert a log entry if the link has been manually discarded
			$insert_discard_log = true;
		}
		$linkres->status = $_POST['status'];
	}
	if (!link_edit_errors($linkres)) {
		if (empty($linkres->uri)) $linkres->get_uri();
		$linkres->store();
		tags_insert_string($linkres->id, $dblang, $linkres->tags, $linkres->date);

		// Insert edit log/event
		require_once(mnminclude.'log.php');
		if ($insert_discard_log) {
			// Insert always a link and discard event if the status has been changed to discard
			log_insert('link_edit', $linkres->id, $current_user->user_id);
			log_insert('link_discard', $linkres->id, $current_user->user_id);
		} else {
			log_conditional_insert('link_edit', $linkres->id, $current_user->user_id, 60);
		}

		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("noticia actualizada").'</div>'."\n";
	} else {
		$linkres->read();
	}

	echo '<div class="formnotice">'."\n";
	$linkres->print_summary('preview');
	echo '</div>'."\n";

	echo '<form id="genericform" method="GET" action="story.php" >';
	echo '<input type="hidden" name="id" value="'.$linkres->id.'" />'."\n";
	echo '<input class="genericsubmit" type="button" onclick="window.history.go(-1)" value="'._('&#171; modificar').'">&nbsp;&nbsp;'."\n";;
	echo '<input class="genericsubmit" type="submit" value="'._('ir a la noticia').'" />'."\n";
	echo '</form>'. "\n";

}

function link_edit_errors($linkres) {

	$error = false;
	if($_POST['key'] !== md5($_POST['timestamp'].$linkres->randkey)) {
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._('Clave incorrecta').'</div>';
		$error = true;
	}
	if(time() - $_POST['timestamp'] > 900) {
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._('Tiempo excedido').'</div>';
		$error = true;
	}
	if(strlen($linkres->title) < 10  || strlen($linkres->content) < 30 ) {
		//echo '<br style="clear: both;" />';
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("Título o texto incompletos").'</div>';
		$error = true;
	}
	if(mb_strlen(htmlspecialchars_decode($linkres->title), 'UTF-8') > 120  || mb_strlen(htmlspecialchars_decode($linkres->content), 'UTF-8') > 550 ) {
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("Título o texto demasiado largos").'</div>';
		$error = true;
	}
	if(strlen($linkres->tags) < 3 ) {
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("No has puesto etiquetas").'</div>';
		$error = true;
	}
	if(preg_match('/.*http:\//', $linkres->title)) {
		//echo '<br style="clear: both;" />';
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("Por favor, no pongas URLs en el título, no ofrece información").'</div>';
		$error = true;
	}
	if(!$linkres->category > 0) {
		//echo '<br style="clear: both;" />';
		echo '<div class="form-error-submit">&nbsp;&nbsp;'._("Categoría no seleccionada").'</div>';
		$error = true;
	}
	return $error;
}

?>
