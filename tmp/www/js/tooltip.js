/**
  Stronglky modified, onky works with DOM2 compatible browsers.
  	Ricardo Galli
  From http://ljouanneau.com/softs/javascript/tooltip.php
 *
 * Can show a tooltip over an element
 * Content of tooltip is the title attribute value of the element
 * copyright 2004 Laurent Jouanneau. http://ljouanneau.com/soft/javascript
 * release under LGPL Licence
 * works with dom2 compliance browser, and IE6. perhaps IE5 or IE4.. not Nestcape 4
 *
 * To use it :
 * 1.include this script on your page
 * 2.insert this element somewhere in your page
 *       <div id="tooltip"></div>
 * 3. style it in your CSS stylesheet (set color, background etc..). You must set
 * this two style too :
 *     div#tooltip { position:absolute; visibility:hidden; ... }
 * 4.the end. test it ! :-)
 *
 */


// create the tooltip object
function tooltip(){}

// setup properties of tooltip object
tooltip.id="tooltip";
tooltip.main=null;
tooltip.offsetx = 10;
tooltip.offsety = 10;
tooltip.shoffsetx = 8;
tooltip.shoffsety = 8;
tooltip.x = 0;
tooltip.y = 0;
tooltip.snow = 0;
tooltip.tooltipElement=null;
tooltip.tooltipShadow=null;
tooltip.title_saved='';
tooltip.saveonmouseover=null;
tooltip.ie4 = (document.all)? true:false;       // check if ie4
tooltip.ie5 = false;
if(tooltip.ie4) tooltip.ie5 = (navigator.userAgent.indexOf('MSIE 5')>0 || navigator.userAgent.indexOf('MSIE 6')>0);
tooltip.dom2 = ((document.getElementById) && !(tooltip.ie4||tooltip.ie5))? true:false; // check the W3C DOM level2 compliance. ie4, ie5, ns4 are not dom level2 compliance !! grrrr >:-(



/**
* Open ToolTip. The title attribute of the htmlelement is the text of the tooltip
* Call this method on the mouseover event on your htmlelement
* ex :  <div id="myHtmlElement" onmouseover="tooltip.show(this)"...></div>
*/
tooltip.show = function (htmlelement, type, element) {
      // we save text of title attribute to avoid the showing of tooltip generated by browser
	if (tooltip.dom2  == false ) return false;
	if (tooltip.tooltipElement == null) {
		tooltip.tooltipElement = document.createElement("div");
		tooltip.tooltipElement.setAttribute("id", "tooltip");
		tooltip.tooltipElement.style.marginRight = "20px";
		document.body.appendChild(tooltip.tooltipElement);
		tooltip.tooltipShadow = document.createElement("div");
		tooltip.tooltipShadow.setAttribute("id", "tooltip-shadow");
		//tooltip.tooltipElement.style.marginRight = (20 - this.shoffsety) +"px";
		document.body.appendChild(tooltip.tooltipShadow);
	}
	if (type == 'id') {
		target = document.getElementById(element);
		if (! target) return false;
		text = target.innerHTML;
	} else {
		text = element;
	}
	this.saveonmouseover=document.onmousemove;
	document.onmousemove = this.mouseMove;
	this.tooltipElement.innerHTML=text;
	this.moveTo(this.x + this.offsetx , this.y + this.offsety);
	this.tooltipElement.style.visibility ="visible";
	window.setTimeout('tooltip.showShadow();', 1);
	tooltip.tooltipShadow.style.visibility ="visible";
	return false;
}

tooltip.showShadow = function () {
	tooltip.tooltipShadow.style.width = tooltip.tooltipElement.scrollWidth+"px";
	tooltip.tooltipShadow.style.height = tooltip.tooltipElement.scrollHeight+"px";
}
/**
* hide tooltip
* call this method on the mouseout event of the html element
* ex : <div id="myHtmlElement" ... onmouseout="tooltip.hide(this)"></div>
*/
tooltip.hide = function (htmlelement) {
	if (tooltip.dom2  == false || tooltip.tooltipElement == null ) return false;
	this.tooltipElement.style.visibility = "hidden";
	this.tooltipShadow.style.visibility = "hidden";
	this.tooltipElement.innerHTML='';
	document.onmousemove=this.saveonmouseover;
}



// Moves the tooltip element
tooltip.mouseMove = function (e) {
   // we don't use "this", but tooltip because this method is assign to an event of document
   // and so is dreferenced

	tooltip.x = e.pageX;
	tooltip.y = e.pageY;
	tooltip.moveTo( tooltip.x +tooltip.offsetx , tooltip.y + tooltip.offsety);
}

// Move the tooltip element
tooltip.moveTo = function (xL,yL) {
	this.tooltipElement.style.left = xL +"px";
	this.tooltipElement.style.top = yL +"px";
	if (this.tooltipShadow != null) {
		xLS = xL + this.shoffsetx;
		yLS = yL + this.shoffsety;
		this.tooltipShadow.style.left = xLS +"px";
		this.tooltipShadow.style.top = yLS +"px";
	}
	window.setTimeout('tooltip.showShadow();', 1);
}

