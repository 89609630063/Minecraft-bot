const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN; // Railway ENV
const bot = new TelegramBot(token, { polling: true });

const jsonPath = path.join(__dirname, 'recipes_converted.json'); // Используем локальный файл

// ✅ Проверяем, есть ли файл. Если нет, создаём пустой JSON
if (!fs.existsSync(jsonPath)) {
    console.log("⚠ Файл recipes_converted.json не найден, создаём новый...");
    fs.writeFileSync(jsonPath, JSON.stringify({ recipes: [] }, null, 4), 'utf-8');
}

// ✅ Загружаем рецепты
let recipes = {};
try {
    recipes = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log("✅ Recipes загружены!");
} catch (error) {
    console.error("❌ Ошибка загрузки JSON:", error.message);
}

bot.onText(/(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userItems = match[1].toLowerCase().replace(/\s+/g, '').split(',').map(i => i.trim());

    console.log("📩 Входные данные от пользователя:", userItems);

    let foundRecipes = recipes.recipes.filter(recipe =>
        JSON.stringify(recipe.ingredients.sort()) === JSON.stringify(userItems.sort())
    );

    if (foundRecipes.length > 0) {
        bot.sendMessage(chatId, `Можно скрафтить: ${foundRecipes.map(r => r.name).join(', ')}`);
    } else {
        bot.sendMessage(chatId, "❌ Не найдено совпадений.");
    }
});

console.log("🤖 Бот запущен...");
setInterval(() => console.log("✅ Бот работает..."), 60000);