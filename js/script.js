$(document).ready(function()
{
	$('.menu li:has(ul)').click(function(e)
	{
		e.preventDefault();
		
		if($(this).hasClass('active'))
		{
			$(this).removeClass('active');
			$(this).children('ul').slideUp();
//			console.log("Hola Mundo");
		}
		else
		{
//			console.log("Hola Mundo2");
			$('.menu li ul').slideUp();
			$('.menu li').removeClass('active');
			$(this).addClass('active');
			$(this).children('ul').slideDown();
		}
	});
	
	$('.btn-menu').click(function()
	{
		$('.menu-container .menu').slideToggle();
	});
	
	$(window).resize(function()
	{
		if($(document).width() > 450)
		{
			$('.menu-container .menu').css({'display' : 'block'});
		}
		
		if($(document).width() < 450)
		{
			$('.menu-container .menu').css({'display' : 'none'});
			$('.menu li ul').slideUp();
			$('.menu li').removeClass('active');
		}
	});
	
	$('.menu li ul li a').click(function()
	{
		window.location.href = $(this).attr("href");
	});
});
