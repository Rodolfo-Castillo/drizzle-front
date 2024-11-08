<template>
    <div class="card">
        <form @submit.prevent="login">
            <h2>Login</h2>

            <div class="input-group">
                <label for="email">Correo</label>
                <input
                    type="text"
                    id="email"
                    v-model="email"
                    :disable="authStore.isLoading"
                    required
                />
            </div>
            <div class="input-group">
                <label for="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    :disable="authStore.isLoading"
                    required
                />
            </div>
            <span v-if="authStore.error" color="red">Datos Incorrectos</span>
            <button type="submit" :disable="authStore.isLoading">
                Iniciar Sesión
            </button>
            <div>
                <a href="/register">Registrar Usuario</a>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const email = ref<string>("");
const password = ref<string>("");
// const rememberMe = ref<Boolean>(false)
const authStore = useAuthStore();

const login = async () => {
    // Lógica de autenticación
    try {
        await authStore.login({ email: email.value, password: password.value });
    } catch (e: any) {
        console.error("Error al iniciar sesión:", e);
    }
    // console.log('Login attempt:', username.value, password.value);
};
</script>

<style scoped>
.card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 90%;
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

form {
    display: flex;
    flex-direction: column;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 20px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #527c7b;
}

input:checked + .slider:before {
    transform: translateX(20px);
}

button {
    background-color: #527c7b;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #203036;
}

/* Responsividad */
@media (min-width: 600px) {
    .card {
        width: 60%;
    }
}

@media (min-width: 768px) {
    .card {
        width: 40%;
    }
}

@media (min-width: 992px) {
    .card {
        width: 30%;
    }
}
</style>
