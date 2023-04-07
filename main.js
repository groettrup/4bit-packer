url = undefined

function tograyscale(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let outstring = "{ "
    let x = 0
    for (let i = 0; i < data.length; i += 4) {
        const avg = ((data[i] + data[i + 1] + data[i + 2]) / 3)>>4;
        if((i>>2)%2==0){
            x = avg << 4
        } else {
            x += avg
            if(i!=4)outstring += ", "
            outstring += "0x" + x.toString(16);
        }
        data[i] = avg<<4; // red
        data[i + 1] = avg<<4; // green
        data[i + 2] = avg<<4; // blue
    }
    // last 4 bits are not printed in the loop if the last i is divisible by 8
    // without a reminder. with `length == last_i + 4` i can test whether the lenght
    // is not divisible by 8
    if((data.length>>2)%2==1){
        outstring += ", 0x" + x.toString(16);
    }
    outstring += " } "
    const out = document.getElementById("out")
    out.onclick = () => {
        out.onclick = null
        navigator.clipboard.writeText(outstring)
    }
    ctx.putImageData(imageData, 0, 0);
};

function onSizeChange(change_event){
    const canvas = document.getElementById("imgcanvas")
    let val = change_event.target.value
    switch(change_event.target.id){
        case 'winput':
            if(val <= 960) canvas.width = val
            else change_event.target.value = canvas.width
            break;
        case 'hinput':
            if(val <= 540) canvas.height = val
            else change_event.target.value = canvas.height
            break;
    }
    if(url){
        const img = new Image()
        img.onload = () => {
            let ctx = canvas.getContext("2d")
            ctx.drawImage(img,0,0);
            tograyscale(ctx,canvas)
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
        const canvas = document.getElementById("imgcanvas")
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        tograyscale(ctx, canvas);
    }
    img.src = url;
}
window.onload = () => {
    document.getElementById("finput").addEventListener('change', onImageUpload);
    document.getElementById("winput").addEventListener('change', onSizeChange);
    document.getElementById("hinput").addEventListener('change', onSizeChange);
}
