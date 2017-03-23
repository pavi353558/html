/*

My Custom JS
============

Author:  Brad Hussey
Updated: August 2013
Notes:	 Hand coded for Udemy.com

*/

	$('#submit').click(function(d){
		d.preventDefault();
		var x = $('#id1').val();
		$.getJSON( ("http://www.omdbapi.com/?s=" + encodeURI(x)), function( data ) {
			$.each( data.Search,function(index,value){
				var items = [];
				$.each(value, function( key, val ) {
					if(key == "Poster"){
						items.push("<img id=\"panel_img\" src="+val+" alt=\"image not found\"/>");
					}
					else{
						items.push( "<p>" + key + " : " + val + "</p>" );
					}
    			});
    			 $('div.container').first().append(
				$( "<div/>",{
    					"class": "row col-sm-6",
    					"id" : "cont_id1",
    					html: items.join("")
  				})).appendTo( "body" );
			});
		});
	});
	
	$(function() {
    $(selector).pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
});
