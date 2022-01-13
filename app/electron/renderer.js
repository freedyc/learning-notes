const gid = (id) => document.getElementById(id)
document.getElementById('toggle-dark').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    gid('theme-source').innerHTML= isDarkMode ? 'dark' : 'light'
});


document.getElementById('reset-to-system').addEventListener('click', async () => {
    console.log('切换到系统');
    await window.darkMode.system();
    gid('theme-source').innerHTML= 'system'
});


gid('open-new-window').addEventListener('click', async() => {
    console.log('打开新窗口');
    await window.operation.newWindow();
})

gid('icon-progress').addEventListener('click', async () => {
    await window.operation.progress();
})


gid('send-notification').addEventListener('click', () => {
    console.log('click send-notification btn', Notification.permission)

    if (Notification.permission === 'granted') {
        new Notification('通知', { body: ' 我具备发通知的能力了'}).onclick = () => {
            gid('show-notification').innerHTML = '通知被点击了'
        }
    } else {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('通知', { body: ' 我具备发通知的能力了'}).onclick = () => {
                    gid('show-notification').innerHTML = '通知被点击了'
                }
            }
        })
    }
})


gid('copy').addEventListener('click', () => {
    console.log('click copy btn')
    const copyText = gid('copy-text')
    console.log(copyText.value);
    // copyText.select()
    // document.execCommand('copy')
    // copyText.blur()
    // electron api 实现复制粘贴
    window.clipboard.copy(`Electron clipboard${copyText.value}`);
})

gid('paste').addEventListener('click', () => {
    console.log('paste');
    // document.execCommand('paste');
    console.log('打印粘贴内容', window.clipboard.paste('123'));
});