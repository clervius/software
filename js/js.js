$(document).on('click','#loginButton', function(e){
	
	console.log("trying to login")
	window.location.href = "application.html";
	return false;
})

//Change the type of tax that the system is set up for
$(document).on('click', '.taxType', function(){
	$(this).hide();
	$('.choosetaxType').show();
})
$(document).on('click','.choosetaxType li a', function(){
	var taxType = $(this).html();
	$('.taxType').html(taxType);
	console.log('Switched the system tax to '+taxType);
	$('.choosetaxType').hide();
	$('.taxType').show();
})
	// Change the tax type for the current tax
$(document).on('click', '.pcurType, .ptaxType i', function(){
	//$(this).find('.pcurType').hide();
	$('.ptaxTypes').show()
})
$(document).on('click', '.ptaxTypes li', function(){
	var newType = $(this).html()
	$('.pcurType').html(newType);		
	$('.ptaxTypes').css('display','none');
	console.log(newType);
})

/* Functions for the top header portion of the panels */	
	//Function to keep the panel body height consistent.
	function panelBodyHeight(){
		/*
		var panelBody = $(document).find('.panelBody');
		var panel = panelBody.each().parents('section.panelWindow');
		var containerHeight = 
		*/

		var panelBody = $('.panelBody');
		var panel = panelBody.parents('section.panelWindow');
		var containerHeight = panel.parent().height();
		var topBar = panel.find('.panelTopBar').height();
		var header = panel.find('.panelHeader').height();
		
		

		console.log("The containerHeight is "+containerHeight+" and the header height is "+header+" - and the topBar Height is" +topBar);
		// panelBody.animate({height: containerHeight - header - topBar - 21}, 70);
		//$('.smBody').height($('.smBody').height() - 5)
		panelBody.height(containerHeight - header - topBar - 18);
		
		 $('.pBodyWrapper').mCustomScrollbar({theme: "minimal-dark", scrollInertia: 250, callbacks:{
				onCreate: function(){
					console.log("scrollbar Created")					
				}
			}});
		 $('#smBody').mCustomScrollbar({
		 	axis: "x", 
		 	theme: "minimal-dark", 
		 	scrollInertia: 250, 
		 	mouseWheel: {
		 		enable: false
		 	},
		 	callbacks:{
		 	onCreate: function(){
		 		console.log("horizontal Scrollbar created")
		 	}
		 }})

		 	$(function () {$('[data-toggle="tooltip"]').tooltip();})
			$(function () {$('.dobInput').datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+0"
				});
			})
			$('.spouseInput, .spouseInput_').prop('disabled', true);
	}	

	// Function to toggle showing the Forms and schedules
	$(document).on('click', '.panelFormS', function(){
		var panelWindow = $(this).parents('section.panelWindow');
		//var listItems = panelWindow.next('.panelList');
		panelWindow.next('.panelList').fadeToggle(150);
	})
	// Function that closes the panels
	$(document).on('click', '.panelClose', function(e){
		console.log("clicked to close  forms panel");

		var panelWindow = $(this).parents('section.panelWindow');
		var listItems = panelWindow.next('.panelList');

		panelWindow.animate({width: 0}, 70, function(){
			panelWindow.remove();
			listItems.remove();

			if(e.hasOwnProperty('originalEvent')) {
				$('#smBody').mCustomScrollbar("scrollTo", 50);
			}else {
				console.log('User did not ask to close panel, so we dont scroll')
				// Do not scroll
			}
		});	
	})
	// Function to make panels wider
	$(document).on('click', '.panelWidth', function(){
		console.log("clicked to change panel width");
		var panelWindow = $(this).parents('section.panelWindow');
		var panelWidth = panelWindow.width() === 750 ? "950px": "750px";
		var widthIcon = $(this).find("i");
		var icon = panelWindow.width() === 950 ? "fa fa-chevron-right": "fa fa-chevron-left";
		console.log(panelWidth);
		widthIcon.attr('class',icon);
		panelWindow.animate({width: panelWidth}, 70, function(){
			if( panelWidth === "750px"){
				console.log("the window is now small")
			}else{
				console.log("the panel is now large")
			}
		})	
	})
	// Functions to shrink header and increase body (toggle)
	$(document).on('click', '.panelHeight', function(){
		console.log("clicked to change header height")
		var panelWindow = $(this).parents('section.panelWindow');
		var panelHeader = panelWindow.find('.panelHeader');
		var panelHeaderHeight = panelHeader.height() === 0 ? "140px": "0px";
		var heightIcon = $(this).find("i");;
		var icon = panelHeader.height() === 0 ? "fa fa-chevron-up": "fa fa-chevron-down";
		var headerContent = panelWindow.find('.panelHeaderContent');
		var listItems = panelWindow.next('.panelList');
		console.log(panelHeaderHeight);

		panelHeader.animate({height: panelHeaderHeight}, 70, function(){
			if( panelHeaderHeight === "0px"){
				console.log("the panel header is now shrunk");
				panelHeader.hide();
				headerContent.fadeIn();
				panelBodyHeight();
				$('.panelMoney').hide();
				listItems.animate({
					"padding-top":"30px"
				}, 70)
			}else{
				console.log("the panel header is now big");
				panelHeader.slideDown(70)
				headerContent.fadeOut();
				panelBodyHeight();
				$('.panelMoney').show();
				listItems.animate({
					"padding-top":"170px"
				}, 70)
			}
		})
		heightIcon.attr('class', icon);

	})

	//Function to show or hide the refund amount
	$(document).on('click', '.panelMoney', function(){
		console.log("toggling the money")
		$('.phRefundAmt').fadeToggle(150)
	})
/* End of the top header functions */

// UX function - make the empty inputs gray, filled ones white, and focused ones dark.
$(document).on('blur', '.pBodyWrapper input, .pBodyWrapper select', function(){
	console.log("you left that input")
	if( $(this).val() === '' ) {
		$(this).css('background-color', 'rgba(0,0,0,.08)');
		$(this).css('border-bottom','none')
	}else {
		$(this).css('background-color', 'transparent');
		$(this).css('border-bottom','1px solid rgba(0,0,0,.2)')
		$(this).css('color', 'black')
	}
});
$(document).on('focus', '.pBodyWrapper input, .pBodyWrapper select', function(){
	$(this).css('background-color', '#001325');
	$(this).css('color', 'white');
	$(this).attr('autocomplete', 'off')
})




//To be at the very end of the sheet - Calls & inits
$(document).ready(function(){
	$('#applicationBody').fadeIn(1700);
	panelBodyHeight();
	$('#tpLookup').hideseek({
		highlight: true,
		hidden_mode: true,
		headers: '.dashResultsTl'
	});
	$('#tpFormTree').sortable();
})
$('.pBodyWrapper').hover(function(){
	$('#smBody').mCustomScrollbar('disable')
},function(){
	$('#smBody').mCustomScrollbar("update")
})
$(window).resize(function(){
	panelBodyHeight();
})