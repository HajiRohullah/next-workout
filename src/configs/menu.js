import { IconUsers } from "@tabler/icons-react";

const getMenuItems = () => {
  return [
    {
      icon: <IconUsers />,
      link: "/admin/user-list",
      label: "User List",
      color: 'blue'

    },
  ];
};

export default getMenuItems;