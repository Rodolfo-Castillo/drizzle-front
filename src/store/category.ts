// Utilities
import { defineStore } from "pinia";
import { HttpPost, HttpGet, HttpPut, HttpDelete } from "@/utils/http";
import { CategoryInterface } from "@/utils/interfaces";

const route = "category";
export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: [],
        isLoading: false,
        msg: "",
        error: false,
    }),
    actions: {
        async saveCategory(categoryName:string) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPost(`${route}`, { categoryName });
                this.$state.categories = [...this.categories, res.data];
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async listCategories() {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}`,{});
                if (res.data.length != 0) {
                    this.$state.categories = res.data;
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async updateCategory(formData:CategoryInterface) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPut(`${route}/${formData.idCategory}`, formData);
                const data = res.data.updateCategory;
                this.$state.categories.map((c:CategoryInterface) => {
                    if (+c.idCategory === +formData.idCategory) {
                        c.categoryName = data.name;
                    }
                });
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async deleteCategory(formData:CategoryInterface) {
            try {
                this.$state.isLoading = true;
                const res = await HttpDelete(
                    `${route}/${formData.idCategory}`,
                    formData
                );
                const data = res.data;
                const categorias = this.$state.categories;
                this.$state.categories = categorias.filter(
                    (categorias:CategoryInterface) => categorias.idCategory != data.idCategory
                );
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
    },
});
