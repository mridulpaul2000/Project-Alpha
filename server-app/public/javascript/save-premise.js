// DECLARE GLOBAL VARIABLES
var savedScreenerDetails = [];
//Execute functions on page load
$(document).ready(function() {
    
    //Prevent default submit button click
    $("#savePremise").submit(function(e){
       e.preventDefault();
    });

});

function performSave() {
	
	messageResource.init({
		// path to directory containing properties files
		filePath : ''
	});
	
	messageResource.load('env'); 

	var value = messageResource.get('SERVER_URL', 'env');
	console.log(value);
	
    var jsonData = {
        "name"              : ($("#name").val()),
        "type"              : ($("#type").val()),
        "description"       : ($("#description").val()), 
        "address"           : ($("#address").val()),
        "timings"           : ($("#timings").val()),
        "instructions"      : ($("#instructions").val()),
        "latitude"          : ($("#latitude").val()),
        "longitude"         : ($("#longitude").val()),
        "maxLimit"          : ($("#maxLimit").val()),
        "currentStrength"   : ($("#currentStrength").val())             
    };

    $.ajax({
      type          : "POST",
//      url           : "https://9c2d06a4.eu-gb.apigw.appdomain.cloud/alphacloudant/new",
		url : value,
		data          : JSON.stringify(jsonData),
      success       : function(data){ 
                                        if(data.error)
                                            $('#id_message').html("<font color='red'> Please enter name, type, latitude and longitude</font>");
                                        else
                                            $('#id_message').html("<font color='green'>Your data is saved</font>");
                        },
      dataType      : "json",
      contentType   : "application/json"
    });

    return false;
}
