$(function(){
	var maxColHeight = 0;
	var $bioPersonal = $('.bio-personal-col');
	var $loader = $('.spinner');

	//STYLING PERSONAL COLS TO CONFORM TO THE SAME HEIGHT
	$bioPersonal.each(function(){
		var height = $(this).height();

		maxColHeight = height > maxColHeight ? height : maxColHeight;
	});
	$bioPersonal.height(maxColHeight);

	gameInstance = UnityLoader.instantiate("gameContainer", "ftp/planet_gen/Build/planet_gen.json", {
		onProgress: function (gameInstance, progress) {
			if (!gameInstance.Module) return;

			console.log(progress);
			if (progress == 1) {
				$loader.hide();
			}
		}
	});
});