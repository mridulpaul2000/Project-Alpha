//const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

var value = null;
	messageResource.init({
		// path to directory containing properties files
		filePath : ''
	});

messageResource.load('env', function() {
	
	value = messageResource.get('PREMISE-ENTRY-EXIT_URL', 'env');
	console.log(value);

	qrcode.callback = res => {
	  if (res) {
		outputData.innerText = res;
		const inputSplit = res.split("&");
		const premiseId = inputSplit[0].substring(inputSplit[0].indexOf("=") + 1);
		const totalguests = inputSplit[1].substring(inputSplit[1].indexOf("=") + 1);
		const gateType = $( "#gateType" ).val();
		const jsonFormat = { "totalguests" : totalguests, "gatetype" : gateType };
		
		//call POST function to node js server in IBM cloud
		$.ajax({
			  url: value  + premiseId.substring(premiseId.indexOf("=") + 1),
			  type: "POST",
			  data: JSON.stringify(jsonFormat),
			  dataType: "json",
			  contentType : "application/json",
			  success: function(result) {
				alert('QR code has been posted to the server!');
			  }
		});

		scanning = false;

		video.srcObject.getTracks().forEach(track => {
		  track.stop();
		});

		qrResult.hidden = false;
		canvasElement.hidden = true;
		btnScanQR.hidden = false;
	  }
	};

}); 


// this function gets invoked when it is able to read the QR code
// the input will be in the format as follows
// premiseid=XYZ&totalguests=123
// one addl input will be added gateType = entry or exit


btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 1000);
  }
}
