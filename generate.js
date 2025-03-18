import { generate } from "@common-module/static-site-generator";
import index from "./dist/pages/index.js";

await generate({
  "docs/index.html": index(),
});
