import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";
import { Contact } from "./pages/Contact";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";

// Application router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "events", Component: Events },
      { path: "events/:id", Component: EventDetail },
      { path: "contact", Component: Contact },
      { path: "shop", Component: Shop },
      { path: "shop/:id", Component: ProductDetail }
    ],
  },
]);