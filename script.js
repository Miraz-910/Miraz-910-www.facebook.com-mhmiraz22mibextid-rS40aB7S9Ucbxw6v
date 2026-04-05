// এই স্ক্রিপ্টটি তোমার আগের HTML-এর ভেতরে <script> ট্যাগে বসবে

// Firebase Configuration (তোমার নিজেরটা বসাও)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  databaseURL: "https://your-project-id.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ১. বট থেকে এপ্রুভাল চেক করা
db.ref('status/friendRequest').on('value', (snapshot) => {
    const status = snapshot.val();
    const btn = document.getElementById('addFriendBtn');
    if(status === 'approved') {
        btn.innerHTML = '<i class="fas fa-user-check"></i> Friends';
        btn.className = 'btn btn-gray';
    } else if (status === 'rejected') {
        btn.innerHTML = '<i class="fas fa-user-plus"></i> Add Friend';
    }
});

// ২. চ্যাট মেসেজ পাঠানো (User to Bot)
function sendMessage() {
    const input = document.querySelector('.msgr-in');
    const msg = input.value;
    if(msg.trim() !== "") {
        // ইউজার স্ক্রিনে মেসেজ দেখাও
        appendMessage(msg, 'sent');
        // টেলিগ্রাম বটে পাঠাও
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=User: ${msg}`);
        input.value = "";
    }
}

// ৩. বটের রিপ্লাই রিসিভ করা (Bot to User)
db.ref('chat/reply').on('value', (snapshot) => {
    const reply = snapshot.val();
    if(reply) {
        appendMessage(reply, 'received');
    }
});

function appendMessage(text, type) {
    const chatBody = document.getElementById('msgs');
    const div = document.createElement('div');
    div.className = type === 'sent' ? 'msg-sent' : 'msg-received';
    div.innerText = text;
    chatBody.appendChild(div);
}
