import { createServerFn } from "@tanstack/react-start";
import { handleContactInquiry } from "./contact.server";

export const submitContactInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Invalid submission payload.");
    return data;
  })
  .handler(async ({ data }) => handleContactInquiry(data));
