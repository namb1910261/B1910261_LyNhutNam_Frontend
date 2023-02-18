<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                User
                <i class="fas fa-address-book"></i>
            </h4>
            <UserList v-if="filteredUsersCount > 0" :users="filteredUsers"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có user nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddUser">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllUsers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeUser">
                <h4>
                    Chi tiết User
                    <i class="fas fa-address-card"></i>
                </h4>
                <UserCard :user="activeUser" />
                <router-link :to="{
                    name: 'user.edit',
                    params: { id: activeUser._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import UserCard from "@/components/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserCard,
        InputSearch,
        UserList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            users: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng user thành chuỗi để tiện cho tìm kiếm.
        userStrings() {
            return this.users.map((user) => {
                const { name, email, password } = user;
                return [name, email, password].join("");
            });
        },
        // Trả về các user có chứa thông tin cần tìm kiếm.
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        activeUser() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },

        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả User?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>