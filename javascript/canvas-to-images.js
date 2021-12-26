const download  = (el) => {
    const canvas = document.querySelector(el);
    if (canvas) {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png')
        a.download = Math.random().toString(32) + '.png';
        a.click();
    }
}