
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