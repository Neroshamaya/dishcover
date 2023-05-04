import { AppBar } from "@mui/material"
import React from "react";

const pages = [{
  title: 'Create',
  href: '/create'
}, {
  title: 'Explore',
  href: '/explore'
}]

export default function Menu() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
return <

}
