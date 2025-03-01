const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf-8'));

const canvasSize = 300;
const cellSize = 80;
const gap = 10;

async function drawRecipe(recipeName, recipe) {
    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#252525';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const images = await Promise.all(
        recipe.ingredients.map(async (item, index) => {
            const imgPath = path.join(__dirname, 'icons', `${item}.png`);
            try {
                const img = await loadImage(imgPath);
                return { img, index };
            } catch (error) {
                console.log(`❌ Ошибка загрузки ${imgPath}`);
                return null;
            }
        })
    );

    images.forEach(({ img, index }) => {
        if (img) {
            const x = (index % 3) * (cellSize + gap);
            const y = Math.floor(index / 3) * (cellSize + gap);
            ctx.drawImage(img, x, y, cellSize, cellSize);
        }
    });

    const resultImgPath = path.join(__dirname, 'icons', `${recipeName}.png`);
    try {
        const resultImg = await loadImage(resultImgPath);
        ctx.drawImage(resultImg, canvasSize - cellSize - gap, canvasSize / 2 - cellSize / 2, cellSize, cellSize);
    } catch (error) {
        console.log(`❌ Ошибка загрузки ${resultImgPath}`);
    }

    const outputPath = path.join(__dirname, 'images', `${recipeName}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Изображение сохранено: ${outputPath}`);
}

async function generateAllRecipes() {
    for (const recipeName in recipes) {
        await drawRecipe(recipeName, recipes[recipeName]);
    }
}

generateAllRecipes();