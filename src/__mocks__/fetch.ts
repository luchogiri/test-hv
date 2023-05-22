
const HOUSE_SERVICE_URL = process.env.REACT_APP_HOUSES_SERVICE_URL;

// ok response

const housesOkResponse = {
  "houses": [
    {
      "id": 0,
      "address": "Mocked address in Hill Street Antioch, TN 37013",
      "homeowner": "Mocked Homeowner",
      "price": 111111,
      "photoURL": "https://image.shutterstock.com/image-photo/big-custom-made-luxury-house-260nw-374099713.jpg"
    },
    {
      "id": 1,
      "address": "495 Marsh Road Portage, IN 46368",
      "homeowner": "Rheanna Walsh",
      "price": 161856,
      "photoURL": "https://media-cdn.tripadvisor.com/media/photo-s/09/7c/a2/1f/patagonia-hostel.jpg"
    }
  ],
  "ok": true
};

const housesErrorResponse = {
  "message": "Service Unavailable",
  "ok": false
};


global.fetchMockOk = (url: string) => {
  switch (url) {
      case `${HOUSE_SERVICE_URL}?page=1&per_page=20`: {
          return {
              ok: true,
              status: 200,
              json: async () => housesOkResponse,
          };
      }
      default: {
          throw new Error(`Unhandled request: ${url}`);
      }
  }
}

global.fetchMockError = (url: string) => {
  switch (url) {
      case `${HOUSE_SERVICE_URL}?page=1&per_page=20`: {
          return {
              ok: false,
              status: 503,
              json: async () => housesErrorResponse,
          };
      }
      default: {
          throw new Error(`Unhandled request: ${url}`);
      }
  }
}

export {}