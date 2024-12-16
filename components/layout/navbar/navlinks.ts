export interface NavlinksType {
  heading: string;
  subheading?: { name: string; link: string }[];
  link?: string;
}

export const Navlinks: NavlinksType[] = [
  {
    heading: "School",
    subheading: [
      { name: "View All", link: "/schools" },
      { name: "Add New", link: "/schools/addnew" },
    ],
  },
  {
    heading: "Students",
    link: "/students",
  },
  {
    heading: "Profile",
    link: "/profile",
  },
];
