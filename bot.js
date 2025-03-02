const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const https = require('https');

const token = process.env.BOT_TOKEN; 
const bot = new TelegramBot(token, { polling: true });

const jsonPath = path.join(__dirname, 'recipes_converted.json');
const imagesPath = path.join(__dirname, 'images');

// ✅ Загружаем JSON
if (!fs.existsSync(jsonPath)) {
    console.log("⚠ Файл recipes_converted.json не найден! Запусти update_json.js.");
    process.exit(1);
}

let recipes = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
console.log("✅ Recipes загружены!");

// 📩 Обработка сообщений от пользователя
bot.onText(/(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userItems = match[1].toLowerCase().replace(/\s+/g, '').split(',').map(i => i.trim());

    console.log("📩 Входные данные от пользователя:", userItems);

    let foundRecipe = Object.keys(recipes).find(key => 
        JSON.stringify(recipes[key].ingredients.sort()) === JSON.stringify(userItems.sort())
    );

    if (foundRecipe) {
        const recipe = recipes[foundRecipe];
        const imagePath = path.join(imagesPath, path.basename(recipe.image));

        if (recipe.image) {
            if (!fs.existsSync(imagePath)) {
                console.log(`📷 Изображение ${recipe.image} отсутствует. Скачиваем...`);
                downloadImage(recipe.image, imagePath, () => {
                    bot.sendPhoto(chatId, imagePath, { caption: `Можно скрафтить: ${foundRecipe}` });
                });
            } else {
                bot.sendPhoto(chatId, imagePath, { caption: `Можно скрафтить: ${foundRecipe}` });
            }
        } else {
            bot.sendMessage(chatId, `Можно скрафтить: ${foundRecipe}, но изображение отсутствует.`);
        }
    } else {
        bot.sendMessage(chatId, "❌ Не найдено совпадений.");
    }
});

// 📷 Функция для скачивания изображений
function downloadImage(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => {
            file.close(callback);
        });
    }).on("error", (error) => {
        console.error(`❌ Ошибка загрузки изображения ${url}:`, error.message);
    });
}

console.log("🤖 Бот запущен...");
setInterval(() => console.log("✅ Бот работает..."), 60000);