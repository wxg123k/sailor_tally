import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const mutations = {

}
const actions = {

}
const state = {
	list: [{
			iconPath: "/static/tabBar/detail.png",
			selectedIconPath: "/static/tabBar/detail_selected.png",
			text: '明细',
			customIcon: false,
			pagePath: '/pages/index/index',
		},
		{
			iconPath: "/static/tabBar/chart.png",
			selectedIconPath: "/static/tabBar/chart_selected.png",
			text: '图表',
			customIcon: false,
			pagePath: '/pages/chart/chart',
		},
		{
			iconPath: "/static/tabBar/plus_selected.png",
			selectedIconPath: "/static/tabBar/plus_selected.png",
			text: '记账',
			midButton: true,
			customIcon: false,
			pagePath: '/pages/tally/tally'
		},
		{
			iconPath: "/static/tabBar/community.png",
			selectedIconPath: "/static/tabBar/community_selected.png",
			text: '社区',
			customIcon: false,
			pagePath: '/pages/community/community',
		},
		{
			iconPath: "/static/tabBar/mine.png",
			selectedIconPath: "/static/tabBar/mine_selected.png",
			text: '我的',
			customIcon: false,
			pagePath: '/pages/mine/mine',
		},
	]
}



export default new Vuex.Store({
	actions,
	mutations,
	state
})
