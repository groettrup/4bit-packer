url = undefined

function onSizeChange(change_event){
    const canvas = document.getElementById("imgcanvas")
    switch(change_event.target.id){
        case 'winput':
            canvas.width = change_event.target.value
            break;
        case 'hinput':
            canvas.height = change_event.target.value
            break;
    }
    console.log(`${change_event.target.id}: ${canvas.width} / ${canvas.height}`);
    canvas.style["aspect-ratio"] = `${canvas.width} / ${canvas.height}`;
    if(url){
        const img = new Image()
        img.onload = () => {
            canvas.getContext("2d").drawImage(img,0,0);
        }
        img.src = url
    }   
}

function onImageUpload(change_event){
    const blob = change_event.target.files[0]
    if(url){
        URL.revokeObjectURL(url)
    }
    url  = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
        let ctx = document.getElementById("imgcanvas").getContext("2d");
        ctx.drawImage(img,0,0);
    }
    img.src = url;
}
window.onload = () => {
    document.getElementById("finput").addEventListener('change', onImageUpload);
    document.getElementById("winput").addEventListener('change', onSizeChange);
    document.getElementById("hinput").addEventListener('change', onSizeChange);
}
