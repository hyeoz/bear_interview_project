import axios from "axios";
import { Location } from "../mocks/db";

const API = axios.create({
  baseURL: "/",
});

export type LocationsDataType = {
  total_count: number;
  locations: Location[];
};

const getAllLocationsData = async () => {
  const res = await API.get<LocationsDataType>("locations");
  if (res.status === 200) {
    return {
      status: res.status,
      data: res.data,
    };
  } else {
    return {
      status: res.status,
      statusText: res.statusText,
      data: { total_count: 0, locations: [] } as LocationsDataType,
    };
  }
};

const getLocationsData = async ({
  page,
  locationName,
  robotId,
  isStarred,
}: {
  page: number;
  locationName?: string;
  robotId?: string;
  isStarred?: boolean;
}) => {
  const res = await API.get<LocationsDataType>("locations", {
    params: { page, locationName, robotId, isStarred },
  });
  if (res.status === 200) {
    return {
      status: res.status,
      data: res.data,
    };
  } else {
    return {
      status: res.status,
      statusText: res.statusText,
      data: { total_count: 0, locations: [] } as LocationsDataType,
    };
  }
};

const getLocationIdsData = async () => {
  const res = await API.get<{ location_ids: string[] }>("starred_location_ids");
  return res;
};

const putLocationIdData = async (id: number) => {
  await API.put("starred_location_ids", id);
};

export {
  getAllLocationsData,
  getLocationsData,
  getLocationIdsData,
  putLocationIdData,
};
