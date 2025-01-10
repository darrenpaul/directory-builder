<script setup lang="ts">
import { homeRoute } from '~/constants/routes'

const supabase = useSupabaseClient()
const router = useRouter()

await supabase.auth.signOut()

await router.replace(homeRoute.path)
</script>

<template>
	<div class="min-h-screen">
		Signing out...
	</div>
</template>
