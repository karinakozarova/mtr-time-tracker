!function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){r(1),r(2),r(3),r(4),r(5),r(6),r(7),r(8),r(9),r(10),r(11),r(12),r(13),r(14),r(15),r(16),r(17),r(18),r(19),r(20),e.exports=r(21)},function(e,t){!function(){"use strict";function e(e,t,r){r.config({domains:{development:["mtr-time-tracker.dev"],production:["mtr-time-tracker.aws.mtrdev.com"]},vars:{development:{apiUrl:"//127.0.0.1:8000/time-tracker/api"},production:{apiUrl:"//api.mtr-time-tracker.aws.mtrdev.com/time-tracker/api"}}}),r.check(),e.when("/",{controller:"HomeController",templateUrl:"components/app/angular/views/home.html",controllerAs:"c"}).when("/account",{controller:"AccountController",templateUrl:"components/app/angular/views/account.html",controllerAs:"c"}).when("/projects/:id/time-reports",{controller:"ProjectController",templateUrl:"components/app/angular/views/project.html",controllerAs:"c"}).when("/projects/:id/time-reports/new",{controller:"TimeReportNewController",templateUrl:"components/app/angular/views/time-reports/new.html",controllerAs:"c"}).when("/projects/:project_id/time-reports/:id",{controller:"TimeReportEditController",templateUrl:"components/app/angular/views/time-reports/edit.html",controllerAs:"c"}).when("/projects/:project_id/time-reports/:id/view",{controller:"TimeReportViewController",templateUrl:"components/app/angular/views/time-reports/view.html",controllerAs:"c"}).when("/time-reports",{controller:"TimeReportListController",templateUrl:"components/app/angular/views/time-reports/list.html",controllerAs:"c"}).when("/time-reports?from&to",{controller:"TimeReportListController",templateUrl:"components/app/angular/views/time-reports/list.html",controllerAs:"c"}).when("/404",{controller:"NotFoundController",templateUrl:"components/app/angular/views/404.html",controllerAs:"c"}).when("/login",{controller:"LoginController",templateUrl:"components/app/angular/views/login.html",controllerAs:"c"}).otherwise({redirectTo:"/404"})}function t(e,t,r,o,n,i,a,c){e.globals=r.get("globals")||{},e.globals.currentUser&&(a.SetCredentials(e.globals.currentUser.token,function(e){("boolean"!=typeof e.success||"boolean"==typeof e.success&&0==e.success)&&t.path("/login")}),o.defaults.headers.common.Authorization="JWT "+e.globals.currentUser.token),e.$on("$locationChangeStart",function(r,o,n){var i=$.inArray(t.path(),["/login","/404"])===-1;i&&!e.globals.currentUser&&t.path("/login")})}angular.module("app",["ngRoute","ngCookies","angular-jwt","environment","angularMoment"]).config(e).constant("config",{appTitle:"MTR Design Projects"}).run(t),e.$inject=["$routeProvider","$locationProvider","envServiceProvider"],t.$inject=["$rootScope","$location","$cookieStore","$http","config","envService","AuthenticationService","PageService"]}()},function(e,t){!function(){"use strict";var e=angular.module("app");e.filter("matchMonthAndYear",function(){return function(e,t,r){for(var o=[],n=0;n<e.length;n++)e[n].month==t&&e[n].year==r&&o.push(e[n]);return o}}),e.filter("dateRange",function(){return function(e,t,r){var o=new Date;o.setFullYear(r,t-1,1);var n=o.setHours(0,0);o.setFullYear(r,t,0);for(var i=o.setHours(23,59),a=[],c=0;c<e.length;c++){var s=new Date(e[c].date);s>=n&&s<=i&&a.push(e[c])}return a}})}()},function(e,t){!function(){"use strict";var e=angular.module("app");e.factory("httpLoaderInterceptor",["$rootScope",function(e){function t(t){return o||e.$broadcast("httpLoaderStart"),o++,t}function r(t){if(o)return o--,o||e.$broadcast("httpLoaderEnd"),t}var o=0;return{request:t,requestError:r,response:r,responseError:r}}]),e.config(["$httpProvider",function(e){e.interceptors.push("httpLoaderInterceptor")}]),e.directive("httpLoader",function(){return{restrict:"EA",link:function(e,t){function r(){t.css("display","none")}var o=t.css("display");e.$on("httpLoaderStart",function(){t.css("display",o)}),e.$on("httpLoaderEnd",r),r()}}})}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(t,r,o){e.post(n.read("apiUrl")+"/auth/jwt/new/",{username:t,password:r}).error(function(e){o(e)}).success(function(e){o(e)})}function s(o,n){p(o,function(i){"object"==typeof i&&"string"==typeof i.token&&i.token.length>0?(e.defaults.headers.common.Authorization="JWT "+o,u(o,function(e){"object"==typeof e[0]&&"number"==typeof e[0].id&&e[0].id>0?(r.globals={currentUser:{token:o,profile:e[0]}},t.put("globals",r.globals),n({success:!0})):(l(),n({success:!1}))})):(l(),n({success:!1}))})}function l(){r.globals={},t.remove("globals"),e.defaults.headers.common.Authorization="JWT"}function u(e,t){a.GetOneByUserID(i.decodeToken(e).user_id).then(function(e){t(e)})}function p(t,r){e.post(n.read("apiUrl")+"/auth/jwt/verify/",{token:t}).error(function(e){r(e)}).success(function(e){r(e)})}var f={};return f.Login=c,f.SetCredentials=s,f.ClearCredentials=l,f.VerifyUser=u,f.VerifyToken=p,f}angular.module("app").factory("AuthenticationService",e),e.$inject=["$http","$cookieStore","$rootScope","config","envService","jwtHelper","ProfilesService"]}()},function(e,t){!function(){"use strict";function e(e){function t(){function t(){var t=e.flash;t&&(t.keepAfterLocationChange?t.keepAfterLocationChange=!1:delete e.flash)}e.$on("$locationChangeStart",function(){t()})}function r(t,r){e.flash={messages:t,type:"success",keepAfterLocationChange:r}}function o(t,r){e.flash={messages:t,type:"error",keepAfterLocationChange:r}}var n={};return n.Success=r,n.Error=o,t(),n}angular.module("app").factory("FlashService",e),e.$inject=["$rootScope"]}()},function(e,t){!function(){"use strict";function e(e,t){function r(){i.website_title=t.appTitle,i.html_title=t.appTitle,i.slug=""}function o(e){i.html_title=e+" | "+i.html_title}function n(e){i.slug=e}var i={};return i.setHtmlTitle=o,i.setSlug=n,i.resetData=r,r(),i}angular.module("app").factory("PageService",e),e.$inject=["$http","config"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o){function n(t,n){var i=o.globals.currentUser.profile.user_entry.id;e.post(r.read("apiUrl")+"/users/"+i+"/set_password/",t).error(function(e){n(e)}).success(function(e){n(e)})}var i={};return i.Edit=n,i}angular.module("app").factory("UsersService",e),e.$inject=["$http","config","envService","$rootScope"]}()},function(e,t){!function(){"use strict";function e(e,t,r){function o(){return e.get(r.read("apiUrl")+"/projects/").then(c,s("Error getting all projects."))}function n(){return e.get(r.read("apiUrl")+"/projects/?is_finished=3").then(c,s("Error getting active projects."))}function i(){return e.get(r.read("apiUrl")+"/projects/?is_finished=2").then(c,s("Error getting finished projects."))}function a(t){return e.get(r.read("apiUrl")+"/projects/"+t+"/").then(c,s("Error getting project."))}function c(e){return e.data}function s(e){return function(){return{success:!1,message:e}}}var l={};return l.GetAllProjects=o,l.GetActiveProjects=n,l.GetFinishedProjects=i,l.GetProject=a,l}angular.module("app").factory("ProjectsService",e),e.$inject=["$http","config","envService"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o){function n(){return e.get(r.read("apiUrl")+"/profiles/").then(c,s("Error getting all profiles."))}function i(t){return e.get(r.read("apiUrl")+"/profiles/?user__id="+t).then(c,s("Error getting this profile."))}function a(t,n){var i=o.globals.currentUser.profile.id;e.patch(r.read("apiUrl")+"/profiles/"+i+"/",t).error(function(e){n(e)}).success(function(e){n(e)})}function c(e){return e.data}function s(e){return function(){return{success:!1,message:e}}}var l={};return l.GetAll=n,l.GetOneByUserID=i,l.Edit=a,l}angular.module("app").factory("ProfilesService",e),e.$inject=["$http","config","envService","$rootScope"]}()},function(e,t){!function(){"use strict";function e(e,t,r){function o(t){return e.get(r.read("apiUrl")+"/time-reports/"+t+"/").then(f,d("Error getting time reports."))}function n(t){return e.get(r.read("apiUrl")+"/time-reports/?"+$.param(t)).then(f,d("Error getting time reports."))}function i(t){return e.get(r.read("apiUrl")+"/time-reports/profiles/?"+$.param(t)).then(f,d("Error getting time reports."))}function a(t){return e.get(r.read("apiUrl")+"/time-reports/projects/?"+$.param(t)).then(f,d("Error getting time reports."))}function c(t){return e.get(r.read("apiUrl")+"/time-reports/total-hours/?"+$.param(t)).then(f,d("Error getting time reports."))}function s(t){return e.get(r.read("apiUrl")+"/time-reports/?project__id="+t).then(f,d("Error getting time reports."))}function l(t,o){var n=0;n=moment.duration(t.seconds,"HH:mm").asSeconds()?moment.duration(t.seconds,"HH:mm"):moment.duration({hours:t.seconds}),e.post(r.read("apiUrl")+"/time-reports/",{name:t.name,seconds:n.asSeconds(),description:t.description,date:t.date,profile:t.profile,project:t.project}).error(function(e){o(e)}).success(function(e){o(e)})}function u(t,o,n){var i=0;i=moment.duration(o.hours,"HH:mm").asSeconds()?moment.duration(o.hours,"HH:mm"):moment.duration({hours:o.hours}),e.patch(r.read("apiUrl")+"/time-reports/"+t+"/",{name:o.name,seconds:i.asSeconds(),description:o.description,date:o.date}).error(function(e){n(e)}).success(function(e){n(e)})}function p(t,o){e["delete"](r.read("apiUrl")+"/time-reports/"+t+"/").error(function(e){o(e)}).success(function(e){o(e)})}function f(e){return e.data}function d(e){return function(){return{success:!1,message:e}}}var m={};return m.GetReportsByConditions=n,m.GetReportsProfilesByConditions=i,m.GetReportsProjectsByConditions=a,m.GetReportsTotalHoursByConditions=c,m.GetReports=s,m.Create=l,m.Update=u,m.Delete=p,m.GetByID=o,m}angular.module("app").factory("TimeReportsService",e),e.$inject=["$http","config","envService"]}()},function(e,t){!function(){"use strict";function e(e,t,r){e.page=r}angular.module("app").controller("PageController",e),e.$inject=["$rootScope","$cookieStore","PageService"]}()},function(e,t){!function(){"use strict";function e(e,t,r){!function(){r.resetData(),r.setHtmlTitle("Oops! That page can't be found."),r.setSlug("404")}()}angular.module("app").controller("NotFoundController",e),e.$inject=["ProjectsService","$rootScope","PageService"]}()},function(e,t){!function(){"use strict";function e(e,t,r){function o(){e.GetActiveProjects().then(function(e){i.getActiveProjects=e})}function n(){e.GetFinishedProjects().then(function(e){i.getFinishedProjects=e})}var i=this;i.getActiveProjects=[],i.getFinishedProjects=[],function(){r.resetData(),r.setHtmlTitle("Home"),r.setSlug("home"),o(),n()}()}angular.module("app").controller("HomeController",e),e.$inject=["ProjectsService","$rootScope","PageService"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(){var t=[];o.Edit(l.accountData.profile,function(r){"number"==typeof r.id&&r.id>0?(e.globals.currentUser.profile=r,n.Success(["Your account has been successfully updated."])):(angular.forEach(r,function(e,r){t.push(l.readableKeys[r]+": "+e)}),n.Error(t))})}function s(){var e=[];a.Edit(l.accountData.user,function(t){"number"==typeof t.id&&t.id>0?n.Success(["Your account has been successfully updated."]):(angular.forEach(t,function(t,r){e.push(l.readableKeys[r]+": "+t)}),n.Error(e))})}var l=this;l.changeProfile=c,l.changePassword=s,l.accountData={},l.accountData.user={},l.accountData.user.current_password="",l.accountData.user.new_password="",l.accountData.user.confirm_new_password="",l.accountData.profile={},l.accountData.profile.email_address=e.globals.currentUser.profile.email_address,l.accountData.profile.first_name=e.globals.currentUser.profile.first_name,l.accountData.profile.last_name=e.globals.currentUser.profile.last_name,l.accountData.profile.job_title=e.globals.currentUser.profile.job_title,l.accountData.profile.phone_number=e.globals.currentUser.profile.phone_number,l.readableKeys={},l.readableKeys.email_address="Email address",l.readableKeys.first_name="First name",l.readableKeys.last_name="Last name",l.readableKeys.job_title="Job title",l.readableKeys.phone_number="Phone number",l.readableKeys.current_password="Current password",l.readableKeys.new_password="New password",l.readableKeys.confirm_new_password="Confirm new password",function(){r.resetData(),r.setHtmlTitle("Account"),r.setSlug("account")}()}angular.module("app").controller("AccountController",e),e.$inject=["$rootScope","$location","PageService","ProfilesService","FlashService","AuthenticationService","UsersService"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a,c,s){function l(e){n.GetProject(e).then(function(e){"number"==typeof e.id&&e.id>0?(j.getProject=e,a.GetReportsByConditions(j.filterData).then(function(e){j.getProjectTimeReports=e}),o.setHtmlTitle(e.name)):t.path("/404")})}function u(){j.filterData.group_by="MONTH",a.GetReportsProfilesByConditions(j.filterData).then(function(e){j.totalMonthHours=e})}function p(){a.GetReportsTotalHoursByConditions(j.filterData).then(function(e){j.getTimeReportsTotalHours=e})}function f(){a.GetReportsProfilesByConditions(j.filterData).then(function(e){j.getTimeReportsProfiles=e})}function d(e){var t=confirm("Are you sure that you want to delete this item?");t&&a.Delete(e,function(e){0==e.length?r.Success(["Time report has been successfully deleted."]):r.Error(["Unexpected error"]),s.reload()})}function m(){i.GetAll().then(function(e){j.profiles=e})}function g(){t.url("/projects/"+c.id+"/time-reports?"+$.param(j.filterData))}function h(){j.filterData.group_by="MONTH",a.GetReportsProjectsByConditions(j.filterData).then(function(e){j.listDateRange=e})}var v=t.search(),j=this;j.filter=g,j.removeItem=d,j.listDateRange=[],j.getProject=[],j.profiles=[],j.filterData={},j.filterData.profile__id=v.profile__id?v.profile__id:null,j.filterData.project__id=c.id,j.filterData.group_by="",j.getProjectTimeReports=[],j.getTimeReportsTotalHours=[],j.getTimeReportsProfiles=[],j.totalMonthHours=[],function(){o.resetData(),o.setHtmlTitle("Projects"),o.setSlug("projects"),l(c.id),f(),p(),m(),u(),h()}()}angular.module("app").controller("ProjectController",e),e.$inject=["$rootScope","$location","FlashService","PageService","ProjectsService","ProfilesService","TimeReportsService","$routeParams","$route"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(e){n.GetProject(e).then(function(e){"number"==typeof e.id&&e.id>0?(l.getProject=e,r.setHtmlTitle(e.name)):t.path("/404")})}function s(){var e=[];i.Create(l.timeReportData,function(r){"number"==typeof r.id&&r.id>0?(o.Success(["Time report has been successfully created."]),t.path("/projects/"+a.id+"/time-reports")):(angular.forEach(r,function(t,r){e.push(l.readableKeys[r]+": "+t)}),o.Error(e))})}var l=this;l.create=s,l.getProject=[],l.getProjectTimeReports=[],l.timeReportData={},l.timeReportData.name="",l.timeReportData.seconds="",l.timeReportData.description="",l.timeReportData.date=moment().format("YYYY-MM-DD"),l.timeReportData.profile=e.globals.currentUser.profile.id,l.timeReportData.project=a.id,l.readableKeys={},l.readableKeys.name="Name",l.readableKeys.seconds="Hours",l.readableKeys.description="Description",l.readableKeys.date="Date",function(){r.resetData(),r.setHtmlTitle("Projects"),r.setSlug("projects"),c(a.id),initUI()}()}angular.module("app").controller("TimeReportNewController",e),e.$inject=["$rootScope","$location","PageService","FlashService","ProjectsService","TimeReportsService","$routeParams"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(){o.GetReportsByConditions(h.filterData).then(function(e){h.getTimeReports=e})}function s(){o.GetReportsProfilesByConditions(h.filterData).then(function(e){h.getTimeReportsProfiles=e})}function l(){o.GetReportsProjectsByConditions(h.filterData).then(function(e){h.getTimeReportsProjects=e})}function u(){o.GetReportsTotalHoursByConditions(h.filterData).then(function(e){h.getTimeReportsTotalHours=e})}function p(){e.url("/time-reports?"+$.param(h.filterData))}function f(e){var r=confirm("Are you sure that you want to delete this item?");r&&o.Delete(e,function(e){0==e.length?t.Success(["Time report has been successfully deleted."]):t.Error(["Unexpected error"]),a.reload()})}function d(){n.GetAll().then(function(e){h.profiles=e})}function m(){i.GetAllProjects().then(function(e){h.projects=e})}var g=e.search(),h=this;h.filter=p,h.removeItem=f,h.profiles=[],h.projects=[],h.filterData={},h.filterData.date_0=g.date_0?g.date_0:moment().startOf("month").format("YYYY-MM-DD"),h.filterData.date_1=g.date_1?g.date_1:moment().format("YYYY-MM-DD"),h.filterData.profile__id=g.profile__id?g.profile__id:null,h.filterData.project__id=g.project__id?g.project__id:null,h.getTimeReports=[],h.getTimeReportsProfiles=[],h.getTimeReportsProjects=[],h.getTimeReportsTotalHours=[],function(){r.resetData(),r.setHtmlTitle("Time Reports"),r.setSlug("time-reports"),c(),s(),l(),u(),d(),m(),initUI()}()}angular.module("app").controller("TimeReportListController",e),e.$inject=["$location","FlashService","PageService","TimeReportsService","ProfilesService","ProjectsService","$route"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(e){n.GetProject(e).then(function(e){"number"==typeof e.id&&e.id>0?(u.getProject=e,r.setHtmlTitle(e.name)):t.path("/404")})}function s(e){i.GetByID(e).then(function(e){"number"==typeof e.id&&e.id>0?(u.timeReportData=e,r.setHtmlTitle(e.name)):t.path("/404")})}function l(){var e=[];i.Update(a.id,u.timeReportData,function(r){"number"==typeof r.id&&r.id>0?(o.Success(["Time report has been successfully updated."]),t.path("/projects/"+a.project_id+"/time-reports/"+a.id)):(angular.forEach(r,function(t,r){e.push(u.readableKeys[r]+": "+t)}),o.Error(e))})}var u=this;u.edit=l,u.getProject=[],u.getProjectTimeReports=[],u.timeReportData={},u.timeReportData.id="",u.timeReportData.name="",u.timeReportData.seconds="",u.timeReportData.description="",u.timeReportData.date="",u.timeReportData.profile=e.globals.currentUser.profile.id,u.timeReportData.project=a.id,u.readableKeys={},u.readableKeys.name="Name",u.readableKeys.seconds="Hours",u.readableKeys.description="Description",u.readableKeys.date="Date",function(){r.resetData(),r.setHtmlTitle("Time Reports"),r.setSlug("time-reports"),s(a.id),c(a.project_id),initUI()}()}angular.module("app").controller("TimeReportEditController",e),e.$inject=["$rootScope","$location","PageService","FlashService","ProjectsService","TimeReportsService","$routeParams"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o,n,i,a){function c(e){n.GetProject(e).then(function(e){"number"==typeof e.id&&e.id>0?(u.getProject=e,r.setHtmlTitle(e.name)):t.path("/404")})}function s(e){i.GetByID(e).then(function(e){"number"==typeof e.id&&e.id>0?(u.timeReportData=e,r.setHtmlTitle(e.name)):t.path("/404")})}function l(e){var t=confirm("Are you sure that you want to delete this item?");t&&i.Delete(e,function(e){0==e.length?o.Success(["Time report has been successfully deleted."]):o.Error(["Unexpected error"]),history.go(-1)})}var u=this;u.removeItem=l,u.getProject=[],u.getProjectTimeReports=[],u.timeReportData={},u.timeReportData.id="",u.timeReportData.name="",u.timeReportData.seconds="",u.timeReportData.description="",u.timeReportData.date="",u.timeReportData.profile=e.globals.currentUser.profile.id,u.timeReportData.project=a.id,u.readableKeys={},u.readableKeys.name="Name",u.readableKeys.seconds="Hours",u.readableKeys.description="Description",u.readableKeys.date="Date",function(){r.resetData(),r.setHtmlTitle("Time Reports"),r.setSlug("time-reports"),s(a.id),c(a.project_id),initUI()}()}angular.module("app").controller("TimeReportViewController",e),e.$inject=["$rootScope","$location","PageService","FlashService","ProjectsService","TimeReportsService","$routeParams"]}()},function(e,t){!function(){"use strict";function e(e,t,r,o){function n(){t.Login(i.username,i.password,function(o){"string"==typeof o.token&&o.token.length>0?t.SetCredentials(o.token,function(t){"boolean"==typeof t.success&&1==t.success?e.path("/"):r.Error(["The username and password you entered don't match."])}):r.Error(["The username and password you entered don't match."])})}var i=this;i.login=n,function(){o.resetData(),o.setHtmlTitle("Login"),o.setSlug("login"),t.ClearCredentials()}()}angular.module("app").controller("LoginController",e),e.$inject=["$location","AuthenticationService","FlashService","PageService"]}()},function(e,t){$(function(){})}]);