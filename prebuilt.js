const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
require("dotenv").config();
const key = process.env.key;
const endpoint = process.env.endpoint;

async function main() {
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );



  const invoiceUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf";




  const poller = await client.beginAnalyzeDocumentFromUrl(
    "prebuilt-invoice",
    invoiceUrl
  );

  const whatever = await poller.pollUntilDone();
  console.log(whatever) 
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
