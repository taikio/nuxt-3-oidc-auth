import { sendError, createError } from "h3";

export default defineEventHandler((event) => {
  const authorizationHeader = getHeader(event, "authorization");
  const config = useRuntimeConfig()
	const apiKey = config.public.apiKey

  if (
    !authorizationHeader ||
    authorizationHeader !== apiKey
  ) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Missing API key" })
    );
  }

  const runtimeConfig = useRuntimeConfig();

  return runtimeConfig;
});
