<template>
    <li><router-link 
    :to="`/portal/products/${id}`"
    aria-current="page" 
    :title="`This link goes to the ${name} page`"
    active-class="active"
    :class="`${dropdownitem ? 'dropdown-item' : ''}`"
    >{{ name }}</router-link></li>
</template>

<script lang="ts">
export default {
    name: 'NavbarLink',
    props: ['name', 'id', 'dropdownitem']
}
</script>