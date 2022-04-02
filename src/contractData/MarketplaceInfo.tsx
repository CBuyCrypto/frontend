const marketplaceInfo = {
  address: "0x676CBb76dA514aE68b91c0ce5CcB1876aC3b291C",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "contractAddr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "itemId",
          type: "uint256",
        },
      ],
      name: "newEscrow",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "ipfsHash",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "sold",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "itemId",
          type: "uint256",
        },
      ],
      name: "newListing",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "itemId",
          type: "uint256",
        },
      ],
      name: "deactivateListing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "ipfsHash",
          type: "string",
        },
      ],
      name: "newItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "listingId",
          type: "uint256",
        },
      ],
      name: "purchase",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "listingId",
          type: "uint256",
        },
      ],
      name: "releaseEscrow",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_cUSDAddr",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "listingId",
          type: "uint256",
        },
      ],
      name: "getListingInfo",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "ipfsHash",
              type: "string",
            },
            {
              internalType: "enum Marketplace.ListingStatus",
              name: "status",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "escrowAddr",
              type: "address",
            },
          ],
          internalType: "struct Marketplace.Listing",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getListings",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "ipfsHash",
              type: "string",
            },
            {
              internalType: "enum Marketplace.ListingStatus",
              name: "status",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "escrowAddr",
              type: "address",
            },
          ],
          internalType: "struct Marketplace.Listing[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getUserListings",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "ipfsHash",
              type: "string",
            },
            {
              internalType: "enum Marketplace.ListingStatus",
              name: "status",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "escrowAddr",
              type: "address",
            },
          ],
          internalType: "struct Marketplace.Listing[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "wallet",
          type: "address",
        },
      ],
      name: "getUserListings",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "ipfsHash",
              type: "string",
            },
            {
              internalType: "enum Marketplace.ListingStatus",
              name: "status",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "itemId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "escrowAddr",
              type: "address",
            },
          ],
          internalType: "struct Marketplace.Listing[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export default marketplaceInfo;
