function onImageUpload(event){
    const blob = event.target.files[0]
    const url  = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
        let ctx = document.getElementById("imgcanvas").getContext("2d");
        ctx.drawImage(img,0,0);
    }
    img.src = url;
}
window.onload = () => {
    document.getElementById("finput").addEventListener('change', onImageUpload);
}
