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
    el(
      ".layout",
      el(
        "header",
        el(
          "h1",
          el("a", getLogo(), el("span", "Virtual Bitcoin"), { href: "/" }),
        ),
        el(
          ".buttons",
          el("a.button.contained", "Mine VBTC", {
            href: "/mine-vbtc",
            target: "_blank",
          }),
        ),
      ),
      el(
        ".intro-view",
        el(
          "section.hero",
          { style: { backgroundImage: "url('/images/hero.jpg')" } },
          el(
            "video",
            { autoplay: true, loop: true, muted: true, playsInline: true },
            el("source", {
              src: "/videos/test.mp4",
              type: "video/mp4",
            }),
          ),
          el(
            ".content",
            el("h1", "Virtual Bitcoin"),
            el("p", "Bitcoin implemented as a EVM smart contract"),
          ),
        ),
      ),
    ),
  );
}
