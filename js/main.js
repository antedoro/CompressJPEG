const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("upload");
const fileList = document.getElementById("file-list");
const compressBtn = document.getElementById("compress-btn");
let files = [];

// Drop area event listeners
dropArea.addEventListener("click", () => fileInput.click());
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("highlight");
});
dropArea.addEventListener("dragleave", () => dropArea.classList.remove("highlight"));
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("highlight");
    const newFiles = Array.from(event.dataTransfer.files);
    files = [...files, ...newFiles];
    displayFileList();
    document.getElementById("output-container").innerHTML = "";
    document.getElementById("download-zip").style.display = "none";
});

// File input event listener
fileInput.addEventListener("change", (event) => {
    const newFiles = Array.from(event.target.files);
    files = [...files, ...newFiles];
    displayFileList();
    document.getElementById("output-container").innerHTML = "";
    document.getElementById("download-zip").style.display = "none";
    fileInput.value = '';
});

function removeFile(index) {
    files.splice(index, 1);
    displayFileList();
    if (files.length === 0) {
        fileList.innerHTML = '';
    }
}

function displayFileList() {
    if (files.length === 0) return;
    fileList.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.innerHTML = `
            <span>${file.name} - ${(file.size / 1024).toFixed(2)} KB</span>
            <button class="remove-btn" onclick="removeFile(${index})">Remove</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function compressImages() {
    if (files.length === 0) {
        alert("Please select or drop image files.");
        return;
    }
    
    const quality = document.getElementById("quality").value / 100;
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "";
    
    let zip = new JSZip();
    let compressedFilesCount = 0;
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                
                canvas.toBlob(blob => {
                    const compressedSize = (blob.size / 1024).toFixed(2);
                    const percentReduction = (((file.size - blob.size) / file.size) * 100).toFixed(2);
                    
                    const outputImg = document.createElement("img");
                    outputImg.src = URL.createObjectURL(blob);
                    
                    const info = document.createElement("p");
                    info.textContent = `${file.name} - Compressed: ${compressedSize} KB (${percentReduction}% reduction)`;
                    
                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = "compressed-" + file.name;
                    downloadLink.textContent = "Download";
                    
                    zip.file("compressed-" + file.name, blob);
                    compressedFilesCount++;
                    
                    const container = document.createElement("div");
                    container.appendChild(outputImg);
                    container.appendChild(info);
                    container.appendChild(downloadLink);
                    outputContainer.appendChild(container);
                    
                    if (compressedFilesCount === files.length) {
                        zip.generateAsync({ type: "blob" }).then(content => {
                            const zipLink = document.getElementById("download-zip");
                            zipLink.href = URL.createObjectURL(content);
                            zipLink.style.display = "block";
                            zipLink.textContent = "Download All as ZIP";
                        });
                    }
                }, "image/jpeg", quality);
            }
        }
        reader.readAsDataURL(file);
    });
}