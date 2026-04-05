export default async function handler(req, res) {
    const { message } = req.query;
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    await fetch(url);
    res.status(200).json({ success: true });
}
