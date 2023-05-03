<template>
    <router-link 
    :to="`/${id}`"
    class="nav-link" 
    aria-current="page" 
    :title="`This link goes to the ${name} page`"
    active-class="active"
    >{{ name }}</router-link>
</template>

<script>
export default {
    name: 'NavbarLink',
    props: ['name', 'id']
}
</script>