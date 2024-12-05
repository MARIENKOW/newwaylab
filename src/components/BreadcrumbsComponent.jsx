"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ADMIN_ROUTE } from "../configs/routerLinks";
import { StyledLink } from "./StyledLink";
import Link from "next/link";

export default function BreadcrumbsComponent({
   main = true,
   options,
   sx = {},
}) {
   const theme = useTheme();
   return (
      <Breadcrumbs
         maxItems={3}
         separator={<NavigateNextIcon color="secondary" fontSize="small" />}
         aria-label="breadcrumb"
         sx={sx}
      >
         {main && (
            <Link href={ADMIN_ROUTE}>
               <StyledLink>
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                  Головна
               </StyledLink>
            </Link>
         )}
         {options?.map((e, i, arr) =>
            i !== arr.length - 1 ? (
               <Link href={e?.link} key={new Date()}>
                  <StyledLink>
                     {e?.icon}
                     {e?.name}
                  </StyledLink>
               </Link>
            ) : (
               <Typography
                  key={new Date()}
                  color={theme.palette.secondary.light}
               >
                  {e?.name}
               </Typography>
            )
         )}
      </Breadcrumbs>
   );
}
