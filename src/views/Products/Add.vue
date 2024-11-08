<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProductStore } from "@/store/product";
import { useCategoryStore } from "@/store/category";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
// import FormSkeleton from "@/components/FormSkeleton.vue";
import { useRouter, useRoute } from "vue-router";
import { toBase64, Base64ToFile } from "@/utils/utils";
import { ProductInterface } from "@/utils/interfaces";
const router = useRouter();
const route = useRoute();

const store = useProductStore();
const categoryStore = useCategoryStore();

const productId = ref(0);
const productName = ref("");
const stock = ref(0);
const price = ref(0);
const image = ref(null);
const select = ref(null);

const getFormData = async () => {
    const formData = <ProductInterface>{
        idProduct: productId.value,
        productName: productName.value,
        price: +price.value,
        stock: +stock.value,
        categoryId: select.value.idCategory,
        image: await toBase64(image.value),
    };
    return formData;
};

const handleSave = async () => {
    const formData = await getFormData();
    await store.saveProduct(formData);
};

const handleUpdate = async () => {
    const formData = await getFormData();
    await store.updateProduct(formData);
};

onMounted(async () => {
    await categoryStore.listCategories();
    if (route.params.id) {
        await store.getProduct(+route.params.id);
        productId.value = store.product.idProduct;
        productName.value = store.product.productName;
        stock.value = store.product.stock;
        price.value = store.product.price;
        image.value = Base64ToFile(store.product.image, "example");
        select.value = categoryStore.categories.filter(
            (category) => category.idCategory == store.product.categoryId
        )[0];
    }
});
</script>
<template>
    <q-card class="my-card">
        <q-form :greedy="true" v-if="!store.isLoading">
            <q-card-section class="bg-secondary text-white q-pa-sm">
                <div class="text-h6">Form</div>
            </q-card-section>
            <q-card-section>
                <q-breadcrumbs>
                    <q-breadcrumbs-el
                        label="Home"
                        icon="home"
                        @click="router.push('/')"
                        style="cursor: pointer"
                    />
                    <q-breadcrumbs-el
                        label="Products"
                        @click="router.push('/products')"
                        style="cursor: pointer"
                    />
                    <q-breadcrumbs-el
                        :label="!route.params.id ? 'Add' : 'Edit'"
                    />
                </q-breadcrumbs>
            </q-card-section>
            <q-separator />
            <q-card-section class="row">
                <div class="col-3 text-weight-medium">Image</div>
                <div class="col-9">
                    <ProfilePhoto v-model="image" />
                    {{ image?.name }}
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row">
                <div class="col-3 text-weight-medium">Product</div>
                <div class="col-9 q-gutter-md">
                    <div class="row">
                        <div class="col-3">
                            <div class="text-caption">Product Name</div>
                            <q-input
                                outlined
                                v-model="productName"
                                label="Product Name"
                                dense
                                :disabled="store.isLoading"
                                hint="Product Name is required"
                                :rules="[
                                    (val) =>
                                        !!val || 'Product Name is required',
                                ]"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="text-caption">Stock</div>
                            <q-input
                                outlined
                                v-model="stock"
                                label="Stock"
                                mask="#######"
                                dense
                                :disabled="store.isLoading"
                                hint="Stock is required"
                                :rules="[
                                    (val) => !!val || 'Stock is required',
                                    (val) =>
                                        val > 0 ||
                                        'Stock invalid. Must be a number.',
                                ]"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <div class="text-caption">Price</div>
                            <q-input
                                outlined
                                v-model="price"
                                label="Price"
                                mask="######.##"
                                dense
                                :disabled="store.isLoading"
                                hint="Price is required"
                                :rules="[
                                    (val) => !!val || 'Price is required',
                                    (val) =>
                                        val > 0 ||
                                        'Price invalid. Must be a number.',
                                ]"
                            >
                                <template v-slot:prepend>$</template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row">
                <div class="col-3 text-weight-medium">Category</div>
                <div class="col-9 q-gutter-md">
                    <div class="row">
                        <q-select
                            outlined
                            v-model="select"
                            :options="categoryStore.categories"
                            label="Category"
                            dense
                            class="col-4"
                            option-value="idCategory"
                            option-label="categoryName"
                            :rules="[
                                (select) => !!select || 'Field is required',
                            ]"
                        />
                    </div>
                </div>
            </q-card-section>
            <q-separator class="q-my-md" />
            <q-card-actions class="row justify-end">
                <q-btn flat label="Cancel" :disabled="store.isLoading" />
                <q-btn
                    color="primary"
                    label="Save"
                    :disabled="store.isLoading"
                    @click="!route.params.id ? handleSave() : handleUpdate()"
                />
            </q-card-actions>
        </q-form>
        <!-- <FormSkeleton v-else /> -->
    </q-card>
</template>
