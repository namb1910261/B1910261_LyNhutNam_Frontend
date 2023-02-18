<template>
    <div v-if="user" class="page">
        <h4>Thêm User</h4>
        <UserForm :user="user" @submit:user="addUser"/>
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
                checking: true,
            },
            message: "",
        };
    },
    methods: {
        async addUser(data) {
            try {
                await UserService.create(data);
                this.message = "User được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>