import React, { useState } from "react"
import {
  Grid,
  Paper,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import {
  DataGrid,
  GridColDef,
  GridLoadingOverlay,
  GridNoRowsOverlay,
  GridToolbar,
  GridCellParams,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid"
import Swal, { SweetAlertResult } from "sweetalert2"
import moment from "moment"

import { Genre, genreData } from "../../config/constants"
import { genreApi, useFetchGenresQuery } from "../../features/genre/genreApi"

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 200,
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      moment(params.value).format("DD-MM-yyyy h:mm:ss a"),
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 200,
    valueFormatter: (params: GridValueFormatterParams<any>) =>
      moment(params.value).format("DD-MM-yyyy h:mm:ss a"),
  },
]

const GenreAdmin: React.FC = () => {
  const [itemId, setItemId] = useState<string>("")
  const [formData, setFormData] = useState<Genre>(genreData)
  const [triggerCreate, createResult] =
    genreApi.endpoints.createGenre.useLazyQuery()
  const [triggerUpdate, updateResult] =
    genreApi.endpoints.updateGenre.useLazyQuery()
  const [triggerDelete, deleteResult] =
    genreApi.endpoints.deleteGenre.useLazyQuery()
  const { data, isFetching, refetch } = useFetchGenresQuery("")

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) =>
    Swal.fire({
      title: "Delete this item?",
      text: "This action cannot be undone",
      icon: "question",
      showCancelButton: true,
    }).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        triggerDelete(event.currentTarget.id)
      }
    })

  const handleCellClick = (params: GridCellParams<any, any, any>) => {
    setItemId((prevState) => params.id.toString())

    const genre = data?.find((item) => item._id === params.id)

    if (!genre) return

    setFormData((prevState) => ({
      name: genre.name,
      description: genre.description,
    }))
  }

  const actions: GridColDef[] = [
    {
      field: "id",
      headerName: "Delete",
      renderCell: (params: GridRenderCellParams<any, any, any>) => (
        <Button
          id={params.value}
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      ),
    },
  ]

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData((prevState) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (itemId) {
      triggerUpdate({ id: itemId, formData: formData })
      setFormData((prevState) => genreData)
      refetch()

      return
    }

    triggerCreate(formData)
    setFormData((prevState) => genreData)
    refetch()
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Box component="form" onSubmit={handleSubmit} p={3}>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom>
                Genre
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ height: 400, p: 3 }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: GridLoadingOverlay,
              NoRowsOverlay: GridNoRowsOverlay,
            }}
            rows={!data ? [] : data.map((item) => ({ ...item, id: item._id }))}
            columns={[...columns, ...actions]}
            loading={isFetching}
            onCellClick={handleCellClick}
          />
        </Paper>
      </Grid>
      <Snackbar
        open={createResult.isSuccess}
        autoHideDuration={3000}
        message={createResult.data?.message}
      />
      <Snackbar
        open={updateResult.isSuccess}
        autoHideDuration={3000}
        message={updateResult.data?.message}
      />
      <Snackbar
        open={deleteResult.isSuccess}
        autoHideDuration={3000}
        message={deleteResult.data?.message}
      />
    </>
  )
}

export default GenreAdmin
