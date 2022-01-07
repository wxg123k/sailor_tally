<template>
	<view>
		<view class="index">
			<view class="title">
				<h1>水手记账</h1>
				<view class="paymentInfo">
					<u-row gutter="16">
						<u-col span="3">
							<h3>2022年</h3>
							<view class="selectYear" @click="selectYear()">
								<span><i>01</i>月</span>
								<u-icon name="arrow-down-fill" size="28"></u-icon>
								<u-picker z-index="999999" mode="time" @confirm="confirm()" @cancel="cancel()" title="选择月份"
									default-time="2022-01" v-model="select_year" :params="params"></u-picker>
							</view>
						</u-col>
						<u-col span="4">
							<view class="income">
								<h3>收入</h3>
								<span>0.00</span>
							</view>
						</u-col>
						<u-col span="5">
							<view class="expenditure">
								<h3>支出</h3>
								<span>0.00</span>
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
					<li>
						<view class="top">
							<view class="">
								<p>01月07日 星期五</p>
							</view>
							<view class="">
								<p>支出：15</p>
							</view>
						</view>
						<ul class="list">
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
						</ul>
					</li>
					<li>
						<view class="top">
							<view class="">
								<p>01月07日 星期五</p>
							</view>
							<view class="">
								<p>支出：15</p>
							</view>
						</view>
						<ul class="list">
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
						</ul>
					</li>
					<li>
						<view class="top">
							<view class="">
								<p>01月07日 星期五</p>
							</view>
							<view class="">
								<p>支出：15</p>
							</view>
						</view>
						<ul class="list">
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
							<li>
								<view class="img">
									<image src="../../static/bill.png" mode=""></image>
								</view>
								<view class="right">
									<span>餐饮</span>
									<span>-15</span>
								</view>
							</li>
						</ul>
					</li>
				</ul>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar :show="tabBarShow" :list="list" :height="115" :mid-button-size="100" :icon-size="60" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				params: {
					year: true,
					month: true
				},
				select_year: false,
				tabBarShow:true
			}

		},
		onLoad() {
			this.list = this.$store.state.list
		},
		methods: {
			cancel(value) {
				this.tabBarShow = true
				console.log(value)
				
			},
			confirm(value) {
				this.tabBarShow = true
				console.log(value)
			},
			selectYear(){
				this.tabBarShow = false
				this.select_year = true
				
			}
		}
	}
</script>

<style lang="scss">
	.index {
		font-family: "STFangsong";
		.title {
			background: linear-gradient(to bottom, #F9DB61 0%,#F9DB61 75%,white 100%);
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
			ul{
				margin-top: 20rpx;
				padding: 20rpx 0;
				background-color: white;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-between;
				box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
				li{
					width: 25%;
					text-align: center;
					image{
						width: 60rpx;
						height: 60rpx;
						margin: auto;
					}
				}
			}
		}
		.main{
			margin-top: 490rpx;
			li{
				.top{
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #E0E0E0;
					padding: 20rpx 30rpx;
					p{
						font-weight: 400;
						color: #666666;
					}
				}
				.list{
					li{
						display: flex;
						justify-content: space-between;
						padding: 20rpx 30rpx;
						
							.img{
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
								background-color: #F6F6F6;
								position: relative;
								image{
									width: 50rpx;
									height: 50rpx;
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
								}
							
							span{
								line-height: 80rpx;
								font-size: 35rpx;
								padding-left: 30rpx;
							}
						}   
						.right{
							width: 85%;
							display: flex;
							justify-content: space-between;
							border-bottom: .2rpx solid #e8e8e8;
							span{
								line-height: 80rpx;
								font-size: 35rpx;
							}
						} 
					}
					li:last-of-type .right{
						border: none;
					}
				}
			}
			
		}
	}
</style>
