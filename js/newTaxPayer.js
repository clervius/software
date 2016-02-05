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
	
	//Function to make DOB formatted
	/*$('.dobInput').keyup(function() {
		console.log('typed in dob')
		var val = this.value.replace(/\D/g, '');
		var newVal = '';
		if(val.length > 4) {
			this.value = val;
		}
		if( (val.length > 2) && (val.length < 6) ){
			newVal += val.substr(0, 2) + '/';
			val = val.substr(2)
		}
		if(val.length > 5) {
			newVal += val.substr(0, 2) + '/';
			newVal += val.substr(3, 2) + '/';
			val = val.substr(5);
		}
		newVal += val;
		this.value = newVal;
	})*/
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

	})
	 
/* End new taxpayer functions */