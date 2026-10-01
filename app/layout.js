import "@/src/styles.css";
import "@/src/content.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(site.origin),
  title: { default: "FlaskWholesale", template: "%s | FlaskWholesale" },
  description: "Custom stainless steel bottles, tumblers, mugs, shakers, jugs and can coolers with OEM, private-label and low-MOQ support.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
