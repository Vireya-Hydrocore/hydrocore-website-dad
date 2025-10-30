import { useState, useEffect } from "react";

type DropdownItem = { id: number; nome: string };

export function useDropdown<T extends DropdownItem>(fetchFunction: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFunction();
      setItems(Array.isArray(data) ? data : data ? [data] : []);
    };
    fetchData();
  }, [fetchFunction]);

  return items;
}

