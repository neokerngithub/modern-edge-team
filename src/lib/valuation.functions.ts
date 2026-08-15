import { createServerFn } from "@tanstack/react-start";
import { handleValuationRequest } from "./valuation.server";

export const submitValuationRequest = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Invalid submission payload.");
    return data;
  })
  .handler(async ({ data }) => handleValuationRequest(data));
