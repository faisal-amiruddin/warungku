import { useState, useCallback } from "react";
import menuService from "../services/menuServices";

export function useMenu() {
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await menuService.getAll();
            setMenuList(data);
        } catch (error) {
            setError(error);
            console.error('Gagal fetch menu: ', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createMenu = useCallback(async (menuData) => {
        try {
            const newMenu = await menuService.create(menuData);
            setMenuList(prev => [...prev, newMenu]);
            return newMenu;
        } catch (error) {
            setError(error);
            console.error('Gagal create menu: ', error);
        }
    }, []);

    const updateMenu = useCallback(async (id, menuData) => {
        try {
            const updated = await menuService.update(id, menuData);
            setMenuList(prev => prev.map(menu => menu._id === id ? updated : menu));
            return updated;
        } catch (error) {
            setError(error);
            console.error('Gagal update menu: ', error);
        }
    }, []);

    const deleteMenu = useCallback(async (id) => {
        try {
            await menuService.delete(id)
            setMenuList(prev => prev.filter(m => m._id !== id))
        } catch (error) {
            setError(error);
            console.error('Gagal delete menu: ', error);
        }
    }, []);

    const getMenu = useCallback(async (id) => {
        try {
            return await menuService.getById(id)
        } catch (error) {
            setError(error);
            console.error('Gagal ambil detail menu: ', error);
        }
    }, []);
    
  return {
    menuList,
    loading,
    error,
    fetchAll,
    createMenu,
    updateMenu,
    deleteMenu,
    getMenu,
  }
}