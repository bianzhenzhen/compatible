export default{
	"managerList":[
	{
		"name": "项目总览",
		"icon":"el-icon-document",
		"type":"url",
		"path":"index",
		"isShow":true,
		"children": [{
			"name": "项目详情",
			"icon": "",
			"type": "url",
			"path": 'proDetail',
			"isShow":false,
			"children": []
		}]
	}, {
		"name": "测试管理",
		"icon":"el-icon-mobile-phone",
		"type":"",
		"path":"1",
		"isShow":true,
		"children": [{
			"name": "任务状态",
			"icon": "",
			"type":"url",
			"path":'taskStatus',
			"isShow":true,
			"children": []
		}]
	}, {
		"name": "测试服务",
		"icon":"el-icon-setting",
		"type":"",
		"path":"2",
		"isShow":true,
		"children": [{
			"name": "兼容测试",
			"icon": "",
			"type": "url",
			"path": 'compatible',
			"isShow":true,
			"children": []
		}, {
			"name": "功能测试",
			"icon": "",
			"type": "url",
			"path": 'effect',
			"isShow":true,
			"children": []
		}, {
			"name": "性能测试",
			"icon": "",
			"type": "url",
			"path": 'performance',
			"isShow":true,
			"children": []
		}]
	}, {
		"name": "管理中心",
		"icon":"el-icon-document",
		"type":"",
		"path":"3",
		"isShow":true,
		"children": [{
			"name": "总览",
			"icon": "",
			"type": "url",
			"path": 'allManage',
			"isShow":true,
			"children": []
		}, {
			"name": "项目管理",
			"icon": "",
			"type": "url",
			"path": 'proManage',
			"isShow":true,
			"children": [{
				"name": "任务详情",
				"icon": "",
				"type": "url",
				"path": 'taskDetail',
				"isShow":false,
				"children": []
			},{
				"name": "任务编辑",
				"icon": "",
				"type": "url",
				"path": 'taskEdit',
				"isShow":false,
				"children": []
			}]
		}, {
			"name": "人员管理",
			"icon": "",
			"type": "url",
			"path": 'staffManage',
			"isShow":true,
			"children": []
		}]
	}],
	"ordinaryList":[
	{
		"name": "项目总览",
		"icon":"el-icon-document",
		"type":"url",
		"path":"index",
		"isShow":true,
		"children": [{
			"name": "项目详情",
			"icon": "",
			"type": "url",
			"path": 'proDetail',
			"isShow":false,
			"children": []
		}]
	}, {
		"name": "测试管理",
		"icon":"el-icon-mobile-phone",
		"type":"",
		"path":"1",
		"isShow":true,
		"children": [{
			"name": "任务状态",
			"icon": "",
			"type":"url",
			"path":'taskStatus',
			"isShow":true,
			"children": []
		}]
	}, {
		"name": "测试服务",
		"icon":"el-icon-setting",
		"type":"",
		"path":"2",
		"isShow":true,
		"children": [{
			"name": "兼容测试",
			"icon": "",
			"type": "url",
			"path": 'compatible',
			"isShow":true,
			"children": []
		}, {
			"name": "功能测试",
			"icon": "",
			"type": "url",
			"path": 'effect',
			"isShow":true,
			"children": []
		}, {
			"name": "性能测试",
			"icon": "",
			"type": "url",
			"path": 'performance',
			"isShow":true,
			"children": []
		}]
	}]
}