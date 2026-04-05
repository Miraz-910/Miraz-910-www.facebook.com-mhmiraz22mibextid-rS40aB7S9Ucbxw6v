export default async function handler(req, res) {
    const { message } = req.query;
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    // টোকেন বা আইডি মিসিং থাকলে এরর দিবে
    if (!botToken || !chatId) {
        return res.status(500).json({ error: "Token or Chat ID is missing in Vercel settings!" });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            // টেলিগ্রাম থেকে কোনো এরর আসলে সেটি দেখাবে
            return res.status(500).json({ error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ error: "Network Error" });
    }
}
