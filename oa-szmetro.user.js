// ==UserScript==
// @name          test script for SZ Metro
// @namespace  http://oa.szgdjt.com
// @description  this is our test script 
// @include       http://oa.szgdjt.com/*
// @include       http://oa.sz-mtr.com/*
// @include       http://cs.sz-mtr.com/*
// @include       http://portal.sz-mtr.com/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

/*
Possible Solutions
1 document.createElement
2 element create sub element
*/

/*
//==================================================================================================================
//Solution a creates a div to list navigating URLs
var main, newElement;
main=document.getElementById("header");
if (main){
	//alert("found element layout");
	newElement=document.createElement('div');
	newElement.innerHTML='<div style="background-color:#aaaaaa;' +
						'</p> </div>' ;
	main.parentNode.insertBefore(newElement,main.nextSibling);
}
//==================================================================================================================
*/

//< script LANGUAGE = "JavaScript" > 
function extractlinks()
{
	alert("extractlinks is invoked!");
	var links=document.all.tags("A");
	var total=links.length;
	var win2=window.open("","","menubar,scrollbars,toolbar");
	win2.document.write("<font size='2'>totally "+ total  +" links</font><br>");
	for (var i=0;i<total;i++)
	{
		win2.document.write("<font size='2'>"+links[i].outerHTML+"</font><br>");
	}
}
//</script > 

//alert("document.location.host: " +document.location.host);
//alert("window.location.host: " +window.location.host);
strOA="oa.sz-mtr.com";
strCS="cs.sz-mtr.com";
strPortal="portal.sz-mtr.com";

strSites=	'Available Sites: ' +
		'<a href="http://oa.sz-mtr.com/" target="_blank" >OA</a> ' +
		'<a href="http://portal.sz-mtr.com/" target="_blank" >Portal</a> ' +
		'<a href="http://uuv.sz-mtr.com/" target="_blank" >UUV</a> ' +	
		'<a href="http://www.sz-mtr.com/" target="_blank" >WWW</a> ' +
		'<a href="http://cs.sz-mtr.com/" target="_blank" >CS</a> ' +
		'<a href="http://10.10.11.28:8090/" target="_blank" >CON</a> ' +
		'<a href="http://ebs.szgdjt.com:8000/" target="_blank" >EBS</a> ' +
		'<a href="#" onclick="javascript:extractlinks();"  >debug</a> ' +
		'<a href="http://ebs.szgdjt.com:8030/" target="_blank" >EBS-UAT</a> ';
//'<input type="button" onclick="extractlinks()" value="Showlink"> '
var xPath;
if (document.location.host ==strOA || document.location.host==strCS)
{
	//Solution b uses current existing UI to list navigating URLs at OA & CS site
	xPath='//*[@id="header"]/div[1]';
}

if (document.location.host ==strPortal)
{
	xPath='//*[@id="s4-mainarea"]/div[2]/div'; 
}

//document.createElement("");
var myDiv=document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var newDiv=document.createElement('div');
newDiv.innerHTML='<div class="greasemonkey" style="position:relative;left:20px; 		padding-left: 10px;line-height: 29px;font-weight: 800;color: #fff;">' +
							'<p style="color:white;"> ' +
							strSites+
							'</p>' +
							'</div>' ;
myDiv.appendChild(newDiv);

//extractlinks();