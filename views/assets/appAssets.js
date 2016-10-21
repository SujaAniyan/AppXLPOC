module.exports = {

	assets : {
		"app-css": {
			"dev":[
			"/public/assets/w/styles/layout.css",
			"/public/assets/w/styles/pagestyles.css",
			"/public/assets/w/styles/materialform.css",
			"/public/assets/w/styles/dataview-table.css",
			"/public/assets/w/styles/dataview-panels.css",
			"/public/assets/w/styles/userpicker.css",
            "/public/assets/g/css/rateit.css",
            "/public/assets/g/css/toaster.css",
			"/public/assets/g/css/sidebar.css",
			"/public/assets/m/css/font.css",
			"/public/assets/w/styles/tooltip.css",
			"/public/assets/w/styles/angucomplete-alt.css"
			],
			"prod":[
			"/public/assets/w/styles/layout.min.css",
			"/public/assets/w/styles/pagestyles.min.css",
			"/public/assets/w/styles/materialform.min.css",
			"/public/assets/w/styles/dataview-table.min.css",
			"/public/assets/w/styles/dataview-panels.min.css",
			"/public/assets/w/styles/userpicker.min.css",
            "/public/assets/g/css/rateit.css",
            "/public/assets/g/css/toaster.css",
			"/public/assets/g/css/sidebar.min.css",
			"/public/assets/m/css/font.min.css",
			"/public/assets/w/styles/tooltip.min.css",
			"/public/assets/w/styles/angucomplete-alt.min.css"
			]
		},

		"utils":{
			"dev":[
			"/public/assets/g/js/utils.js"
			],
			"prod":[
			"/public/assets/g/js/utils.js"
			]
		},

		"index":{
			"dev":[
			"/public/assets/w/styles/index.css"
			],
			"prod":[
			"/public/assets/w/styles/index.min.css"
			]
		},

		"home":{
			"dev":[
			"/public/assets/w/styles/dashboard.css"
			],
			"prod":[
			"/public/assets/w/styles/dashboard.min.css"
			]
		},

		"admin":{
			"dev":[
			"/public/mods/admin/users/usersModule.js",
			"/public/mods/admin/users/usersControllerMain.js",
			"/public/mods/admin/users/usersRouter.js"
			],
			"prod":[
			"/public/mods/admin/users/usersModule.js",
			"/public/mods/admin/users/usersControllerMain.js",
			"/public/mods/admin/users/usersRouter.js"
			]
		},

		"dir-web":{
			"dev":[
			"/public/d/userProfile/script.js",
			"/public/d/userDisplay/script.js",
			"/public/d/user/script.js",
			"/public/d/fileUpload/script.js",
			"/public/d/fileAttachment/script.js",
			"/public/d/datePicker/script.js",
			"/public/d/confirmDialog/script.js",
			"/public/d/richText/script.js",
			"/public/d/tooltipDirective/script.js",
			"/public/d/autoComplete/script.js",
			"/public/d/autoComplete/angucomplete-alt.js",
			"/public/d/autoComplete/angucomplete-alter1.js"
			],
			"prod":[
			"/public/d/userProfile/script.js",
			"/public/d/userDisplay/script.js",
			"/public/d/user/script.js",
			"/public/d/fileUpload/script.js",
			"/public/d/fileAttachment/script.js",
			"/public/d/datePicker/script.js",
			"/public/d/confirmDialog/script.js",
			"/public/d/richText/script.js",
			"/public/d/tooltipDirective/script.js",
			"/public/d/autoComplete/script.js",
			"/public/d/autoComplete/angucomplete-alt.js",
			"/public/d/autoComplete/angucomplete-alter1.js"
			]
		},

		"filters-web":{
			"dev":[
			"/public/f/date/script.js"
			],
			"prod":[
			"/public/f/date/script.js"
			]
		},

		"profile":{
			"dev":[
			"/public/mods/profile/profileModule.js",
			"/public/mods/profile/profileControllerMain.js",
			"/public/mods/profile/profileRouter.js"
			],
			"prod":[
			"/public/mods/profile/profileModule.js",
			"/public/mods/profile/profileControllerMain.js",
			"/public/mods/profile/profileRouter.js"
			]
		},

		"dir-mobile":{
			"dev":[
			"/public/d/userDisplay/script.js",
			"/public/d/scroll/scroll.js",
			"/public/d/header/header.js",
			"/public/d/userView/script.js",
            "/public/d/feedbackDirective/script.js",
            "/public/assets/g/js/rateit.js",
            "/public/assets/g/js/toaster.js",
            "/public/d/confirmDialog/script.js"
			],
			"prod":[
			"/public/d/userDisplay/script.js",
			"/public/d/scroll/scroll.js",
			"/public/d/header/header.js",
			"/public/d/userView/script.js",
            "/public/d/feedbackDirective/script.js",
            "/public/assets/g/js/rateit.js",
            "/public/assets/g/js/toaster.js",
            "/public/d/confirmDialog/script.js"
			]
		},

		"filters-mobile":{
			"dev":[
			"/public/f/date/script.js"
			],
			"prod":[
			"/public/f/date/script.js"
			]
		},

		"m-common":{
			"dev":[
			"/public/assets/m/css/font.css",
			"/public/assets/m/css/style.css"			
			],
			"prod":[
			"/public/assets/m/css/font.min.css",
			"/public/assets/m/css/style.min.css"	
			]

		},

		"m-main":{
			"dev":[
			"/public/m/home/home.js",
			"/public/m/home/homeCtrl.js",
			"/public/d/geoLocation/locator.js",
			"/public/d/geoLocation/locator-tpl.js"
			],
			"prod":[
			"/public/m/home/home.js",
			"/public/m/home/homeCtrl.js",
			"/public/d/geoLocation/locator.js",
			"/public/d/geoLocation/locator-tpl.js"
			]

		},
        
        "m-positions":{
		  "dev":[
                "/public/m/positions/positions.js",
                "/public/m/positions/positionsCtrl.js",
                "/public/assets/m/css/openpositions.css",
                "/public/assets/m/css/feedbackadd.css",
                "/public/assets/m/css/userview.css"                
            ],
            
            "prod":[
                "/public/m/positions/positions.js",
                "/public/m/positions/positionsCtrl.js",
                "/public/assets/m/css/openpositions.css",
                "/public/assets/m/css/feedbackadd.css",
                "/public/assets/m/css/userview.css"               
            ]
        },

       	"restApiConfig":{
			"dev":[
			"/public/assets/js/restApiConfig.js"
			],
			"prod":[
			"/public/assets/js/restApiConfig.js"
			]
		},

		"errorManagement":{
			"dev":[
			"/public/assets/js/errorManagement.js"
			],
			"prod":[
			"/public/assets/js/errorManagement.js"
			]
		}

	}

};
