"use client";

import { List } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { enqueueSnackbar } from "notistack";
import DragAndDrop from "../../Form/DragAndDrop";
import { StyledAlert } from "../../form/StyledAlert";
import { StyledLoadingButton } from "../../form/StyledLoadingButton";
import { StyledTextField } from "../../form/StyledTextField";
import Grid from "@mui/material/Grid2";
import TextEditor from "./TextEditor/TextEditor";
import {
   POST_BODY_MAX_LENGTH,
   POST_BODY_MIN_LENGTH,
   POST_TITLE_MAX_LENGTH,
   POST_TITLE_MIN_LENGTH,
} from "../../../configs/validateConfig";
import { useState } from "react";

const BlogForm = ({ data = {}, onSubmit, btn = "Опублікувати" }) => {
   const [body, setBody] = useState(data?.body || null);

   const {
      handleSubmit,
      register,
      setError,
      clearErrors,
      control,
      resetField,
      setValue,
      formState: { errors, isValid, isSubmitting, isDirty, dirtyFields },
   } = useForm({
      mode: "onChange",
      defaultValues: { ...data },
   });

   const handleChange = () => {
      clearErrors("root");
   };

   return (
      <form
         onChange={handleChange}
         style={{ display: "flex", flexDirection: "column", gap: "15px" }}
         onSubmit={handleSubmit(onSubmit(body, setError, dirtyFields))}
      >
         <Grid container spacing={{ xs: 3, md: 2 }} columns={10}>
            <Grid
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 200,
               }}
               size={{ xs: 10, md: 4 }}
            >
               <DragAndDrop
                  clearErrors={clearErrors}
                  setError={setError}
                  control={control}
                  name={"img"}
                  rules={{
                     required: "required field",
                  }}
                  sx={{ borderRadius: "10px" }}
                  resetField={resetField}
                  setValue={setValue}
                  imgdefault={data?.img?.path}
               />
            </Grid>
            <Grid size={{ xs: 10, md: 6 }}>
               <List sx={{ flex: { xs: " 0 0 100%", md: "1" } }}>
                  <StyledTextField
                     errors={errors}
                     register={register("title", {
                        required: "обов'язкове поле",
                        maxLength: {
                           value: POST_TITLE_MAX_LENGTH,
                           message: `максимум ${POST_TITLE_MAX_LENGTH} символів`,
                        },
                        minLength: {
                           value: POST_TITLE_MIN_LENGTH,
                           message: `мінімум ${POST_TITLE_MIN_LENGTH} символів`,
                        },
                     })}
                     options={{ fullWidth: true }}
                     label="Заголовок"
                  />
               </List>
            </Grid>
            <Grid size={{ xs: 10 }}>
               <Controller
                  control={control}
                  name={"body"}
                  rules={{
                     required: "обов'язкове поле",
                     maxLength: {
                        value: POST_BODY_MAX_LENGTH,
                        message: `максимум ${POST_BODY_MAX_LENGTH} символів`,
                     },
                     minLength: {
                        value: POST_BODY_MIN_LENGTH,
                        message: `мінімум ${POST_BODY_MIN_LENGTH} символів`,
                     },
                  }}
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextEditor
                        onChange={onChange}
                        error={error}
                        value={value}
                        setBody={setBody}
                     />
                  )}
               />
            </Grid>
         </Grid>
         {errors?.root?.server && (
            <StyledAlert severity="error" variant="filled" hidden={true}>
               {errors?.root?.server?.message}
            </StyledAlert>
         )}
         <StyledLoadingButton
            loading={isSubmitting}
            endIcon={<DoubleArrowIcon />}
            disabled={!isValid || !isDirty}
            type="submit"
            sx={{ mt: errors?.root?.server ? 0 : 3 }}
            variant="contained"
         >
            {btn}
         </StyledLoadingButton>
      </form>
   );
};

export default BlogForm;
