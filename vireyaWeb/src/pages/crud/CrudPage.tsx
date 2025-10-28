import { useState, useMemo } from "react";
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
} from "@mui/material";
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
  titleField?: keyof T;
};

export default function CrudPage<T extends { id: number }>(
  props: CrudPageProps<T>
) {
  const {
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
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (item?: T) => {
    setEditingItem(item ?? null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const { form, formErrors, handleSubmit, handleChange } = useCrudForm({
    item: editingItem,
    onSave: async (formData) => {
      if (editingItem) {
        await atualizar(editingItem.id, formData as Omit<T, "id">);
      } else {
        await criar(formData as Omit<T, "id">);
      }
      closeModal();
      if (refetch) await refetch();
    },
    onCancel: closeModal,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [items, searchQuery]);

  if (loading) return <CircularProgress color="inherit" />;
  if (error)
    return <Typography color="error">Erro ao carregar dados.</Typography>;

  return (
    <div className="crud-page">
      <TextField
        className="search-field"
        label="Pesquisar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
      />

      <TableContainer component={Paper} className="crud-table">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(displayFields || {}).map((key) => (
                <TableCell key={key}>{displayFields?.[key] || key}</TableCell>
              ))}
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                {Object.keys(displayFields || {}).map((key) => (
                  <TableCell key={key}>
                    {String(item[key as keyof T])}
                  </TableCell>
                ))}
                <TableCell>
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
                      color="secondary"
                      size="small"
                      className="action-button"
                    >
                      Deletar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botão flutuante */}
      <Button className="add-button" onClick={() => openModal()}>
        +
      </Button>

      <Modal open={modalOpen} onClose={closeModal}>
        <div className="crud-modal">
          <h2>{editingItem ? `Editar ${title}` : `Novo ${title}`}</h2>
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
                      {options?.map((option: { id: number; nome: string }) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nome}
                        </MenuItem>
                      ))}
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
      </Modal>
    </div>
  );
}
