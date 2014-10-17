$(function(){
	var maxColHeight = 0;
	var $bioPersonal = $('.bio-personal-col');

	//STYLING PERSONAL COLS TO CONFORM TO THE SAME HEIGHT
	$bioPersonal.each(function(){
		var height = $(this).height();

		maxColHeight = height > maxColHeight ? height : maxColHeight;
	});
	$bioPersonal.height(maxColHeight);
});