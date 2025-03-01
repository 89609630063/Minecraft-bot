const fs = require('fs');

console.log("🔄 Обновляем JSON...");
const jsonData = { updated: new Date().toISOString() }; // Тут можешь добавить обновление данных

fs.writeFileSync('recipes_converted.json', JSON.stringify(jsonData, null, 2));
console.log("✅ JSON обновлён!");
