import { DefaultBodyType, rest } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
}

export const handlers = [
  rest.get<DefaultBodyType, LocationsPathParams, LocationsResult>(
    "/locations",
    (req, res, ctx) => {
      // Please implement filtering feature here
      const page = parseInt(req.url.searchParams.get("page") ?? "1");
      const locationName = req.url.searchParams.get("location_name");
      const robotId = req.url.searchParams.get("robot_id");
      const isStarred = req.url.searchParams.get("is_starred");

      console.log(page, locationName, robotId, isStarred);
      let filteredLocations = [...locations];
      if (!!locationName || !!robotId) {
        filteredLocations.filter(
          (loc) =>
            (locationName && loc.name.includes(locationName)) ||
            (robotId && loc.robot.id.includes(robotId))
        );
      }
      if (!!isStarred) {
        const location_ids = JSON.parse(
          sessionStorage.getItem("starred_location_ids") || "[]"
        );
        filteredLocations.filter((loc) => location_ids.includes(loc.id));
      }
      if (!!page) {
        filteredLocations = filteredLocations.slice((page - 1) * 6, page * 6);
      }

      const result: LocationsResult = {
        total_count: locations.length,
        locations: filteredLocations,
      };

      return res(ctx.status(200), ctx.json(result));
    }
  ),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify([...location_ids, req.body])
    );

    return res(ctx.status(204));
  }),
];
