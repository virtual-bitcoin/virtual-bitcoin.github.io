import { createPage, el } from "@common-module/static-site-generator";
import getLogo from "./components/getLogo.js";

export default function index() {
  return createPage(
    {
      title: "Virtual Bitcoin",
      description:
        "Virtual Bitcoin is Bitcoin implemented as a EVM smart contract",
      jsFiles: ["/bundle.js"],
      cssFiles: ["/bundle.css"],
      twitterHandle: "@virtual_bitcoin",
    },
    el(".layout", el("header", el("h1", getLogo(), "Virtual Bitcoin"))),
  );
}
