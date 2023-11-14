async function startScanner() {
    const video = document.getElementById('qr-scanner');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        const settings = track.getSettings();
        
        const { width, height } = capabilities;
        video.width = settings.width || width;
        video.height = settings.height || height;
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.width;
        canvas.height = video.height;
        
        const qrScannerInterval = setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code) {
                console.log(code.data);
                clearInterval(qrScannerInterval);
                window.location.href = code.data;
            }
        }, 1000 / 5);
        
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

startScanner();

