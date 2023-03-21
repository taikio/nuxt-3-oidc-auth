import { sendError, createError } from "h3";

export default defineEventHandler((event) => {
  const authorizationHeader = getHeader(event, "authorization");

  if (
    !authorizationHeader ||
    authorizationHeader !== "c7d429c1-0a07-484b-ad8f-941df0634972"
  ) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Missing API key" })
    );
  }

  const runtimeConfig = useRuntimeConfig();

  return runtimeConfig;
});
