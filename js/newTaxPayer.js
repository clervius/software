/* Functions for creating a new taxpayer return */
	 $('.newTaxSSN, .ssnText').keyup(function() {
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

	console.log('the taxpayer name is ' + fName + ' ' + mName + ' ' + lName + '.');

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
		$('.spouseInput').prop('disabled', false)
		$('.forSpouse').css('opacity','1')
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

	/*$(document).on('click', '#newTax', function(){
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