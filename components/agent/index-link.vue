<template>
	<view class="link">
		<view class="title">{{$t("agent.linkMyInvited")}}</view>
		<view class="row">
			<view class="label">{{$t("agent.link")}}</view>
			<view>{{currentRegisterLink}}</view>
			<view @click="copyText(0)">
				<uni-icons class="iconfont icon-tubiaozhizuomoban-" size="25"></uni-icons>{{$t("common.copy")}}
			</view>
		</view>
		<view class="row">
			<view class="label">{{$t("agent.inviteCode")}}</view>
			<view>{{inviteCode}}</view>
			<view @click="copyText(1)">
				<uni-icons class="iconfont icon-tubiaozhizuomoban-" size="25"></uni-icons>{{$t("common.copy")}}
			</view>
		</view>
		<view class="row">
			<view class="label">{{$t("agent.qrCode")}}</view>
			<view class="qrcode">
				<image :src="qrCodeUrl"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import QRCode from "qrcode";

	export default {
		data() {
			return {
				qrCodeUrl: ""
			};
		},
		watch: {
			currentRegisterLink() {
				this.createQRCode();
			}
		},
		computed: {
			...mapGetters(["currentRegisterLink"]),
			inviteCode(){
				if (!this.currentRegisterLink) return "";
				
				let index = this.currentRegisterLink.indexOf("?");
				let url = new URLSearchParams(this.currentRegisterLink.substr(index));
				let inviteCode = url.get("key") || "";
				
				return inviteCode;
			}
		},
		methods: {
			...mapActions(["getSingleRegisterLink","copy"]),
			createQRCode() {
				if (!this.currentRegisterLink) return;

				QRCode.toDataURL(this.currentRegisterLink, {
						width: 200
					})
					.then(imgUrl => {
						this.qrCodeUrl = imgUrl;
					})
					.catch(err => {
						console.error(err);
					});
			},
			copyText(index){
				switch(index){
					case 0:
						this.copy(this.currentRegisterLink);
						break;
					case 1:
						this.copy(this.inviteCode);
						break;
				}
			}
		},
		created() {
			this.getSingleRegisterLink().then(res => {
				this.createQRCode();
			});
		}
	}
</script>

<style lang="scss" scoped>
	.link {
		margin: 30upx;
		padding: 40upx;
		background-color: #fff;
		border-radius: 20upx;

		.title {
			padding: 30upx;
			padding-left: 0;
			font-size: 1.1em;
		}

		.row {
			padding: 10upx 0;
			display: flex;
			align-items: center;

			>view:nth-of-type(2) {
				flex: 1;
			}

			>view:nth-of-type(3) {
				display: flex;
				align-items: center;
				color: $uni-color-primary;
				
				/deep/ .uni-icons{
					color: $uni-color-primary !important;
				}
			}

			.label {
				color: #555;
				width: 150upx;
				flex-shrink: 0;
				flex-grow: 0;
			}

			.qrcode {
				image {
					width: 400upx;
					height: 400upx;
				}
			}
		}
	}
</style>
