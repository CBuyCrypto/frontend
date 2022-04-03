import axios from "axios";
import FormData from "form-data";
const API_KEY = "010c373b411c8676b904";
const SECRET =
  "186df95adbbf8574805e1967f6f800a039480d48445013b2eaf8d4f59b96f036";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZmJjZWU0NS0zNGZkLTQ3ZGYtYjU5ZC1mYzQxOTQwMGMxMGQiLCJlbWFpbCI6Imp1c3Rpbi5hbGV4YW5kZXIuaGVpbnpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjAxMGMzNzNiNDExYzg2NzZiOTA0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMTg2ZGY5NWFkYmJmODU3NDgwNWUxOTY3ZjZmODAwYTAzOTQ4MGQ0ODQ0NTAxM2IyZWFmOGQ0ZjU5Yjk2ZjAzNiIsImlhdCI6MTY0ODkxNjE3Nn0.lDRJp_a4ylZGPcvh3ccY5PE_FCUixpPFhY5PFo1BjmQ";
export async function uploadFile(localUri: string) {
  const blob = (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", localUri, true);
    xhr.send(null);
  })) as Blob;
  let data = new FormData();
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    regions: [
      {
        id: "FRA1",
        desiredReplicationCount: 1,
      },
      {
        id: "NYC1",
        desiredReplicationCount: 2,
      },
    ],
  });
  data.append("pinataOptions", pinataOptions);
  data.append("file", blob);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const resp = await axios.post(url, data, {
    maxBodyLength: 2e256,
    headers: {
      "Content-Type": `multipart/form-data`,
      pinata_api_key: API_KEY,
      pinata_secret_api_key: SECRET,
    },
  });

  return resp.data.IpfsHash;
}
