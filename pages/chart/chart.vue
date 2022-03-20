<template>
	<view>
		<view class="chart">
			<view class="head">
				<!-- 支出收入下拉菜单 -->
				<u-dropdown title-size="36" menu-icon-size="36" active-color="#606266">
					<u-dropdown-item v-model="value1" :title="label" @change="dropdownChange()" :options="options1">
					</u-dropdown-item>
				</u-dropdown>
				<u-tabs :list="tabList" font-size="36" bar-width="50" active-color="black" bg-color="#F9DB61"
					:is-scroll="false" :current="current" @change="tabChange()"></u-tabs>

			</view>
			<!-- 选择周期 -->
			<u-tabs :list="dateList" :current="dateCurrent" @change="dateChange()" active-color="black"></u-tabs>
			<view class="expendInfo">
				<h3>总支出：9999</h3>
				<h3>平均值：99</h3>
			</view>
			<view ref="chart1" style="width: 600px;height:400px;"></view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :list="list" :height="115" :mid-button-size="100" :icon-size="60" :mid-button="true"
			active-color="black"></u-tabbar>
	</view>
</template>

<script>
	import * as echarts from 'echarts';

	// 基于准备好的dom，初始化echarts实例

	export default {
		data() {
			return {
				// tabBar
				list: [],
				value1: 1,
				label: "支出",
				options1: [{
						label: '支出',
						value: 1,
					},
					{
						label: '收入',
						value: 2,
					}
				],
				tabList: [{
					name: '周'
				}, {
					name: '月'
				}, {
					name: '年'
				}],
				current: 0,
				// 时间周期
				dateList: [{
						name: "1月"
					},
					{
						name: "2月"
					},
					{
						name: "3月"
					},
					{
						name: "4月"
					},
					{
						name: "5月"
					},
					{
						name: "6月"
					},
					{
						name: "7月"
					},
					{
						name: "8月"
					},
					{
						name: "9月"
					},
					{
						name: "10月"
					},
					{
						name: "11月"
					},
					{
						name: "12月"
					}
				],
				dateCurrent: 0,
			}

		},
		onLoad() {
			this.list = this.$store.state.list


		},
		mounted() {
			console.log(this)
			console.log(echarts)

			// this.$nextTick(function(){
				console.log(this.$refs.main)
				this.writeChart()
			// })

			
		},
		methods: {
			dropdownChange(v) {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
				console.log(v)
				if (v == 2) {
					this.label = "收入"
				} else {
					this.label = "支出"
				}
			},
			tabChange(index) {
				this.current = index;
				console.log(this.current)
			},
			dateChange(index) {
				this.dateCurrent = index;
				console.log(this.dateCurrent)
			},
			writeChart() {
				// var myChart = echarts.init(document.getElementById('main'));
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(this.$refs.chart1);
				// 指定图表的配置项和数据
				let option = {
					title: {
						text: "ECharts 入门示例",
					},
					//   tooltip: {},
					legend: {
						data: ["销量"],
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
					},
					yAxis: {},
					series: [{
						name: "销量",
						type: "bar",
						data: [5, 20, 36, 10, 10, 20],
					}, ],
					label: {
						show: true,
					},
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
		}
	}
</script>

<style lang="scss">
	.chart {
		.head {
			width: 100%;
			height: 255rpx;
			background-color: #F9DB61;
			padding-top: 90rpx;
		}

		.expendInfo {
			padding: 10rpx 20rpx;

			h3 {
				font-size: 30rpx;
				line-height: 1.5em;
				color: #646464;
			}
		}
	}
</style>
