import invariant from "tiny-invariant";

export function getEnv() {
  // everything here will also be accessible on the client
  //   process.env is accessible only on the server
  invariant(process.env.ADMIN_EMAIL, "ADMIN_EMAIL should be defined");
  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
