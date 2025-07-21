import type { Schema, Struct } from "@strapi/strapi";

export interface AboutFacts extends Struct.ComponentSchema {
  collectionName: "components_about_facts";
  info: {
    displayName: "Facts";
    icon: "lightbulb";
  };
  attributes: {
    icon: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationLinks extends Struct.ComponentSchema {
  collectionName: "components_navigation_links";
  info: {
    displayName: "links";
    icon: "bulletList";
  };
  attributes: {
    links: Schema.Attribute.Component<"navigation.nav-link", true>;
  };
}

export interface NavigationNavLink extends Struct.ComponentSchema {
  collectionName: "components_navigation_nav_links";
  info: {
    displayName: "NavLink";
    icon: "bulletList";
  };
  attributes: {
    label: Schema.Attribute.String;
    sublabel: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "about.facts": AboutFacts;
      "navigation.links": NavigationLinks;
      "navigation.nav-link": NavigationNavLink;
    }
  }
}
