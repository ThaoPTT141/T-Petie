const http = require('http');
const fs = require('fs');

http.get('http://localhost:8080/uu-dai.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    
    // Check if products data contains 49 products
    const match = data.match(/const PRODUCTS_DATA = (\[[\s\S]*?\]);/);
    if (!match) {
      console.error('PRODUCTS_DATA not found in HTML response');
      process.exit(1);
    }
    
    const products = JSON.parse(match[1]);
    console.log(`Successfully verified ${products.length} products in uu-dai.html!`);
    
    // Check that all image paths exist
    let missingImages = 0;
    for (const p of products) {
      if (!fs.existsSync(p.image)) {
        console.error(`Image missing for product #${p.id} (${p.name}): ${p.image}`);
        missingImages++;
      }
      if (!p.salePrice || !p.originalPrice) {
        console.error(`Invalid pricing for product #${p.id} (${p.name}): sale=${p.salePrice}, orig=${p.originalPrice}`);
      }
      if (p.salePrice > p.originalPrice) {
        console.error(`Sale price higher than original for #${p.id}: ${p.salePrice} > ${p.originalPrice}`);
      }
    }
    
    if (missingImages === 0) {
      console.log('All 49 product images exist on disk and have valid, verified price tags!');
    } else {
      console.error(`Found ${missingImages} missing images.`);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Request failed:', err.message);
  process.exit(1);
});
