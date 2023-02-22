
const { BlobServiceClient } =  require("@azure/storage-blob");


const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

require("dotenv").config();
const key = process.env.key;
const endpoint = process.env.endpoint;


const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.connectionString
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.containerName
);







// Using for a ref : https://spin.atomicobject.com/2022/03/25/azure-storage-node-js/
//                   https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/blobclient?view=azure-node-latest#@azure-storage-blob-blobclient-downloadtofile
// Need to add for for file upload



// UPLOAD A FILE
  const uploadDocumentToAzure = async () => {
  const data = Buffer.from("sample.pdf", "base64");
  const blockBlobClient = containerClient.getBlockBlobClient("sample");
  const response = await blockBlobClient.uploadData(data, {
    blobHTTPHeaders: {
      blobContentType: "application/pdf",
    },
  });
  if (response._response.status !== 201) {
    throw new Error(
      `Error uploading document ${blockBlobClient.name} to container ${blockBlobClient.containerName}`
    );
  }
};

uploadDocumentToAzure()










///// DOWNLOAD

// const downloadDocumentFromAzure = async () => {
//   const blockBlobClient = containerClient.getBlockBlobClient("sample");
//   const response = await blockBlobClient.download(0);
//   if (response.readableStreamBody) {
//     return await streamToString(response.readableStreamBody);
//   } else {
//     throw new Error(
//       `Error downloading document ${blockBlobClient.name} from container ${blockBlobClient.containerName}`
//     );
//   }
// };

// const streamToString = async (
//   readableStream
// ) => {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     readableStream.on("data", (data) => {
//       chunks.push(data);
//     });
//     readableStream.on("end", () => {
//       resolve(Buffer.concat(chunks).toString("base64"));
//     });
//     readableStream.on("error", reject);
//   });
// };
//downloadDocumentFromAzure()


async function downloadBlobToFile(containerClient, blobName, fileNameWithPath) {

  const blobClient = await containerClient.getBlobClient(blobName);
  
  await blobClient.downloadToFile(fileNameWithPath);
  console.log(`download of ${blobName} success`);
}

downloadBlobToFile(containerClient ,"sample", "./sample.pdf")
// change from pdf to something else for now for testing


/////////////////////////// General Document Model ///////////////////////////////////////////////////////

// sample document
// const formUrl =
//   "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";

// async function main() {
//   const client = new DocumentAnalysisClient(
//     endpoint,
//     new AzureKeyCredential(key)
//   );

//   const poller = await client.beginAnalyzeDocumentFromUrl(
//     "prebuilt-document",
//     formUrl
//   );

//   const { keyValuePairs } = await poller.pollUntilDone();

//   if (!keyValuePairs || keyValuePairs.length <= 0) {
//     console.log("No key-value pairs were extracted from the document.");
//   } else {
//     console.log("Key-Value Pairs:");
//     for (const { key, value, confidence } of keyValuePairs) {
//       console.log("- Key  :", `"${key.content}"`);
//       console.log(
//         "  Value:",
//         `"${(value && value.content) || "<undefined>"}" (${confidence})`
//       );
//     }
//   }
// }

// main().catch((error) => {
//   console.error("An error occurred:", error);
//   process.exit(1);
// });
