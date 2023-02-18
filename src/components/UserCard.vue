<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ user.name }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ user.email }}
        </div>
    </div>
</template>