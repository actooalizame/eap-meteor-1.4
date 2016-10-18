
$(window).load(function() {

	'use strict';


	
//------------------------------------------------------------------------
//						COUNTER SCRIPT
//------------------------------------------------------------------------
   $('.timer').counterUp({
            delay: 20,
            time: 2500
        });



//------------------------------------------------------------------------
//						NAVBAR SLIDE SCRIPT
//------------------------------------------------------------------------ 		
	$(window).scroll(function () {
        if ($(window).scrollTop() > $('nav').height()) {
            $('nav.navbar-slide').addClass('show-menu');
        } else {
            $('nav.navbar-slide').removeClass('show-menu');
			$('.navbar-slide .navMenuCollapse').collapse({toggle: false});
			$('.navbar-slide .navMenuCollapse').collapse('hide');
			$('.navbar-slide .navbar-toggle').addClass('collapsed');
        }
    });
	
//------------------------------------------------------------------------
//						NAVBAR HIDE ON CLICK (COLLAPSED) SCRIPT
//------------------------------------------------------------------------ 		
    $('.nav a').on('click', function(){ 
        if($('.navbar-toggle').css('display') !='none'){
            $('.navbar-toggle').click()
        }
    });
	
})




$(document).ready(function(){
			
	'use strict';

	
	

//------------------------------------------------------------------------	
//                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
//------------------------------------------------------------------------  
	          
    $('.portfolio-list li').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });	  

});
