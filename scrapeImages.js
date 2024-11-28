const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function scrapeImagesAndDownload(url, downloadFolder) {
  // Launch the Puppeteer browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the target URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Scrape all image URLs from the page
  const imageUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.map(img => img.src);
  });

  console.log(`Found ${imageUrls.length} images`);

  // Ensure download folder exists
  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  // Download each image
  for (const [index, imageUrl] of imageUrls.entries()) {
    try {
      const response = await axios({
        url: imageUrl,
        responseType: 'stream',
      });

      // Extract the image filename
      const filename = path.basename(new URL(imageUrl).pathname);
      const filePath = path.join(downloadFolder, `${index}-${filename}`);

      // Save the image to the folder
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      console.log(`Downloaded: ${filePath}`);

      // Wait for the write to finish
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error(`Failed to download ${imageUrl}:`, error.message);
    }
  }

  await browser.close();
}

scrapeImagesAndDownload('https://example.com', './images');
