# **Image Scraper with Puppeteer**  

This project is a simple web scraper built with Puppeteer that extracts all image URLs from a given webpage and downloads the images to a local directory. It uses Puppeteer for web scraping and Axios for downloading the images.

## **Features**  
- Extracts all `img` elements from a webpage.  
- Downloads images to a specified local folder.  
- Handles both absolute and relative image URLs.  

## **Prerequisites**  
- Node.js installed  

## **Installation**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/ravikiran8844/Image-Scraper.git  
   cd Image-Scraper
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  

## **Usage**  
1. Edit `scrapeImages.js` to change the target URL or download folder.  
2. Run the script:  
   ```bash  
   node scrapeImages.js  
   ```  

## **Dependencies**  
- Puppeteer  
- Axios  

## **License**  
This project is licensed under the MIT License.  

---

Feel free to modify the script for personal use or extend it for other scraping tasks!