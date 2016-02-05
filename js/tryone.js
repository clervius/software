	// make sure that every panel that is loaded has some kind of identifyer to let me know whether or not they are the first or what number they are in the tree they belong
	// Remove a certain number of panels based on what has been clicked... Checked the level that is opened and the level that is being required by the button being clicked
	// May need to remove everything entirely to reload everything. Perhaps load brand new.
	// If the button is all the way on the outside of the tree.. then check to see if the loaded window isn't already what is being required. If it isn't then, remove what's up and put in the new things. If it is, do nothing.

	$(document).on('click','.taxType', function(){
		$(this).hide();
		$('.choosetaxType').show();
	})
	$(document).on('click', '.choosetaxType li a', function(){
		var taxType = $(this).html();
		$('.taxType').html(taxType);
		console.log(taxType);
		$('.choosetaxType').hide();
		$('.taxType').show();
	})

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
		var panelBody = $('.panelBody');
		var panel = panelBody.parents('section.panelWindow');
		var containerHeight = panel.parent().height();
		var topBar = panel.find('.panelTopBar').height();
		var header = panel.find('.panelHeader').height();
		
		console.log("The containerHeight is "+containerHeight+" and the header height is "+header+" - and the topBar Height is " +topBar);
		// panelBody.animate({height: containerHeight - header - topBar - 21}, 70);
		panelBody.height(containerHeight - header - topBar - 18);

		 $('.pBodyWrapper').mCustomScrollbar({theme: "minimal-dark", scrollInertia: 250, callbacks:{
				onCreate: function(){
					console.log("scrollbar Created")					
				}
			}});
	}	

	// Function that closes the panels
	$(document).on('click', '.panelClose', function(){
		console.log("clicked to close panel")
		var panelWindow = $(this).parents('section.panelWindow');
		var listItems = panelWindow.next('.panelList');
		panelWindow.animate({width: 0}, 70, function(){
			panelWindow.remove();
			listItems.remove();
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

		/*if(panelHeaderHeight === "0px"){
			panelHeader.css("border-top","1px solid white")			
		}else{
			panelHeader.css("border-top","none");
		}*/
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

/* Functions for creating a new taxpayer return */
/*
	 $('.newTaxSSN').keyup(function() {
		 var val = this.value.replace(/\D/g, '');
          var newVal = '';
          if(val.length > 4) {
             this.value = val;
          }
          if((val.length > 3) && (val.length < 6)) {
             newVal += val.substr(0, 3) + '-';
             val = val.substr(3);
          }
          if (val.length > 5) {
             newVal += val.substr(0, 3) + '-';
             newVal += val.substr(3, 2) + '-';
             val = val.substr(5);
           }
           newVal += val;
           this.value = newVal;
		})
	
	//Function to make DOB formatted
	$('.dobInput').keyup(function(){
		console.log('typed in dob')
		var val = this.value.replace(/\D/g, '');
		var newVal = '';
		if(val.length > 4) {
			this.value = val;
		}
		if( (val.length > 3) && (val.length < 6) ){
			newVal += val.substr(0, 3) + '/';
			val = val.substr(3)
		}
		if(val.length > 5) {
			newVal += val.substr(0, 3) + '/';
			newVal += val.substr(3, 2) + '/';
			val = val.substr(5);
		}
		newVal += val;
		this.value = newVal;
	})
	$(document).on('click', '#newTax', function(){
		var SSN = ' ';

		$(this).fadeOut(100, function(){
			$('#newTaxStart').fadeIn(100);	
		});

		$('#confirmnewTaxSSN').keyup(function(){	
			var SSN = $('#newTaxSSN').val();	 	
		 	console.log("social is.. " +$(this).val() + " But the original is " + SSN);
		 	if( $('#confirmnewTaxSSN').val() === SSN ){
		 		$('#newTaxStart').fadeOut(100, function(){
		 			$('.pSSN').html(SSN);
		 			$('#tpSSN').val(SSN)
		 			$('.panelWindow').fadeIn(300,function(){
		 				$('.panelList').fadeIn(500)
		 			})
		 			$('#newTax').fadeIn(200)
		 		})
		 	}
		 })

	})*/
	 
/* End new taxpayer functions */
	


	function newPanel(){
		var link = $(this).attr("href");
		var id = link.substring(1);

		var panelWindow = $(this).parents('section.panelWindow');

		// Window closing functions
		function closeOtherWindows(){
			var	windows = $('.panelWindow').not(panelWindow);
			var closeButton = windows.find('.panelClose')
			closeButton.click();
		}
		function closeAllWindows(){
			var closeButton = $('.panelWindow').find('.panelClose');
			closeButton.click();
		}
		//Check if the link is from the outer area
		if( $(this).hasClass("outerLink") ){
			console.log("this link is from the main screen");
			// Check if the first opened panel currently belongs to the link we clicked on.
			if( $('.firstPanel:visible').attr("id") === id ) {
				console.log("This screen is already open");
				//Do nothing
			}else{
				console.log("This screen is not open yet")
				//Run a function that saves things in child windows

				// Run a function that closes all the windows to the right
				console.log("closing all windows")
				closeAllWindows();

				//Then, run a function that loads the new content in a new panel
				// Run a function that puts the new window in focus
			}
		}else if( $(this).hasClass("innerLink") ){
			//var parentPanel = 
			//var nextPanel = parentPanel.next(/*Put something in here */:visible);
			// Check to see if there is a child window open to the right
			// Check to see if that child window has the same ID as the Href for the current link
			if( nextPanel.attr("id") === id ){
				// Do nothing
			}else{
				//Run a function that saves things in child windows
				// Run a function that closes the side windows to the right
				// Run a function that loads the new content in a new panel to the right
				// Run a function that puts the new window in focus
			}
		}else{
			// Follow the directions of the link on a case by case basis.
		}
		panelBodyHeight();
	}	


$(document).on('click', '.load', function(){
	newPanel();
})
$(document).ready(function(){
	panelBodyHeight();

	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	  


})
$(window).resize(function(){
	panelBodyHeight();
})