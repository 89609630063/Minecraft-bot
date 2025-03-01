const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN; // Используем ENV-переменную для Railway
const bot = new TelegramBot(token, { polling: true });

const recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf-8'));

bot.onText(/(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const items = match[1].toLowerCase().split(',').map(i => i.trim());

    let foundRecipes = [];

    // Добавляем проверку, чтобы recipe был определён
    Object.keys(recipes).forEach(recipe => {
        if (recipes[recipe] && Array.isArray(recipes[recipe].ingredients)) {
            if (JSON.stringify(recipes[recipe].ingredients.sort()) === JSON.stringify(items.sort())) {
                foundRecipes.push(recipe);
            }
        }
    });

    if (foundRecipes.length > 0) {
        for (let recipe of foundRecipes) {
            const imagePath = `images/${recipe}.png`;
            bot.sendPhoto(chatId, imagePath, { caption: `Из ${items.join(', ')} можно скрафтить: ${recipe}` });
        }
    } else {
        bot.sendMessage(chatId, "Такого рецепта нет или он сложнее.");
    }
});

console.log("🤖 Бот запущен...");
