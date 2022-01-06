<template>
	<view class="login">
		<h2>账号密码登录</h2>
		<u-form class="form" :model="form" ref="uForm">
			<u-form-item label="账号" prop="identification">
				<u-input placeholder="请输入账号" v-model="form.identification" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input placeholder="请输入密码" v-model="form.password" />
			</u-form-item>
			<u-form-item>
				<u-button type="primary" @click="submit">登录</u-button>
			</u-form-item>
		</u-form>
		<view class="wxLogin">
			<p>微信一键登录</p>
			<button open-type="getUserProfile" @click="getUserProfile">
				<image src="../../static/wx.svg" mode=""></image>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					identification: "",
					password: ""
				},
				rules: {
					identification: [{
						required: true,
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入账号'))
							} else {
								callback();
							}
						},
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入密码'))
							} else {
								callback();
							}
						},
						trigger: ['change', 'blur'],
					}]
				},
				wxcode: ""
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// uni.switchTab({
						//     url: '/pages/index/index'
						// });
						uni.navigateTo({
							url: '/pages/index/index'
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: res => {
						this.wxcode = res.code
						// console.log("wxcode", this.wxcode)
					},
					fail: e => {
						this.$rules.ruleToastFun({
							title: '登录失败'
						})
					}
				})
			},
			getUserProfile(e) {
				console.log(e)
				//getUserProfile中的success方法会返回用户的比如头像，昵称之类的字段
				console.log(this.wxcode)
				if (this.wxcode) {
					uni.getUserProfile({
						desc: '获取授权',
						success: res => {
							console.log(res)
							uni.navigateTo({
								url: '../index/index'
							});
						},
						fail: e => {
							console.log(e)
						}
					})
				}
			},

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);

			this.wxLogin()
		}
	}
</script>

<style lang="scss">
	.login {
		padding: 50rpx;
		position: relative;
		height: 100vh;

		h2 {
			font-size: 50rpx;
			font-weight: bold;
			line-height: 4em;
			font-family: SimSun;
		}

		.wxLogin {
			position: absolute;
			bottom: 400rpx;
			left: 50%;
			transform: translateX(-50%);

			p {
				text-align: center;
				line-height: 3em;
				font-size: 30rpx;
			}

			button {
				border-radius: 50%;
				overflow: hidden;
				width: 110rpx;
				height: 110rpx;
				position: relative;
				background-color: white;
				border: 1rpx solid #bebebe;

				image {
					border-radius: 50%;
					width: 70rpx;
					height: 70rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

		}
	}
</style>
