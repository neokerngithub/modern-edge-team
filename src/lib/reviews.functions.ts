import { createServerFn } from "@tanstack/react-start";
import { fetchGoogleReviews } from "./reviews.server";

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async () =>
  fetchGoogleReviews(),
);
