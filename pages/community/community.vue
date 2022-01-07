<template>
	<view>
		<view class="u-page">
			community
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="list" :height="115" :mid-button-size="100" :icon-size="60" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		
		},
		onLoad(){
			this.list = this.$store.state.list
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
