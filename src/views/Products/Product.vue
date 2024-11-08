<script setup lang="ts">
import { onMounted } from "vue";
import { useProductStore } from "@/store/product";
import { useRouter } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
const router = useRouter();
const store = useProductStore();

onMounted(async () => {
    await store.listProducts();
});
</script>
<template>
    <div>
        <q-card class="my-card">
            <q-card-section class="bg-secondary text-white q-pa-sm">
                <div class="text-h6">Products</div>
            </q-card-section>
            <q-card-section>
                <q-breadcrumbs v-if="!store.isLoading">
                    <q-breadcrumbs-el
                        label="Home"
                        icon="home"
                        @click="router.push('/')"
                        style="cursor: pointer"
                    />
                    <q-breadcrumbs-el label="Products" />
                </q-breadcrumbs>
            </q-card-section>
            <q-card-section>
                <q-card>
                    <q-card-section align="right">
                        <q-btn
                            color="primary"
                            round
                            icon="add"
                            @click="router.push('/product')"
                            :disable="store.isLoading"
                        >
                            <q-tooltip> Add Product </q-tooltip>
                        </q-btn>
                    </q-card-section>
                    <div class="row">
                        <div
                            class="col-3 q-pl-md"
                            v-for="(product, i) in store.products"
                            :key="i"
                        >
                            <ProductCard
                                :id="product.idProduct"
                                :title="product.productName"
                                :image="product.image"
                                :category="product.categoryName"
                            />
                        </div>
                    </div>
                </q-card>
            </q-card-section>
        </q-card>
    </div>
</template>
