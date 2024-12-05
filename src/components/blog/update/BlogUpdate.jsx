"use client";

import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import ErrorElement from "../../ErrorElement";
import { enqueueSnackbar } from "notistack";
import { useParams, useRouter } from "next/navigation";
import { Empty } from "../../Empty";
import BlogService from "../../../services/BlogService";
import BlogForm from "../form/BlogForm";
import { ADMIN_BLOG_ROUTE, BLOG_ROUTE } from "../../../configs/routerLinks";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import BreadcrumbsComponent from "../../BreadcrumbsComponent";

const blog = new BlogService();

export default function BlogUpdate() {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState([]);
   const [error, setError] = useState(false);
   const { id } = useParams();

   async function getLine() {
      try {
         const { data } = await blog.getById(id);
         setData(data);
      } catch (error) {
         setError(error);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      getLine();
   }, []);

   if (loading) return <Loading />;

   if (error) return <ErrorElement message={error} />;

   if (!data || data?.length === 0) return <Empty />;

   const router = useRouter();

   const onSubmit = (body, setError) => async (data) => {
      try {
         await blog.update(id, { ...data, body });
         enqueueSnackbar(`Блог відредаговано!`, {
            variant: "success",
         });
         router.push(ADMIN_BLOG_ROUTE);
      } catch (e) {
         console.error(e);
         if (e?.response?.status === 400) {
            const errors = e?.response?.data || {};
            for (let key in errors) {
               setError(key, { type: "server", message: errors[key] });
            }
            return;
         }
         setError("root.server", {
            type: "server",
            message: "Упс! щось пішло не так, спробуйте пізніше",
         });
      }
   };

   return (
      <>
         <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            flexWrap={"wrap"}
         >
            <BreadcrumbsComponent
               options={[
                  { name: "Блог", link: ADMIN_BLOG_ROUTE },
                  { name: "Редагувати" },
               ]}
            />
            <Link target="_blank" href={BLOG_ROUTE + "/" + data?.id}>
               <Button fullWidth variant="contained">
                  переглянути
               </Button>
            </Link>
         </Box>
         <Box mt={5}>
            <BlogForm btn={"Змінити"} data={data} onSubmit={onSubmit} />
         </Box>
      </>
   );
}
