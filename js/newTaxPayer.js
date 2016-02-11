/* Functions for creating a new taxpayer return */
	/* $('.newTaxSSN, .ssnText').keyup(function() {
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
		})*/
$(document).on('keyup', '.newTaxSSN, .ssnText', function(){
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
$(document).on('change', '#tpFname, #tpMI, #tpLname', function(){
	var panelWindow = $(this).parents('section.panelWindow');
	var taxPayer = panelWindow.find('.tpNamepart');
	var fName = panelWindow.find('#tpFname').val();
	var mName = panelWindow.find('#tpMI').val();
	var lName = panelWindow.find('#tpLname').val();
	var Careof = panelWindow.find('#tpCareOf');
	console.log('the taxpayer name is ' + fName + ' ' + mName + ' ' + lName + '.');

	Careof.val(fName + ' ' + lName)
	if( fName == '' && lName == '' ){
		taxPayer.fadeOut(150, function(){
			taxPayer.html('New Taxpayer');
		})		
		taxPayer.fadeIn(150)
		
	} else {
		taxPayer.fadeOut(150, function(){
			taxPayer.html(fName + ' ' + lName);
		})		
		taxPayer.fadeIn(150)
	}
})
$(document).on('change', '#tpMarital', function(){
	var panelWindow = $(this).parents('section.panelWindow');
	var headerStatus = panelWindow.find('.headStatus');
	var Status = $(this).val();
	headerStatus.html(Status);

	if( Status === "MFJ" ){
		console.log('status is' + Status + '. spouse should be enabled');
		/*$('.forSpouse, .forSpouse_').animate({'background-color': 'black','color':'white'}, 70, function(){
			$('.forSpouse').animate()
		})*/
		$('.spouseInput').prop('disabled', false)
		$('.forSpouse').css('opacity','1');
		$('.spouseInput_').prop('disabled', false);
		$('.forSpouse_').css('opacity', '1')
	} else if( Status === "MFS"){
		console.log("Status is filing separate");
		$('.spouseInput').prop('disabled', true)
		$('.forSpouse').css('opacity','.3')
		$('.spouseInput_').prop('disabled', false);
		$('.forSpouse_').css('opacity', '1')
	}else{
		console.log('status is' + Status + '. Spouse should be disabled')
		$('.spouseInput, .spouseInput_').prop('disabled', true)
		$('.forSpouse, .forSpouse_').css('opacity','.3')
	}
})

	$(document).on('click', '#newTax', function(){
		var SSN = ' ';
		var $confirm = $('#confirmnewTaxSSN').val();
		$(this).fadeOut(100, function(){
			$('#newTaxStart').fadeIn(100);	
		});

		$('#confirmnewTaxSSN').keyup(function(){	
			var SSN = $('#newTaxSSN').val();	 	
		 	//console.log("social is.. " +$(this).val() + " But the original is " + SSN);
		 	if( $('#confirmnewTaxSSN').val() === SSN ){
		 		$('#newTaxStart').fadeOut(100, function(){		 			
		 			$('#newTaxSSN, #confirmnewTaxSSN').val('')
		 			$('#newTax').fadeIn(200);

		 			$.ajax({
		 				url: "panels/newTaxpayer.html",
		 				dataType: 'html',
		 				success: function(data){
		 					$('.smBody').append(data);
		 					$('.pSSN').html(SSN);
		 					$('#tpSSN').val(SSN);
		 					panelBodyHeight();
		 					$('#tpFormTree').sortable();
		 					var dashWindow = $('.dashWindow').width();
							var number = dashWindow +  50;
							$('#smBody').mCustomScrollbar("scrollTo", number);
		 				}

		 			})

		 		})
		 	}/* else if( $confirm.length > 8) {
		 		console.log("you entered the wrong social")
		 		$('#incorrectSSNModal').modal();
		 	}*/
		 })

	})

	//Pull in panel for the header menu items
	/*$(document).on('click', '.pheaderMenuItem', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		console.log("file is in "+ url);
		if($('#addFormsWindow').is(":visible")) {
			console.log('The forms window is already open')
		} else{
			$.ajax({
				url: url,
				dataType: 'html',
				success: function(data){
					var dashWindow = $('.dashWindow').width();
					var panelWindow = $('.panelWindow').width();
					$('.smBody').append(data);
					panelBodyHeight();
					$('#searchFormsInput').hideseek({
						highlight: true,
						nodata: 'No forms or schedules found for your search'
					});
					var number = dashWindow + panelWindow + 110
					//console.log(addFormsWindow + " + " + panelList + " = " + number )
					$('#smBody').mCustomScrollbar("scrollTo", number);
				}
			})
		}
	})

	$(document).on('click','.pheaderMenuItem', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		var panelID = $(this).data('panelid');
		function loadPanel(){
			$.ajax({
					url: url,
					dataType: 'html',
					success: function(data){
						console.log('Found the file');					
						$('.smBody').append(data);
						panelBodyHeight();
					}
				})
			}

	})*/
$(document).on('focus', '#searchFormsInput', function(){
	$('#searchFormsInput').hideseek({
		highlight: true,
		nodata: 'No forms or schedules found for your search'
	});
})
/* End new taxpayer functions */


/* Add Forms Functions */

$(document).on('click', '.addFormLink', function(e){
	e.preventDefault();
	var theForm = $(this).parents('li');
	var formName = theForm.find('.addFormName').html();
	$('#tpFormTree').append('<li class="ui-sortable-handle"><a href=""><i class="fa fa-file-text"></i> '+formName+'</a></li>')
})
/* end functions for adding forms */
/* Print Dialogue Functions */
// For the select Forms
$(document).on('change', '#SpFrms', function(){
	var Form = $(this).val();
	var PrintButton = $('#printSpFrms');
	if( Form === 'nothing') {
		PrintButton.css('display', 'none')
	} else {
		PrintButton.css('display', 'block')
	}
})
/* End Print Dialogue FUnctions */

/* Functions for viewing current forms */
$(document).on('click','.link2tpForm, .pheaderMenuItem', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		var formID = $(this).data('formid');
	if( url != '') {
		
		
		console.log("you want to open the form at " + url + ". and that ID is " + formID);
		function loadPanel(){
			$.ajax({
					url: url,
					dataType: 'html',
					success: function(data){
						console.log('Found the file');					
						$('.smBody').append(data);
						panelBodyHeight();
					}
				})
		}
		if ( $('.secondWindow').is(":visible") ){
			if($('.secondWindow').attr('id') === formID){
				console.log('This form is already opened');
				// Do nothing
			}else{
				var otherWindows = $('.secondWindow').nextAll();
				var oWxMark = otherWindows.find('.panelClose');
				oWxMark.click();
				$('.secondWindow').find('.panelClose').click();
				console.log('closed all other windows')
				loadPanel();
			} 		
		} else{
			loadPanel();
			var dashWindow = $('.dashWindow').width();
			var panelWindow = $('.panelWindow').width();
			var number = dashWindow + panelWindow + 110;
			$('#smBody').mCustomScrollbar("scrollTo", number);
		}
	}else{
		console.log("the Url is blank")

	}

	
})/*
jQuery('body').bind('focusin focus', function(e){
	e.preventDefault();
})*/

$(document).on('focusin focus', '.panelWindow input, .panelWindow select, .secondWindow input, .secondWindow select', function(){
	$('#smBody').mCustomScrollbar('disable');
})
$(document).on('blur', '.panelWindow input, .panelWindow select, .secondWindow input, .secondWindow select', function(){
	$('#smBody').mCustomScrollbar("update")
} )
/* End current forms functions */
