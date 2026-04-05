function showMessenger() {
    document.getElementById('profile-screen').style.display = 'none';
    document.getElementById('messenger-screen').style.display = 'flex';
}

function showProfile() {
    document.getElementById('messenger-screen').style.display = 'none';
    document.getElementById('profile-screen').style.display = 'block';
}

function handleInput() {
    const val = document.getElementById('msg-input').value;
    document.getElementById('like-icon').style.display = val ? 'none' : 'block';
    document.getElementById('send-icon').style.display = val ? 'block' : 'none';
}

async function sendMsg(text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById('chat-time').innerText = time;
    document.getElementById('bubble-text').innerText = text;
    document.getElementById('msg-wrapper').style.display = 'block';
    document.getElementById('suggestions').style.display = 'none';
    
    // Vercel API-তে মেসেজ পাঠানো
    await fetch(`/api/send-message?message=${encodeURIComponent(text)}`);
}

function sendManual() {
    const input = document.getElementById('msg-input');
    sendMsg(input.value);
    input.value = '';
    handleInput();
}
