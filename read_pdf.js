const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('c:/Users/HP/Documents/atobs-campaign-hub/public/PDF/MAGAZINE 3 Pg1- Pg25 JPEG SENT TO ATOBS.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("Number of pages:", data.numpages);
    console.log("Text content preview (first 500 chars):", data.text.substring(0, 500));
}).catch(function(error){
    console.error("Error parsing PDF:", error);
});
