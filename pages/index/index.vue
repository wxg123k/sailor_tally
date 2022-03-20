<template>
	<view>
		<view class="index">
			<view class="title">
				<h1>水手记账</h1>
				<view class="paymentInfo">
					<u-row gutter="16">
						<u-col span="3">
							<h3>{{date.year}}年</h3>
							<view class="selectYear" @click="selectYear()">
								<span><i>{{date.month}}</i>月</span>
								<u-icon name="arrow-down-fill" size="28"></u-icon>
								<u-picker z-index="999999" mode="time" @confirm="confirm()" @cancel="cancel()"
									title="选择月份" default-time="2022-01" v-model="select_year" :params="params">
								</u-picker>
							</view>
						</u-col>
						<u-col span="4">
							<view class="income">
								<h3>收入</h3>
								<span>{{income}}</span>
							</view>
						</u-col>
						<u-col span="5">
							<view class="expenditure">
								<h3>支出</h3>
								<span>{{expend}}</span>
							</view>
						</u-col>
					</u-row>
				</view>
				<ul>
					<li>
						<image src="../../static/money.png" mode=""></image>
						<p>理财知识</p>
					</li>
					<li>
						<image src="../../static/budget.png" mode=""></image>
						<p>预算</p>
					</li>
					<li>
						<image src="../../static/property.png" mode=""></image>
						<p>资产管家</p>
					</li>
					<li>
						<image src="../../static/bill.png" mode=""></image>
						<p>账单</p>
					</li>
					<li>
						<image src="../../static/shopping.png" mode=""></image>
						<p>购物返现</p>
					</li>
				</ul>
			</view>
			<view class="main">
				<ul>
					<!-- <li> -->
					<li v-for="(item,index) in monthBill" :key="index">
						<view class="top">
							<view>
								<p>{{item[0]}} 星期{{item[0] | week}}</p>
							</view>
							<view>
								<span>收入:{{item[1] | countIncome}}</span>
								<span>支出:{{item[1] | countExpend}}</span>
							</view>
						</view>
						<u-swipe-action :show="billInfo.show" v-for="(billInfo,idx) in item[1]" :key="billInfo.id"
							@click="click(item[1],idx)" @open="open(item[1],idx)" :options="options" :btn-width="130">
							<view class="swipe_item">
								<view class="img">
									<image :src="billInfo.path" mode=""></image>
								</view>
								<view class="right">
									<span>{{billInfo.name}}</span>
									<span>{{billInfo.money}}</span>
								</view>
							</view>
						</u-swipe-action>
					</li>
				</ul>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :show="tabBarShow" :list="list" :height="115" :mid-button-size="100" :icon-size="60"
			:mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		data() {
			return {
				list: [],
				params: {
					year: true,
					month: true
				},
				select_year: false,
				tabBarShow: true,
				disabled: false,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				date: {
					year: "",
					month: ""
				},
				// 原始账单
				originalBill:[],
				// 账单信息
				billList: [],
				// 月份
				month: "",
				monthBill: [],
				// 收入
				income: 0,
				// 支出
				expend: 0
			}

		},
		filters: {
			week(value) {
				value = new Date(value).getDay();
				switch (value) {
					case 0:
						return value = "日";
					case 1:
						return value = "一";
					case 2:
						return value = "二";
					case 3:
						return value = "三";
					case 4:
						return value = "四";
					case 5:
						return value = "五";
					case 6:
						return value = "六";
				}
			},
			countIncome(value) {
				// console.log(value)
				var expend = 0
				value.forEach(item => {
					if (item.money > 0) {
						expend += item.money
					}
				})
				return expend
			},
			countExpend(value) {
				var expend = 0
				value.forEach(item => {
					if (item.money < 0) {
						expend += item.money
					}
				})
				return -expend
			}
		},
		onLoad() {
			this.list = this.$store.state.list;
			// 获取当前月份
			this.date.year = dayjs().year()
			let m = dayjs().month() + 1
			if (m < 10) {
				m = `0${m}`
			}
			this.date.month = m;
			this.month = dayjs().format('YYYY-MM');

		},
		onShow() {
			this.getbill();
		},
		methods: {
			cancel(value) {
				this.tabBarShow = true
				console.log("cancel", value)
			},
			confirm(value) {
				this.tabBarShow = true
				console.log("confirm", value)
				this.date.year = value.year
				this.date.month = value.month
				this.month = `${value.year}-${value.month}`
				this.selectMonthBill(this.month)
			},
			selectYear() {
				this.tabBarShow = false
				this.select_year = true
			},
			click(bill, idx) {
				// console.log(bill)
				// console.log(idx)
				console.log("id",bill[idx].id)
				
				console.log("原始账单",this.originalBill)
				let filtBill = this.originalBill.filter(item=>{
					console.log(item)
					if(bill[idx].id != item.id){
						return item
					}
				})
				// bill.splice(idx, 1);
				console.log("filtBill",filtBill)
				uni.setStorage({
				    key: 'bill',
				    data: filtBill,
				    success: function () {
				        console.log('success filtBill');
				    }
				});
				this.getbill()
				this.spending()
				// this.$u.toast(`删除了第${idx}个cell`);
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(bill, idx) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.monthBill.forEach(item => {
					item[1].forEach(i => {
						i.show = false
					})
				})
				bill.map((val, i) => {
					val.show = false;
				})
				bill[idx].show = true;
			},
			// 获取本地账单
			getbill() {
				uni.getStorage({
					key: 'bill',
					success: (res) => {
						// console.log(res.data);
						// for (let i = 0; i < res.data.length; i++) {
						// 	res.data[i]["id"] = i + 1
						// 	 console.log(res.data[i],i)
						// }
						// console.log(res.data);
						
						res.data.reverse()  // 逆序
						this.originalBill = res.data
						var map = {};
						for (var i = 0; i < res.data.length; i++) {
							var el = res.data[i];
							if (map[el.defaultTime]) {
								map[el.defaultTime].push(el);
							} else {
								var dest = [];
								dest.push(el);
								map[el.defaultTime] = dest;
							}
						}
						// console.log(map);
						this.billList = Object.entries(map);
						this.selectMonthBill(this.month)
						this.spending()
					},
				});
			},
			// 获取选择月份账单
			selectMonthBill(m) {
				this.monthBill = this.billList.filter((item) => {
					return item[0].includes(m)
				})
				this.monthBill.sort((a, b) => b[0].localeCompare(a[0]) || b[0].localeCompare(a[0]));
				this.spending()
				console.log("monthBill", this.monthBill)
			},
			// 计算收入支出
			spending() {
				console.log("spending")
				let list = this.billList
				this.expend = 0
				this.income = 0
				this.monthBill.forEach(item => {
					item[1].forEach(item2 => {
						if (item2.money < 0) {
							this.expend += item2.money
						} else {
							this.income += item2.money
						}
					})
				})
				this.expend = -this.expend
			}
		}
	}
</script>

<style lang="scss">
	.index {
		font-family: "STFangsong";

		.title {
			background: linear-gradient(to bottom, #F9DB61 0%, #F9DB61 75%, white 100%);
			height: 430rpx;
			padding: 60rpx 30rpx 0;
			position: fixed;
			width: 100%;
			top: 0;
			z-index: 99;

			h1 {
				font-size: 50rpx;
				text-align: center;
				line-height: 3em;
				letter-spacing: 0.07em;
			}

			.paymentInfo {
				h3 {
					font-size: 30rpx;
					font-weight: 300;
				}

				.income,
				.expenditure {
					padding: 0 70rpx;

					span {
						font-size: 40rpx;
						line-height: 2em;
					}
				}

				.selectYear {
					margin: 5rpx 0;
					border-right: .5rpx solid #555555;

					span {
						font-size: 38rpx;
						display: inline-block;
						margin-right: 8rpx;

						i {
							display: inline-block;
							font-size: 50rpx;
						}
					}
				}
			}

			ul {
				margin-top: 20rpx;
				padding: 20rpx 0;
				background-color: white;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-between;
				box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

				li {
					width: 25%;
					text-align: center;

					image {
						width: 60rpx;
						height: 60rpx;
						margin: auto;
					}
				}
			}
		}

		.main {
			margin-top: 490rpx;

			li {
				.top {
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #E0E0E0;
					padding: 20rpx 30rpx;

					span {
						font-weight: 400;
						color: #666666;
						margin-left: 20rpx;
					}
				}

				.swipe_item {
					display: flex;
					justify-content: space-between;
					padding: 20rpx 30rpx;

					.img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						background-color: #F6F6F6;
						position: relative;

						image {
							width: 50rpx;
							height: 50rpx;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);

						}

						span {
							line-height: 80rpx;
							font-size: 35rpx;
							padding-left: 30rpx;
							margin: 10rpx 0;
						}
					}

					.right {
						width: 85%;
						display: flex;
						justify-content: space-between;
						border-bottom: .2rpx solid #e8e8e8;

						span {
							line-height: 80rpx;
							font-size: 35rpx;
						}
					}

					li:last-of-type .right {
						border: none;
					}
				}
			}

		}
	}
</style>
