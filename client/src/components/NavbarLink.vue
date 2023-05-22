<template>
    <router-link 
    :to="`/products/${id}`"
    class="nav-item" 
    aria-current="page" 
    :title="`This link goes to the ${name} page`"
    active-class="active"
    >{{ name }}</router-link>
</template>

<script lang="ts">
export default {
    name: 'NavbarLink',
    props: ['name', 'id']
}
</script>