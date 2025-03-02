const fs = require('fs');
const https = require('https');

const url = "https://raw.githubusercontent.com/89609630063/Minecraft-bot/main/recipes.json"; 
const outputPath = "recipes_converted.json";

function downloadAndConvert() {
    console.log("📥 Загружаем recipes.json с GitHub...");

    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const recipes = JSON.parse(data);
                const formattedRecipes = {};

                Object.keys(recipes).forEach(key => {
                    formattedRecipes[key] = {
                        ingredients: recipes[key].ingredients.map(i => i.toLowerCase().trim()),
                        image: recipes[key].image || null
                    };
                });

                fs.writeFileSync(outputPath, JSON.stringify(formattedRecipes, null, 4), 'utf-8');
                console.log("✅ recipes_converted.json обновлён!");
            } catch (error) {
                console.error("❌ Ошибка обработки JSON:", error.message);
            }
        });

    }).on("error", (error) => {
        console.error("❌ Ошибка загрузки файла:", error.message);
    });
}

// Обновляем JSON каждый час
setInterval(downloadAndConvert, 60 * 60 * 1000);
downloadAndConvert();