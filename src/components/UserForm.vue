<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group" v-if="userLocal._id == null">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group" v-if="userLocal._id == null && userLocal.checking">
            <label for="passwordConfirmation">Nhập lại mật khẩu</label>
            <Field name="passwordConfirmation" type="password" class="form-control" />
            <ErrorMessage name="passwordConfirmation" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="userLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
        });
        let userFormSchema2;
        if (this.user._id != '') {
            userFormSchema2 = yup.object().shape({
                ppassword: yup
                    .string()
                    .required("Mật khẩu phải có giá trị.")
                    .min(8, "Mật khẩu phải ít nhất 8 ký tự."),
                passwordConfirmation: yup.string()
                    .test('Mật khẩu trùng', 'Mật khẩu phải trùng', function (value) {
                        return this.parent.password === value
                    })
            });
        };
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userLocal để liên kết với các input trên form
            userLocal: this.user,
            userFormSchema,
            userFormSchema2,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>