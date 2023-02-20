const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
require("dotenv").config();
const key = process.env.key;
const endpoint = process.env.endpoint;
// sample document
const formUrl =
  "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";

async function main() {
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  const poller = await client.beginAnalyzeDocumentFromUrl(
    "prebuilt-layout",
    formUrl
  );

  const { pages, tables } = await poller.pollUntilDone();

  if (pages.length <= 0) {
    console.log("No pages were extracted from the document.");
  } else {
    console.log("Pages:");
    for (const page of pages) {
      console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
      console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
      console.log(`  ${page.lines.length} lines, ${page.words.length} words`);
    }
  }

  if (tables.length <= 0) {
    console.log("No tables were extracted from the document.");
  } else {
    console.log("Tables:");
    for (const table of tables) {
      console.log(
        `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
      );
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
