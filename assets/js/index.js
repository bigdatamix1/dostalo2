function handleFileSelect(event) {
  const files = event.target.files;
  handleFiles(files);
}

window.onload = function () {
  const uploadButton = document.getElementById("uploadButton");
  uploadButton.style.opacity = "1";
};

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");
  const files = event.dataTransfer.files;
  handleFiles(files);
});

function handleFiles(files) {
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const uploadedImage = document.getElementById("uploadedImage");
      uploadedImage.src = e.target.result;
      uploadedImage.style.display = "block";
      document.getElementById("dropZoneText").style.display = "none";
      document.getElementById("dropZoneIcon").style.display = "none";

      fileInput.blur();

      simulateLoading();
    };

    reader.readAsDataURL(file);
  }
}

function simulateLoading() {
  const uploadButton = document.getElementById("uploadButton");
  const eraserButton = document.getElementById("EraserNow");
  const dropZone = document.getElementById("dropZone");
  const dropZoneIcon = document.getElementById("dropZoneIcon");
  const dropZoneText = document.getElementById("dropZoneText");

  uploadedImage.style.filter = "opacity(0.5)";

  dropZoneIcon.src = "assets/images/hourglass_top.svg";
  dropZoneText.textContent = "Uploading...";
  dropZoneText.classList.add("text-shadow");
  dropZoneIcon.style.position = "absolute";
  dropZoneIcon.style.top = "30%";
  dropZoneIcon.style.left = "50%";
  dropZoneIcon.style.transform = "translate(-50%, -50%)";
  dropZoneIcon.style.display = "block";
  dropZoneText.style.display = "block";

  dropZone.style.pointerEvents = "none";
  uploadButton.style.display = "none";

  eraserButton.style.display = "block";
  eraserButton.disabled = true;
  eraserButton.style.opacity = "0.5";

  setTimeout(() => {
    uploadedImage.style.filter = "none";
    dropZoneText.style.display = "none";
    dropZoneIcon.style.display = "none";
    eraserButton.disabled = false;
    eraserButton.style.opacity = "1";
  }, 3000);
}

function EraserNow() {
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'event':'customEvent'});
  const uploadedImage = document.getElementById("uploadedImage");
  const dropZoneIcon = document.getElementById("dropZoneIcon");
  const loadingCircle = document.getElementById("loadingCircle");
  const eraserButton = document.getElementById("EraserNow");

  uploadedImage.style.filter = "blur(5px)";
  dropZoneIcon.src = "assets/images/Logo_preloader.svg";

  dropZoneIcon.style.display = "block";
  loadingCircle.style.display = "block";

  eraserButton.innerHTML = `
      <img src="assets/images/hourglass_top.svg" alt="Loading" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 12px;">
      Photo is being processed
  `;
  eraserButton.style.backgroundColor = "#6331B433";
  eraserButton.style.color = "#B587FF";

  setTimeout(() => {
    const resultUrl = eraserButton.getAttribute("href");

    eraserButton.innerHTML = `Get the result`;
    eraserButton.style.backgroundColor = "#E86F00";
    eraserButton.style.color = "#FFFFFF";
    eraserButton.disabled = false;
onClick="window.dataLayer.push({event: "test"})" 
    eraserButton.onclick = () => {
      window.open(resultUrl, "_blank");
    };

    const dropZoneText = document.getElementById("dropZoneText");
    dropZoneText.innerHTML =
      "Want to get the result? <br> Click the button below! ";
    dropZoneText.style.display = "block";
    dropZoneText.style.color = "#FFFFFF";
    loadingCircle.style.display = "none";
  }, 3000);
}

document.getElementById("uploadButton").addEventListener("click", () => {
  fbq('track', 'Lead');
  document.getElementById("fileInput").click();
});
