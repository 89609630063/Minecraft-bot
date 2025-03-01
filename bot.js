const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN; // Используем ENV-переменную для Railway
const bot = new TelegramBot(token, { polling: true });

let recipes = {};
try {
    const data = fs.readFileSync('recipes_converted.json', 'utf-8');
    recipes = JSON.parse(data);
    console.log("✅ Recipes загружены!");
} catch (error) {
    console.error("❌ Ошибка загрузки JSON:", error.message);
}

bot.onText(/(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    
    // Логируем ввод пользователя
    console.log("📩 Входные данные от пользователя:", match[1]);

    const userItems = match[1]
        .toLowerCase()
        .replace(/\s+/g, '') // Убираем пробелы
        .split(',')
        .map(i => i.trim());

    console.log("🔎 Ищем рецепт для:", userItems);

    let foundRecipes = [];

    // Поиск рецептов
    Object.keys(recipes).forEach(recipe => {
        if (recipes[recipe] && Array.isArray(recipes[recipe].ingredients)) {
            const recipeItems = recipes[recipe].ingredients.map(i => i.toLowerCase().replace(/\s+/g, ''));

            console.log(`🆚 Сравниваем с рецептом: ${recipe} → ${recipeItems}`);

            if (JSON.stringify(recipeItems.sort()) === JSON.stringify(userItems.sort())) {
                foundRecipes.push(recipe);
            }
        }
    });

    // Если найдены рецепты, отправляем их пользователю
const imagePath = `./images/${recipe}.png`;

if (fs.existsSync(imagePath)) {
    bot.sendPhoto(chatId, imagePath, { caption: `Из ${userItems.join(', ')} можно скрафтить: ${recipe}` });
} else {
    console.error(`❌ Ошибка: файл ${imagePath} не найден!`);
    bot.sendMessage(chatId, `Из ${userItems.join(', ')} можно скрафтить: ${recipe}, но изображение отсутствует.`);
}

// Если ни один рецепт не найден
if (foundRecipes.length === 0) {
    console.log("❌ Не найдено совпадений.");
    bot.sendMessage(chatId, "Такого рецепта нет или он сложнее.");
}

// Запускаем таймер для Railway, чтобы бот не выключался
console.log("🤖 Бот запущен...");
setInterval(() => {
    console.log("✅ Бот работает...");
}, 60000); // Каждую минуту бот пишет в логи, что он жив
