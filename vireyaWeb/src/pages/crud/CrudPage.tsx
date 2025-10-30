import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Fade,
  Backdrop,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCrudForm } from "../../hooks/crud/useCrudForm";
import { type FieldSchema } from "../../types/FieldSchema";
import "../../styles/crudPage.css";

type CrudPageProps<T extends { id: number }> = {
  title: string;
  items: T[];
  loading: boolean;
  error?: unknown;
  criar: (data: Omit<T, "id">) => Promise<void>;
  atualizar: (id: number, data: Omit<T, "id">) => Promise<void>;
  deletar?: (id: number) => Promise<void>;
  refetch?: () => Promise<void>;
  modal: Partial<Record<keyof T, FieldSchema>>;
  displayFields?: Record<string, string>;
};

export default function CrudPage<T extends { id: number }>({
  title,
  items,
  loading,
  error,
  criar,
  atualizar,
  deletar,
  refetch,
  modal,
  displayFields,
}: CrudPageProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = useCallback((item?: T) => {
    setEditingItem(item ?? null);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingItem(null);
  }, []);

  const { form, formErrors, handleSubmit, handleChange } = useCrudForm({
    item: editingItem,
    onSave: async (formData) => {
      if (editingItem)
        await atualizar(editingItem.id, formData as Omit<T, "id">);
      else await criar(formData as Omit<T, "id">);
      closeModal();
      if (refetch) await refetch();
    },
    onCancel: closeModal,
  });

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [items, searchQuery]);

  if (loading)
    return (
      <div className="crud-loader">
        <CircularProgress size={60} color="primary" />
      </div>
    );

  if (error)
    return (
      <Typography align="center" color="error" variant="h6" sx={{ mt: 4 }}>
        Erro ao carregar dados.
      </Typography>
    );

  return (
    <div className="crud-page">
      <TextField
        className="search-field"
        label="Pesquisar"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer component={Paper} className="crud-table">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(displayFields || {}).map((key) => (
                <TableCell key={key}>{displayFields?.[key] || key}</TableCell>
              ))}
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  {Object.keys(displayFields || {}).map((key) => (
                    <TableCell key={key}>
                      {String(item[key as keyof T])}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Button
                      onClick={() => openModal(item)}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="action-button"
                    >
                      Editar
                    </Button>
                    {deletar && (
                      <Button
                        onClick={() => deletar(item.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                        className="action-button"
                      >
                        Deletar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.keys(displayFields || {}).length + 1}
                  align="center"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab
        color="primary"
        aria-label="add"
        className="add-button"
        onClick={() => openModal()}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={modalOpen}>
          <div className="crud-modal">
            <Typography variant="h6" gutterBottom>
              {editingItem ? `Editar ${title}` : `Novo ${title}`}
            </Typography>

            <form onSubmit={handleSubmit}>
              {Object.entries(modal).map(([key, { label, type, options }]) => {
                const fieldKey = key as keyof T;
                const value = form[fieldKey] ?? "";

                if (type === "dropdown") {
                  return (
                    <FormControl fullWidth margin="normal" key={key}>
                      <InputLabel>{label}</InputLabel>
                      <Select
                        value={String(value)}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        error={!!formErrors[fieldKey]}
                      >
                        {options?.map(
                          (option: { id: number; nome: string }) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.nome}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      {formErrors[fieldKey] && (
                        <Typography color="error">
                          {formErrors[fieldKey]}
                        </Typography>
                      )}
                    </FormControl>
                  );
                }

                return (
                  <TextField
                    key={key}
                    label={label}
                    type={
                      type === "date"
                        ? "date"
                        : type === "number"
                        ? "number"
                        : "text"
                    }
                    value={String(value)}
                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={
                      type === "date" ? { shrink: true } : undefined
                    }
                    error={!!formErrors[fieldKey]}
                    helperText={formErrors[fieldKey]}
                  />
                );
              })}

              <div className="modal-buttons">
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
                <Button onClick={closeModal} variant="outlined">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
