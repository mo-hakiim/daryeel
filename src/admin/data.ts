import { useCallback, useEffect, useState } from "react";

import type { CategoryRow, ProductRow } from "@/data/store";
import { select } from "@/lib/supabase";

/** Fresh categories + products straight from Supabase (not the cached public catalogue). */
export function useAdminData() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [c, p] = await Promise.all([
        select<CategoryRow>("categories", "select=*&order=sort_order.asc,name.asc"),
        select<ProductRow>("products", "select=*&order=sort_order.asc,created_at.asc"),
      ]);
      setCategories(c);
      setProducts(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { categories, products, setProducts, setCategories, loading, error, reload };
}
