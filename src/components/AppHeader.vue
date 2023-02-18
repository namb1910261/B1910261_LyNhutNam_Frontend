<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'userbook' }" class="nav-link">
                    User
                    <i class="fas fa-user"></i>
                </router-link>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item" v-if="checkLogin != 'true'">
                <router-link :to="{ name: 'user.login' }" class="nav-link">
                    Đăng nhập
                    <i class="fas fa-sign-in"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="checkLogin != 'true'">
                <router-link :to="{ name: 'user.add' }" class="nav-link">
                    Đăng ký
                    <i class="fas fa-registered"></i>
                </router-link>
            </li>
            <li class="nav-item" v-if="checkLogin == 'true'">
                <a class="nav-link" @click="Logout">
                    {{ user.name }}
                </a>
            </li>
            <li class="nav-item" v-if="checkLogin == 'true'">
                <a class="nav-link" @click="Logout">
                    Logout
                    <i class="fas fa-sign-out"></i>
                </a>    
            </li>
        </div>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            checkLogin: localStorage.getItem('isLogin'),
            user: JSON.parse(localStorage.getItem('user')),
        };
    },
    methods: {
        Logout() {
            this.$router.push({ name: "user.login" });
            localStorage.setItem('isLogin', false);
            localStorage.removeItem('user');
            this.$router.go();
        }
    }
}
</script>