<template>
	<view>
		<view class="tally">
			<view class="head">
				<u-icon name="arrow-left" @click="backIndex()"></u-icon>
				<h2>记账</h2>
			</view>
			<view>
				<u-tabs-swiper ref="uTabs" :list="tsList" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="750" bg-color="#F9DB61" active-color="black" bar-width="80" gutter="50">
				</u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" style="height: calc(100vh - 119px);"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<ul>
						<li v-for="(item,index) in expendList" :key="index" @click="record(index)">
							<view class="imgBg" :class="item.bg">
								<image :src="item.path" mode=""></image>
							</view>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</swiper-item>
				<swiper-item class="swiper-item">
					<ul>
						<li v-for="(item,index) in incomeList" :key="index" @click="record(index)">
							<view class="imgBg" :class="item.bg">
								<image :src="item.path" mode=""></image>
							</view>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</swiper-item>
			</swiper>
			<view class="panel" v-show="panelShow">
				<view class="top">
					<h3>金额：{{money | filterMoney}}</h3>
					<view class="time" @click="pickerShow = true">
						<image src="../../static/calendar.png" mode=""></image>
						<span>{{defaultTime}}</span>
					</view>
				</view>
				<view class="remark">
					<label for="">备注：</label>
					<u-input v-model="remark" placeholder="点击写备注..." type="text" />
				</view>
			</view>
		</view>
		<!-- 消息提示 -->
		<u-toast ref="uToast" />
		<!-- 日期选择器 -->
		<u-picker mode="time" z-index="20000" :default-time="defaultTime" @confirm="confirm()" @cancel="cancel()"
			v-model="pickerShow" :params="params"></u-picker>
		<!-- 数字键盘 -->
		<u-keyboard ref="uKeyboard" tips=" " @change="valChange" @backspace="backspace" @confirm="confirmKey()"
			@cancel="cancelKey()" mode="number" :dot-enabled="true" :mask-close-able="false" v-model="keyBoardShow">
		</u-keyboard>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :show="false" :list="list" :height="115" :mid-button-size="100" :icon-size="60" :mid-button="true">
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 支出列表
				expendList: [{
						bg: "default",
						name: "餐饮",
						path: "../../static/expend/repast.png"
					},
					{
						bg: "default",
						name: "购物",
						path: "../../static/expend/shoping.png"
					},
					{
						bg: 'default',
						name: "日用",
						path: "../../static/expend/commodity.png"
					},
					{
						bg: "default",
						name: "交通",
						path: "../../static/expend/traffic.png"
					},
					{
						bg: "default",
						name: "蔬果",
						path: "../../static/expend/vegetables.png"
					},
					{
						bg: "default",
						name: "零食",
						path: "../../static/expend/snacks.png"
					},
					{
						bg: "default",
						name: "娱乐",
						path: "../../static/expend/recreation.png"
					},
					{
						bg: "default",
						name: "通讯",
						path: "../../static/expend/communication.png"
					},
					{
						bg: "default",
						name: "服饰",
						path: "../../static/expend/costume.png"
					},
					{
						bg: "default",
						name: "医疗",
						path: "../../static/expend/medical.png"
					},
					{
						bg: "default",
						name: "书籍",
						path: "../../static/expend/books.png"
					},
					{
						bg: "default",
						name: "礼物",
						path: "../../static/expend/gift.png"
					},
					{
						bg: "default",
						name: "水电",
						path: "../../static/expend/waterElectricity.png"
					},
					{
						bg: "default",
						name: "租房",
						path: "../../static/expend/tenement.png"
					},
					{
						bg: "default",
						name: "充值",
						path: "../../static/expend/topUp.png"
					}
				],
				// 收入列表
				incomeList: [{
						bg: "default",
						name: "工资",
						path: "../../static/income/salary.png"
					},
					{
						bg: "default",
						name: "兼职",
						path: "../../static/income/pluralistic.png"
					},
					{
						bg: "default",
						name: "理财",
						path: "../../static/income/moneyManagement.png"
					},
					{
						bg: "default",
						name: "搬砖",
						path: "../../static/income/moveBrick.png"
					},
					{
						bg: "default",
						name: "礼金",
						path: "../../static/income/cashGift.png"
					}
				],
				// tabsSwiper
				tsList: [{
					name: '支出'
				}, {
					name: '收入'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				keyBoardShow: false,
				// 日期选择器
				params: {
					year: true,
					month: true,
					day: true,
				},
				pickerShow: false,
				// 金额面板
				panelShow: false,
				money: 0.00,
				// picker选中时间
				defaultTime: "",
				// 备注信息
				remark: "",
				// 类别
				name: "",
				// 图标地址
				path: "",
				// 账单id(唯一标识)
				id: 1

			}

		},
		filters: {
			filterMoney(value) {
				return "￥" + value
			}
		},
		onLoad() {
			this.list = this.$store.state.list
			// 获取当前时间
			this.addDate()
			console.log(this.infoList)
		},
		methods: {
			// 当前时间
			addDate() {
				let nowDate = new Date()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate()
				}
				if (date.month < 10) {
					date.month = `0${date.month}`
				}
				if (date.date < 10) {
					date.date = `0${date.date}`
				}
				this.defaultTime = date.year + '-' + date.month + '-' + date.date

			},
			backIndex() {
				console.log(1)
				uni.switchTab({
					url: "../index/index"
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				// console.log("index",this.swiperCurrent)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// 记录
			record(index) {
				this.keyBoardShow = true;
				this.panelShow = true;
				// console.log(index)
				if (this.swiperCurrent == 0) {
					for (let i = 0; i < this.expendList.length; i++) {
						this.expendList[i].bg = "default"
					}
					this.expendList[index].bg = "activeBg";
					this.name = this.expendList[index].name;
					this.path = this.expendList[index].path;
				} else {
					for (let i = 0; i < this.incomeList.length; i++) {
						this.incomeList[i].bg = "default"
					}
					this.incomeList[index].bg = "activeBg";
					this.name = this.incomeList[index].name;
					this.path = this.incomeList[index].path;
				}

			},
			// 选择器点击取消
			cancel(value) {
				// this.tabBarShow = true
				console.log(value)

			},
			// 选择器点击确认
			confirm(value) {
				// this.tabBarShow = true
				console.log(value)
				this.defaultTime = `${value.year}-${value.month}-${value.day}`
				console.log(this.defaultTime)
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				if (this.money == 0.00) {
					this.money = ""
					this.money += val;
				} else {
					this.money += val;
				}
				// console.log(this.money);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.money.length) this.money = this.money.substr(0, this.money.length - 1);
				if (!this.money.length) {
					this.money = 0.00
				}
				// console.log(this.money);
			},
			// 键盘点击取消
			cancelKey(value) {
				// console.log(value)
				this.panelShow = false
			},
			// 键盘点击确认
			confirmKey(value) {
				// console.log(value)
				this.panelShow = false;
				if (this.swiperCurrent == 0) {
					for (let i = 0; i < this.expendList.length; i++) {
						this.expendList[i].bg = "default"
					};
					this.money = -this.money
				} else {
					for (let i = 0; i < this.incomeList.length; i++) {
						this.incomeList[i].bg = "default"
					};
					this.money = +this.money
				}

				if (this.money == 0.00) {
					this.$refs.uToast.show({
						title: '请输入金额！',
						type: 'error',
					})
					return
				}
				var info = {}
				uni.getStorage({
				    key: 'ID',
				    success: (res)=> {
						this.id = res.data + 1
						uni.setStorage({
							key:"ID",
							data:this.id,
							success() {
								console.log("success id")
							}
						})
						info = {
							name: this.name,
							path: this.path,
							money: this.money,
							defaultTime: this.defaultTime,
							remark: this.remark,
							show: false,
							id: this.id
						};
				    },
					fail:()=> {
						this.id = 1
						uni.setStorage({
							key:"ID",
							data:this.id,
							success:()=> {
								console.log(this.id)
							}
						})
						info = {
							name: this.name,
							path: this.path,
							money: this.money,
							defaultTime: this.defaultTime,
							remark: this.remark,
							show: false,
							id: this.id
						};
					}
				});
				uni.getStorage({
					key: 'bill',
					success: (res) => {
						// console.log("bill",res.data);
						res.data.push(info)
						// console.log("bill2",res.data);
						uni.setStorage({
							key: 'bill',
							data: res.data,
							success: () => {
								this.money = 0.00
								this.remark = ""
								uni.switchTab({
									url: "../index/index"
								})
							}
						});
					},
					fail: (err) => {
						uni.setStorage({
							key: 'bill',
							data: [info],
							success: () => {
								console.log('success');
								this.money = 0.00
								this.remark = ""
								uni.switchTab({
									url: "../index/index"
								})
							}
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.tally {
		.head {
			width: 100%;
			height: 150rpx;
			background-color: #F9DB61;
			position: relative;

			u-icon {
				position: absolute;
				bottom: 0rpx;
				left: 30rpx;
				font-size: 40rpx;
			}

			h2 {
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%);
				font-size: 40rpx;
			}
		}

		.swiper-item {
			padding-top: 10rpx;

			ul {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				li {
					width: 25%;
					margin: 10rpx 0;

					.imgBg {
						width: 115rpx;
						height: 115rpx;
						border-radius: 50%;
						// background-color: #F6F6F6;
						position: relative;
						margin: auto;

						image {
							width: 60rpx;
							height: 60rpx;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}

					.default {
						background-color: #F6F6F6;
					}

					.activeBg {
						background-color: #F9DB61;
					}

					p {
						text-align: center;
						line-height: 2em;
					}
				}
			}
		}

		.panel {
			width: 100%;
			border-top: 1px solid #e1e1e1;
			border-bottom: 1px solid #e1e1e1;
			position: fixed;
			bottom: 518rpx;
			background-color: white;
			z-index: 10076;

			.top {
				display: flex;
				justify-content: space-between;
				padding: 10rpx 40rpx;

				h3 {
					line-height: 60rpx;
					font-size: 38rpx;
				}

				.time {
					width: 225rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
						display: inline-block;
					}
				}
			}

			.remark {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-top: 1px solid #e1e1e1;
				padding: 5rpx 40rpx;

				u-input {
					width: calc(100% - 100rpx);
				}

				label {
					font-size: 30rpx;
				}
			}
		}
	}

	.u-tooltip-item.data-v-59248347 {
		font-size: 35rpx !important;
	}
</style>
