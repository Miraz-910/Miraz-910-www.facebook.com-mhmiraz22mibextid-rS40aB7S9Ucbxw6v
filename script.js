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
