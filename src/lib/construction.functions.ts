import { createServerFn } from "@tanstack/react-start";
import { handleConstructionInquiry } from "./construction.server";

export const submitConstructionInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Invalid submission payload.");
    return data;
  })
  .handler(async ({ data }) => handleConstructionInquiry(data));
