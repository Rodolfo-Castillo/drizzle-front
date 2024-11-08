<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container class="pt-0-important bg-auth">
            <q-page>
                <div class="row bg-auth" style="height: 100vh">
                    <div
                        class="col-12 flex content-center justify-center bg-auth"
                    >
                        <router-view />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.login-image {
    z-index: 1;
}

.bg-auth {
    margin: 0;
    height: 100vh;
    background: linear-gradient(120deg, #3a5860, #527c7b, #3a5860);
    background-size: 200% 200%;
    animation: gradientAnimation 30s ease infinite;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
