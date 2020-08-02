//const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

// this function gets invoked when it is able to read the QR code
// the input will be in the format as follows
// premiseid=XYZ&totalguests=123
// one addl input will be added gateType = entry or exit

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
	const inputSplit = res.split("&");
	const premiseId = inputSplit.filter( (item) => { return item.indexOf("premiseid") > -1 } ); 
	const totalguests = inputSplit.filter( (item) => { return item.indexOf("totalguests") > -1 } );
	const gateType = $( "#gateType" ).val();
//	const premiseId = inputSplit[0].substring(inputSplit[0].indexOf("=") + 1);
//	const totalguests = inputSplit[1].substring(inputSplit[1].indexOf("=") + 1);
	const jsonFormat = { "premiseid" :  premiseId.substring(premiseId.indexOf("=") + 1), 
							"totalguests" : totalguests.substring(totalguests.indexOf("=") + 1), 
							"gatetype" : gateType };
	console.log(jsonFormat);
	
	//call POST function to node js server in IBM cloud
	$.ajax({
//          url: "https://alpha-server.eu-gb.mybluemix.net/api/resource",
//		  url: "https://9c2d06a4.eu-gb.apigw.appdomain.cloud/alphacloudant/new",
		  url: "https://alpha-server.eu-gb.mybluemix.net/api/update/" + premiseId.substring(premiseId.indexOf("=") + 1),
          type: "POST",
          data: {
			"totalguests" : totalguests			  
		  },
          dataType: "json",
//		  contentType : "application/json",
          success: function(result) {
			alert('POSTED');
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
    setTimeout(scan, 300);
  }
}
