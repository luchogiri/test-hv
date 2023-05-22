//
const HOUSE_SERVICE_URL = process.env.REACT_APP_HOUSES_SERVICE_URL;
const HOUSES_PER_PAGE = 20; // default 20 houses per page
const HOUSES_MAX_RETRIES = 5; // max retries if error

type HousesRequest = {
  page: number;
}

type HousesResponse = {
  houses: House[];
  ok: boolean;
}

export interface House {
  address: string;
  homeowner: string;
  id: number;
  photoURL: string;
  price: number;
}

export default class HousesService {

  static async GetHouses({ page }: HousesRequest): Promise<House[]> {
    let retries = 1;
    let data: HousesResponse = { houses: [], ok: false };
    while (!data.ok && retries <= HOUSES_MAX_RETRIES) { // max retries or nothing
      console.log('LOG:GET:HousesService', HOUSE_SERVICE_URL, `page=${page}`, `try=${retries}`);
      data = await HousesService.FetchHouses({ page });
      retries++;
    }
    return data.houses;
  }

  private static async FetchHouses({ page }: HousesRequest): Promise<HousesResponse> {
    let data: HousesResponse = { houses: [], ok: false };
    try {
      const response = await fetch(`${HOUSE_SERVICE_URL}?page=${page}&per_page=${HOUSES_PER_PAGE}`);
      data = await response.json();
    } catch (error) {
      console.warn('LOG:GET:HousesService', HOUSE_SERVICE_URL, `page=${page}`, error);
    }
    return data;
  }
}