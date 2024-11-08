// Utilities
import { defineStore } from "pinia";
import { HttpPost, HttpGet, HttpPut, HttpDelete } from "@/utils/http";
import { ProductInterface } from "@/utils/interfaces";

const route = "product";
export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        product:<ProductInterface>{},
        isLoading: false,
        msg: "",
        error: false,
    }),
    actions: {
        async saveProduct(formData:ProductInterface) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPost(`${route}`, formData);
                this.$state.products = [...this.products, res.data];
                window.location.href = "/products";
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async listProducts() {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}s`,{});
                if (res.data.length != 0) {
                    this.$state.products = res.data.map((element:ProductInterface) => {
                        return {
                            idProduct: element.idProduct,
                            productName: element.productName,
                            image: element.image,
                            categoryName: element.categoryName,
                        };
                    });
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async getProduct(id:number) {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}/${id}`, {});
                this.$state.product = res.data;
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async updateProduct(formData:ProductInterface) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPut(`${route}/${formData.idProduct}`, formData);
                const data = res.data.updateProduct;
                this.$state.products.map((c:ProductInterface) => {
                    if (+c.idProduct === +formData.idProduct) {
                        c = data;
                    }
                });
                window.location.href = "/products";
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async deleteProduct(id:number) {
            try {
                this.$state.isLoading = true;
                const res = await HttpDelete(`${route}/${id}`,{});
                const data = res.data;
                const productos = this.$state.products;
                this.$state.products = productos.filter(
                    (producto:ProductInterface) => producto.idProduct != data.idProduct
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
