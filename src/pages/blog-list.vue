<script setup lang="ts">
import {fetchBlogList} from "@/api";


onMounted( async ()=>{
 const a = await fetchBlogList()
 console.log('a', a);
})


</script>

<template>
    <div class="wf min-h100vh box-border px80 lt-sm:px20">
        <div class="wf min-h50 b-rd-2 bg-amber mt10" v-for="i in 10" :key="i">123</div>
    </div>
</template>

<style scoped lang="scss"></style>
