<template>
	<div class="container">
		<h3 class="my-2">Você está logado</h3>
		<NuxtLink to="logout">Sair</NuxtLink>
		<button type="button" @click="fetchData">Fetch Data</button>
	</div>
</template>

<script lang="ts" setup>
const services = useServices()

const fetchData = async () => {
	try {
		const apiResponse = await services.$application.getApiData()
		console.log('api response', apiResponse)
	} catch (error) {
		console.log(error)
	}
}
</script>

<style lang="scss" scoped>
h3 {
	color: $color-primary-500;
}
</style>
