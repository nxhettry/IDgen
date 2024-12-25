export interface NavlinksType {
  heading: string;
  subheading?: { name: string; link: string }[];
  link?: string;
}

export const Navlinks: NavlinksType[] = [
  {
    heading: "Home",
    link: "/",
  },
  {
    heading: "School",
    link: "/schools",
  },
  {
    heading: "Students",
    link: "/students",
  },
];
