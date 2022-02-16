<template>
	<view class="change-language">
		<picker :value="langIndex" :range="supportLangList" range-key="name" selector-type="select"
			@change="selectedLangChanged">
			<!-- <view class="uni-input">{{supportLangList[langIndex].name}}</view> -->
			<uni-icons type="bars" class="icon-change-lang"></uni-icons>
		</picker>
	</view>
</template>

<script>
	import {
		config
	} from "../../common/js/config.js";
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		data() {
			return {
				langIndex: -1,
			}
		},
		computed: {
			...mapGetters(["systemConfig", "lang"]),
			supportLangList() {
				if (this.systemConfig === undefined) return [];

				let languageList = [];
				let supportLangList = this.systemConfig.user_support_languages;
				for (let prop in supportLangList) {
					languageList.push({
						code: prop,
						name: supportLangList[prop]
					});
				}
				return languageList;
			}
		},
		methods: {
			setInitLang() {
				let lang = config.lang;
				let index = this.supportLangList.findIndex(p => p.code === lang);
				if (index >= 0) {
					this.langIndex = index;
				}
			},
			selectedLangChanged(e) {
				this.langIndex = e.detail.value;
				if (this.supportLangList.length > this.langIndex) {
					let code = this.supportLangList[this.langIndex].code;
					this.$store.commit("setCurrentLang", code);
					window.location = window.location.href;
				}
			}
		},
		created() {
			this.setInitLang();
		}
	}
</script>

<style lang="scss" scoped>
	.change-language {}
</style>
