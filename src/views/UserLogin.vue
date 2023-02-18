<template>
    <div v-if="user" class="page">
        <h4>Đăng nhập</h4>
        <UserForm :user="user" @submit:user="loginUser" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserForm,
    },
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                checking: false
            },
            message: "",
        };
    },
    methods: {
        async loginUser(data) {
            try {
                let usercheck = await UserService.auth(data);
                if (usercheck.check == true) {
                    localStorage.setItem('isLogin', true);
                    this.$user = localStorage.setItem('user', JSON.stringify(usercheck.user));
                    this.$router.push({ name: "userbook" });
                    this.$router.go();
                }
                else {
                    this.message = "User đăng nhập không thành công.";
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>