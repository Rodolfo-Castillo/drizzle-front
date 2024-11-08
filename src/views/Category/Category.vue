<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useCategoryStore } from "@/store/category";
import { useGeneralStore } from "@/store/general";
import { randomColor } from "@/utils/utils";
import Confirmation from "@/components/Confirmation.vue";
import { CategoryInterface } from "@/utils/interfaces";

const store = useCategoryStore();
const generalStore = useGeneralStore();
const category = ref(null);
let getCategory = <CategoryInterface>reactive({
    idCategory: null,
    categoryName: null,
});

const onClick = async (id: number) => {
    getCategory = store.categories.find(
        (c: CategoryInterface) => c.idCategory == id
    );
    category.value = getCategory.categoryName;
};

const handleClick = async () => {
    await store.saveCategory(category.value);
    clear();
};

const handleUpdate = async () => {
    getCategory.categoryName = category.value;
    await store.updateCategory(getCategory);
    clear();
};

const clear = () => {
    getCategory = {
        idCategory: null,
        categoryName: null,
    };
    category.value = null;
};

const confirmDelete = async () => {
    generalStore.openConfirmation("Esta seguro de eliminar esta categoria?");
};

const deleteCategory = async () => {
    await store.deleteCategory(getCategory);
    generalStore.closeConfirmation();
    clear();
};

onMounted(async () => {
    await store.listCategories();
});
</script>
<template>
    <div class="row justify-center q-pa-md">
        <q-chip
            v-for="(category, i) in store.categories"
            :key="i"
            class="glossy"
            :style="{ backgroundColor: randomColor() }"
            clickable
            @click="onClick(category.idCategory)"
            text-color="white"
            icon="event"
        >
            {{ category.categoryName }}
        </q-chip>
    </div>
    <div class="row justify-center">
        <div class="col-3"></div>
        <div class="col-3">
            <q-input
                square
                outlined
                dense
                v-model="category"
                label="Category"
                :disabled="store.isLoading"
                :rules="[
                    (val) =>
                        (val && val.length > 0) || 'Name must be filled in.',
                ]"
            >
                <template v-slot:prepend>
                    <q-icon name="list" />
                </template>
                <template v-slot:append>
                    <q-icon
                        style="cursor: pointer"
                        @click="clear"
                        name="close"
                    />
                </template>
            </q-input>
        </div>
        <div class="column items-end">
            <div class="col-3">
                <q-btn
                    :disable="getCategory.idCategory == null"
                    class="q-ml-md"
                    unelevated
                    flat
                    color="black"
                    label="Delete"
                    @click="confirmDelete"
                    :disabled="store.isLoading"
                />
            </div>
        </div>

        <div class="col-3">
            <q-btn
                v-if="getCategory.idCategory == null"
                class="q-ml-md"
                unelevated
                color="primary"
                label="Save"
                @click="handleClick"
                :disabled="store.isLoading"
            />
            <q-btn
                v-else
                class="q-ml-md"
                unelevated
                color="secondary"
                label="UPDATE"
                @click="handleUpdate"
                :disabled="store.isLoading"
            />
        </div>
        <Confirmation
            v-model="deleteCategory"
            @delete="
                async () => {
                    await deleteCategory();
                }
            "
        ></Confirmation>
    </div>
</template>
