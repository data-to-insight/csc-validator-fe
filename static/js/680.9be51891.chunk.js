(self.webpackChunkcin_validator_fe=self.webpackChunkcin_validator_fe||[]).push([[680],{9271:function(e,t,a){var n={"./":[5154],"./index":[5154],"./index.js":[5154],"./pyodide":[2346,346],"./pyodide.js":[2346,346],"./static":[2539,539],"./static.js":[2539,539],"./web":[552,552],"./web.js":[552,552]};function l(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],l=t[0];return Promise.all(t.slice(1).map(a.e)).then((function(){return a(l)}))}l.keys=function(){return Object.keys(n)},l.id=9271,e.exports=l},7940:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Ee}});var n,l,r,o,i=a(8214),s=a(5861),c=a(9439),d=a(1413),u=a(390),h=a(1567),f=a(2345),b=a(4693),v=a(2678),p=a(7606),g=(a(5634),a(4270)),C=a(4544),y=a(6022),m=a(2298),w=a(4563),Z=a(5858),A=a(47),I=a(6138),x=a(168),E=a(9656),D=(E.Z.pre(n||(n=(0,x.Z)(["\n  white-space: normal;\n  word-wrap: break-word;\n"]))),E.Z.div(l||(l=(0,x.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n"])))),k=E.Z.div(r||(r=(0,x.Z)(["\n  margin-top: 24px;\n"])));!function(e){e.UPDATE="UPDATE",e.SET_CHILDREN="SET_CHILDREN",e.SET_TABLES="SET_TABLES",e.SET_CHILD="SET_CHILD",e.SET_RULES="SET_RULES",e.HIDE_ROWS="HIDE_ROWS",e.RESET="RESET"}(o||(o={}));var P,S=function(e,t){var a=(0,d.Z)({},e);switch(t.type){case o.RESET:return{};case o.UPDATE:return a=(0,d.Z)({},t.payload);case o.SET_RULES:return a.rules=t.payload,a;case o.SET_TABLES:return a.tables=t.payload.tables,a;case o.SET_CHILDREN:return a.children=function(e,t){var a={};return JSON.parse(t[0]).forEach((function(e){if(!e.LAchildID)return!1;a[e.LAchildID]||(a[e.LAchildID]={errors:{}});var n=JSON.parse(t[1]).filter((function(t){return t["Rule code"]===e.rule_code}))[0];a[e.LAchildID].errors["".concat(e.rule_code," ").concat(e.tables_affected,"_").concat(e.columns_affected)]=(0,d.Z)((0,d.Z)({},e),n)})),Object.keys(e).forEach((function(t){JSON.parse(e[t]).forEach((function(e){a[e.LAchildID]&&(a[e.LAchildID][t]=e)}))})),a}(t.payload.tables,t.payload.errors),a.userReport=JSON.parse(t.payload.errors[3]),a.tables=t.payload.tables,a;case o.SET_CHILD:return a;case o.HIDE_ROWS:return a.children?(a.filter=t.payload,Object.values(a.children).forEach((function(e){if(!e.CINdetails)return!1;e.hide=e.CINdetails.LAchildID.indexOf(t.payload)<0})),a):a}return a};!function(e){e.ADD_FILES="ADD_FILES",e.SET_FILES="SET_FILES",e.CLEAR_FILES="CLEAR_FILES"}(P||(P={}));var N,R,j,O,L,T,_,Q,U,B,F={},H=function(e,t){var a;switch(t.type){case P.CLEAR_FILES:return{};case P.ADD_FILES:return a=(0,d.Z)({},e),console.log(t.year,t.payload),Object.keys(t.payload).length<1?a[t.year]=[]:a[t.year]=t.payload,a;case P.SET_FILES:return a=(0,d.Z)({},t.payload)}},W=a(3831),M=a(2559),V=function(e){var t=e.disableButtons,a=e.disableDownload,n=e.disableUserReport,l=e.onClearClick,r=e.onValidateClick,o=e.onGenerateClick,i=e.onReportClick;return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(W.Z,{variant:"contained",disabled:t,onClick:r,children:"Validate"}),(0,M.jsx)(W.Z,{disabled:t,variant:"contained",onClick:l,children:"Clear Data And Start Again"}),(0,M.jsx)(W.Z,{disabled:t||a,onClick:o,variant:"contained",children:"Download CSVs"}),(0,M.jsx)(W.Z,{disabled:t||n,variant:"contained",onClick:i,children:"Download Report"})]})},X=function(e){if(e.length<0)return null;var t=["data:text/csv;charset=utf-8,",Object.keys(e[0]).join(",")];return e.forEach((function(e){t.push(Object.values(e).map((function(e){return e||0===e?JSON.stringify(e).replaceAll(",","|"):"-"})).join(","))})),t.join("\n")},q=JSON.parse('[{"value":"100","label":"100 - Reference Date is incorrect"},{"value":"1103","label":"1103 - The assessment start date cannot be before the referral date"},{"value":"1104","label":"1104 - The date of the initial child protection conference cannot be before the referral date"},{"value":"1105","label":"1105 - The child protection plan start date cannot be before the referral date"},{"value":"1510","label":"1510 - UPN invalid (wrong check letter at character 1)"},{"value":"1520","label":"1520 - More than one record with the same UPN"},{"value":"1530","label":"1530 - UPN invalid (characters 2-4 not a recognised LA code)"},{"value":"1540","label":"1540 - UPN invalid (characters 5-12 not all numeric)"},{"value":"1550","label":"1550 - UPN invalid (character 13 not a recognised value)"},{"value":"1560Q","label":"1560Q - Please check: Former UPN wrongly formatted"},{"value":"2883","label":"2883 - There are more child protection plans starting than initial conferences taking place"},{"value":"2884","label":"2884 - An initial child protection conference is recorded at both the S47 and CIN Details level and it should only be recorded in one"},{"value":"2885","label":"2885 - Child protection plan shown as starting a different day to the initial child protection conference"},{"value":"2886Q","label":"2886Q - Please check: Percentage of children with no gender recorded is more than 2% (excluding unborns)"},{"value":"2887Q","label":"2887Q - Please check: Less than 8 disability codes have been used in your return"},{"value":"2888Q","label":"2888Q - Please check: Only one disability code is recorded per child and multiple disabilities should be recorded where possible."},{"value":"2889","label":"2889 - The S47 start date cannot be before the referral date."},{"value":"2990","label":"2990 - Activity is recorded against a case marked as \u2018Case closed after assessment, no further action\u2019."},{"value":"2991Q","label":"2991Q - Please check: A Section 47 module is recorded and there is no assessment on the episode"},{"value":"4000","label":"4000 - CIN Plan details provided for a referral with no further action"},{"value":"4001","label":"4001 - A CIN Plan cannot run concurrently with a Child Protection Plan"},{"value":"4003","label":"4003 - A CPP review date is shown as being held at the same time as an open CIN Plan."},{"value":"8925","label":"8925 - Child Protection Plan End Date earlier than Start Date"},{"value":"4004","label":"4004 - This child is showing more than one open CIN Plan, i.e. with no End Date"},{"value":"4008","label":"4008 - CIN Plan shown as starting after the child\u2019s Date of Death."},{"value":"4009","label":"4009 - CIN Plan cannot end after the child\u2019s Date of Death"},{"value":"4010","label":"4010 - CIN Plan start date is missing or out of data collection period"},{"value":"4011","label":"4011 - CIN Plan End Date earlier than Start Date"},{"value":"4012Q","label":"4012Q - CIN Plan shown as starting and ending on the same day - please check"},{"value":"4013","label":"4013 - CIN Plan end date must fall within the census year"},{"value":"4014","label":"4014 - CIN Plan data contains overlapping dates"},{"value":"4015","label":"4015 - The CIN Plan start date cannot be before the referral date"},{"value":"4016","label":"4016 - A CIN Plan has been reported as open at the same time as a Child Protection Plan."},{"value":"4017","label":"4017 - A CIN Plan has been reported as open at the same time as a Child Protection Plan."},{"value":"4180","label":"4180 - Gender is missing"},{"value":"4220","label":"4220 - Ethnicity is missing or invalid (see Ethnicity table)"},{"value":"8500","label":"8500 - LA Child ID missing"},{"value":"8510","label":"8510 - More than one child record with the same LA Child ID"},{"value":"8520","label":"8520 - Date of Birth is after data collection period (must be on or before the end of the census period)"},{"value":"8535Q","label":"8535Q - Child\u2019s date of death should not be prior to the date of birth"},{"value":"8525","label":"8525 - Either Date of Birth or Expected Date of Birth must be provided (but not both)"},{"value":"8530Q","label":"8530Q - Please check: Expected Date of Birth is outside the expected range for this census (March to December of the Census Year end)"},{"value":"8540","label":"8540 - Child\u2019s disability is missing or invalid (see Disability table)"},{"value":"8545Q","label":"8545Q - Please check: Child\'s date of death should be within the census year"},{"value":"8555","label":"8555 - Child cannot be referred after its recorded date of death"},{"value":"8565","label":"8565 - Activity shown after a case has been closed"},{"value":"8568","label":"8568 - RNFA flag is missing or invalid"},{"value":"8569","label":"8569 - A case with referral date before one working day prior to the collection start date must not be flagged as a no further action case"},{"value":"8585Q","label":"8585Q - Please check: CIN episode shows Died as the Closure Reason, however child has no recorded Date of Death"},{"value":"8590","label":"8590 - Child does not have a recorded CIN episode."},{"value":"8600","label":"8600 - Child referral date missing or after data collection period"},{"value":"8606","label":"8606 - Child referral date is more than 40 weeks before DOB or expected DOB"},{"value":"8608","label":"8608 - Assessment Start Date cannot be later than its End Date"},{"value":"8610","label":"8610 - Primary Need code is missing for a referral which led to further"},{"value":"8614","label":"8614 - Parental or child factors at assessment should only be present for a completed assessment."},{"value":"8615","label":"8615 - Section 47 Enquiry Start Date must be present and cannot be later than the date of the initial Child Protection Conference"},{"value":"8617","label":"8617 - Code 8A has been returned. This code is not a valid code."},{"value":"8620","label":"8620 - CIN Closure Date present and does not fall within the Census year"},{"value":"8630","label":"8630 - CIN Closure Date is before CIN Referral Date for the same CIN episode"},{"value":"8640","label":"8640 - CIN Reason for closure code invalid (see Reason for Closure table in CIN Census code set)"},{"value":"8650","label":"8650 - Primary Need Code invalid (see Primary Need table in CIN census code set)"},{"value":"8670Q","label":"8670Q - Please check: Assessment started more than 45 working days before the end of the census year. However, there is no Assessment end date. "},{"value":"8675Q","label":"8675Q - Please check: S47 Enquiry started more than 15 working days before the end of the census year. However, there is no date of Initial Child Protection Conference."},{"value":"8696","label":"8696 - Assessment end date must fall within the census year"},{"value":"8715","label":"8715 - Date of Initial Child Protection Conference must fall within the census year"},{"value":"8720","label":"8720 - Child Protection Plan Start Date missing or out of data collection period"},{"value":"8730","label":"8730 - Total Number of previous Child Protection Plans missing"},{"value":"8736","label":"8736 - For an Assessment that has not been completed, the start date must fall within the census year"},{"value":"8740","label":"8740 - For a Section 47 Enquiry that has not held the Initial Child Protection Conference by the end of the census year, the start date must fall within the census year"},{"value":"8750","label":"8750 - Gender must equal 0 for an unborn child"},{"value":"8770Q","label":"8770Q - Please check and either amend data or provide a reason: UPN or reason UPN missing expected for a child who is more than 5 years old"},{"value":"8772","label":"8772 - UPN unknown reason is UN7 (Referral with no further action) but at least one CIN details is a referral going on to further action"},{"value":"8775Q","label":"8775Q - Please check: Child is over 25 years old"},{"value":"8790","label":"8790 - Disability information includes both None and other values"},{"value":"8794","label":"8794 - Child has two or more disabilities with the same code"},{"value":"8805","label":"8805 - A CIN case cannot have a CIN closure date without a Reason for Closure"},{"value":"8810","label":"8810 - A CIN case cannot have a Reason for Closure without a CIN Closure Date"},{"value":"8815","label":"8815 - More than one open CIN Details episode (a module with no CIN Closure Date) has been provided for this child and case is not a referral with no further action."},{"value":"8816","label":"8816 - An open CIN episode is shown and case is not a referral with no further action, but it is not the latest episode."},{"value":"8820","label":"8820 - The dates on the CIN episodes for this child overlap"},{"value":"8825Q","label":"8825Q - Reason for Closure code RC8 (case closed after assessment) has been returned but there is no assessment present for the episode."},{"value":"8831","label":"8831 - Activity is recorded against a case marked as a referral with no further action"},{"value":"8832","label":"8832 - Child Protection details provided for a referral with no further action."},{"value":"8839","label":"8839 - Within one CINDetails group there are 2 or more open S47 Assessments"},{"value":"8840","label":"8840 - Child Protection Plan cannot start and end on the same day"},{"value":"8841","label":"8841 - The review date cannot be on the same day or before the Child protection Plan start date."},{"value":"8842Q","label":"8842Q - Please check: Review Record has a missing date"},{"value":"8863","label":"8863 - An Assessment is shown as starting when there is another Assessment ongoing"},{"value":"8866","label":"8866 - Source of Referral is missing or an invalid code"},{"value":"8867","label":"8867 - CIN episode is shown as closed, however Assessment is not shown as completed"},{"value":"8868","label":"8868 - CIN episode is shown as closed, however Section 47 enquiry is not shown as completed by ICPC date or ICPC not required flag"},{"value":"8869","label":"8869 - The assessment factors code \u201c21\u201d cannot be used in conjunction with any other assessment factors."},{"value":"8870Q","label":"8870Q - Please check: The Target Date for Initial Child Protection Conference should not be a weekend"},{"value":"8873","label":"8873 - When there is only one assessment on the episode and the factors code \u201c21 No factors identified\u201d has been used for the completed assessment, the reason for closure \u2018RC8\u2019 must be used."},{"value":"8875","label":"8875 - The Date of Initial Child Protection Conference cannot be a weekend"},{"value":"8890","label":"8890 - A Section 47 enquiry is shown as starting when there is another Section 47 Enquiry ongoing"},{"value":"8896","label":"8896 - Within one CINDetails group there are 2 or more open Assessments groups"},{"value":"8897","label":"8897 - Parental or child factors at assessment information is missing from a completed assessment"},{"value":"8898","label":"8898 -  The assessment has more than one parental or child factors with the same code"},{"value":"8899Q","label":"8899Q - Please check: A child identified as having a disability does not have a disability factor recorded at the end of assessment."},{"value":"8905","label":"8905 - Initial Category of Abuse code missing or invalid (see Category of Abuse table in CIN Census code set)"},{"value":"8910","label":"8910 - Latest Category of Abuse code missing or invalid (see Category of Abuse table in CIN Census code set)"},{"value":"8915","label":"8915 - Child Protection Plan shown as starting after the child\u2019s Date of Death"},{"value":"8920","label":"8920 - Child Protection Plan cannot end after the child\u2019s Date of Death"},{"value":"8930","label":"8930 - Child Protection Plan End Date must fall within the census year"},{"value":"8935","label":"8935 - This child is showing more than one open Child Protection plan, i.e. with no End Date"},{"value":"8940","label":"8940 - Child Protection Plan data contains overlapping dates"}]'),G=a(7079),J=function(e){var t=e.dispatch,a=e.api,n=e.fileState,l=e.fileDispatch,r=e.data,d=function(){return q.map((function(e){return e.value}))},h=(0,u.useState)(d()),f=(0,c.Z)(h,2),b=f[0],v=f[1],x=(0,u.useState)(!1),E=(0,c.Z)(x,2),k=E[0],S=E[1],N=function(e){Object.keys(e).forEach((function(t){var a=X(Object.values(JSON.parse(e[t])));if(a){var n=encodeURI(a),l=document.createElement("a");document.body.appendChild(l),l.download="".concat(t,".csv"),l.href=n,l.click(),document.body.removeChild(l)}}))},R=function(){return Object.values(n).reduce((function(e,t){return e+Object.values(t).length}),0)},j=function(){var l=(0,s.Z)((0,i.Z)().mark((function l(){var r,s,c,d,u;return(0,i.Z)().wrap((function(l){for(;;)switch(l.prev=l.next){case 0:if(!a||!n){l.next=23;break}return r=n[2023],l.prev=2,S(!0),s=Object.values(r)[0],l.next=7,a.call("generate_tables",s.file);case 7:return c=l.sent,d=[s.file],b.length>0&&d.push(b),l.next=12,a.call("cin_validate",d);case 12:u=l.sent,S(!1),t({type:o.SET_CHILDREN,payload:{tables:c,errors:u}}),e.handleRouteChange(B.REPORT),l.next=23;break;case 18:l.prev=18,l.t0=l.catch(2),S(!1),console.log("API add_files request failed",l.t0),alert("Something went wrong!");case 23:case"end":return l.stop()}}),l,null,[[2,18]])})));return function(){return l.apply(this,arguments)}}(),O=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var l,s,c;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a&&n&&r)){e.next=21;break}if(r.tables){e.next=19;break}return l=n[2023],e.prev=3,S(!0),s=Object.values(l)[0],e.next=8,a.call("generate_tables",s.file);case 8:c=e.sent,S(!1),N(c),t({type:o.SET_TABLES,payload:{tables:c}}),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),S(!1),console.log("API add_files request failed",e.t0),alert("Something went wrong!");case 19:e.next=22;break;case 21:N(r.tables);case 22:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(){return e.apply(this,arguments)}}();return(0,G.BX)("div",{children:[k&&(0,G.tZ)(p.aN,{type:"cover",label:"Running analysis, this may take some time"}),(0,G.BX)(Z.Z,{flexGrow:1,children:[(0,G.tZ)(p.gO,{children:"This tool will load Python code in your web browser to read and validate your CIN data files locally. None of your CIN data will leave your network via this tool. You can safely use it without installing additional software, and without any data sharing agreement. Once the Python code has loaded, the tool will work entirely offline."}),(0,G.BX)(p.gO,{spacing:"blockLarge",children:["To begin, use the boxes below to locate and upload your local CIN file. Select the validation rules you want to run, and use the \u201cvalidate\u201d button to get started. By default, all rules will be run if no specific rules are selected.",(0,G.tZ)("br",{}),(0,G.tZ)("br",{}),'If you simply want to convert your XML file into CSVs, you can click on "download CSVs" without the need to go through the validation process first.']}),(0,G.tZ)(p.gO,{spacing:"blockLarge",children:(0,G.tZ)(p.qC,{Icon:I.Z,id:"instructions-list",title:"Instructions",children:function(){var e=[{label:"Upload an XML file for the CIN census by clicking on the arrow below. \n        If you have CSVs, convert them into XML using the DfE XML Generator.",content:null},{label:"If you only want to only run the validation for certain rules, use the\n        'Validation Rules' dropdown to select the ones you want.\n      ",content:null},{label:"Click 'Validate' to run the selected checks. When complete, the Error\n        Display screen will appear.\n      ",content:null},{label:"On the Error Display screen:",content:(0,G.BX)("ul",{children:[(0,G.tZ)("li",{children:(0,G.tZ)(g.Z,{variant:"body2",children:"Use the 'Child ID' sidebar to select individual children."})}),(0,G.tZ)("li",{children:(0,G.tZ)(g.Z,{variant:"body2",children:"Scroll down to see the failing locations for the child across all recorded tables. Cells with errors are highlighted in blue when you click on the error description."})}),(0,G.tZ)("li",{children:(0,G.tZ)(g.Z,{variant:"body2",children:"If you click the 'Filter' button, you can type to search for a Child ID, or scroll down and click to display only children with a particular error."})}),(0,G.tZ)("li",{children:(0,G.tZ)(g.Z,{variant:"body2",children:"To download the Error Report spreadsheet, scroll to the bottom of the page and click the 'Download Error Reports' button"})})]})}];return(0,G.tZ)(C.Z,{orientation:"vertical",activeStep:-1,children:e.map((function(e,t){return(0,G.BX)(y.Z,{active:!0,children:[(0,G.tZ)(m.Z,{children:e.label}),(0,G.tZ)(w.Z,{children:e.content})]},e.label)}))})}()})}),(0,G.tZ)(p.gO,{spacing:"blockLarge",children:(0,G.tZ)(Z.Z,{children:function(){var e=[(0,G.tZ)(Z.Z,{children:(0,G.tZ)(A.ZP,{container:!0,spacing:2,children:(0,G.BX)(A.ZP,{item:!0,xs:12,children:[(0,G.tZ)(g.Z,{variant:"h6",children:"Upload CIN XML file"}),(0,G.tZ)(p.gq,{onUploadReady:function(e){l({type:P.ADD_FILES,payload:e||{},year:"2023"})},maxFiles:1,fileList:n[2023]})]})})})];return(0,G.tZ)(p.mQ,{headers:[{label:"XML File"}],bodies:e,id:"file-upload-tabs"})}()})}),(0,G.tZ)(p.gO,{spacing:"blockLarge",children:(0,G.tZ)(p.qC,{defaultExpanded:!1,id:"validation-rules-expander",title:"Validation Rules (".concat(function(){var e=q.length,t=b.length,a=e-t;return"".concat(t," selected, ").concat(a," unselected")}(),")"),children:(0,G.tZ)(p.eR,{initialSelectedItems:d(),values:q,onItemSelected:function(e){v(e)}})})}),(0,G.tZ)(p.gO,{spacing:"blockLarge",children:(0,G.tZ)(D,{children:(0,G.tZ)(V,{disableDownload:R()<1,disableButtons:R()<1||b.length<1,disableUserReport:!r||!r.userReport,onClearClick:function(){t({type:o.RESET,payload:{}}),l({type:P.CLEAR_FILES,payload:{},year:""})},onValidateClick:j,onGenerateClick:O,onReportClick:function(){}})})})]})]})},Y=(E.Z.div(N||(N=(0,x.Z)(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"]))),E.Z.div(R||(R=(0,x.Z)(["\n  overflow-x: hidden;\n  overflow-y: auto;\n  height: 100%;\n"])))),K=(E.Z.div(j||(j=(0,x.Z)(["\n  /*flex-grow: ",";*/\n  overflow-x: hidden;\n  overflow-y: auto;\n  //  align-self: stretch;\n  // display: flex;\n  //flex-direction: column;\n  height: 50%;\n"])),(function(e){return e.grow?e.grow:1})),E.Z.div(O||(O=(0,x.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 "," "," ",";\n"])),p.W0.s,p.W0.m,p.W0.s)),z=a(9172),$=E.Z.div(L||(L=(0,x.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]))),ee=function(e){var t=e.dispatch,a=e.filterString;return(0,M.jsx)(Z.Z,{children:(0,M.jsx)($,{children:(0,M.jsx)(z.Z,{value:a,label:"Child ID",size:"small",onChange:function(e){t({type:o.HIDE_ROWS,payload:e.currentTarget.value})}})})})},te=a(9962),ae=a.n(te),ne=E.Z.div(T||(T=(0,x.Z)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  position: relative;\n"]))),le=E.Z.div(_||(_=(0,x.Z)(["\n  height: 50%;\n  overflow-x: auto;\n  overflow-y: auto;\n"]))),re=E.Z.div(Q||(Q=(0,x.Z)(["\n  height: 50%;\n  overflow-x: auto;\n  overflow-y: auto;\n"]))),oe=E.Z.div(U||(U=(0,x.Z)(["\n  position: absolute;\n  width: 100%;\n  background: ",';\n  height: 2px;\n  display: block;\n  left: 0;\n  top: 50%;\n  cursor: ns-resize;\n\n  &::after {\n    position: absolute;\n    content: "";\n    top: 50%;\n    height: 20px;\n    margin-top: -10px;\n    width: 40px;\n    background: white;\n    left: 50%;\n    margin-left: -20px;\n\n    border-radius: 4px;\n    background-color: ',';\n    background-repeat: repeat;\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw1AUhv8+pCIVBYuIOGRonSyIijhqFYpQIdQKrTqY3PQFTRqSFBdHwbXg4GOx6uDirKuDqyAIPkBcXZwUXaTEc5NCixgPXO7Hf8//c++5gL9RYaoZHAdUzTLSyYSQza0KoVf4EEQ/BhGTmKnPiWIKnvV1T91Ud3Ge5d33Z/UqeZMBPoF4lumGRbxBPL1p6Zz3iSOsJCnE58RjBl2Q+JHrsstvnIsO+3lmxMik54kjxEKxg+UOZiVDJZ4ijiqqRvn+rMsK5y3OaqXGWvfkLwzntZVlrtMaQRKLWIIIATJqKKMCC3HaNVJMpOk84eEfdvwiuWRylcHIsYAqVEiOH/wPfs/WLExOuEnhBND1YtsfMSC0CzTrtv19bNvNEyDwDFxpbX+1Acx8kl5va9EjoG8buLhua/IecLkDDD3pkiE5UoCWv1AA3s/om3LAwC3Qs+bOrXWO0wcgQ7NK3QAHh8BokbLXPd7d3Tm3f3ta8/sBOVBykPd2vFUAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfnAQQQGQDysTUVAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAABBJREFUCNdj+P///38GVAAARc4D/b5MvWkAAAAASUVORK5CYII=");\n  }\n'])),p.Hd.mid,p.Hd.mid),ie=function(e){var t=e.topContent,a=e.bottomContent;(0,u.useEffect)((function(){var e,t,a=null===(e=document.querySelector('td[scope="cell-active"]'))||void 0===e?void 0:e.getBoundingClientRect(),n=null===(t=d.current)||void 0===t?void 0:t.getBoundingClientRect();if(a&&n&&d){var l,r=a.top-n.top,o=a.left-n.left;null===d||void 0===d||null===(l=d.current)||void 0===l||l.scrollTo(o,r)}}));var n=(0,u.useState)(0),l=(0,c.Z)(n,2),r=l[0],o=l[1],i=(0,u.useRef)(null),s=(0,u.useRef)(null),d=(0,u.useRef)(null),h=function(){var e,t=(null===(e=i.current)||void 0===e?void 0:e.clientHeight)||0,a=50,n=50;if(0!==r){var l=(t/2+(r<0?0-r:r))/t*100,o=100-l;a=r>0?l:o,n=r>0?o:l}return{top:a,bottom:n}}();return(0,M.jsxs)(ne,{ref:i,children:[(0,M.jsx)(le,{style:{height:"".concat(h.top,"%")},ref:d,children:t}),(0,M.jsx)(re,{style:{height:"".concat(h.bottom,"%")},children:a}),(0,M.jsx)(ae(),{nodeRef:s,axis:"y",bounds:"parent",onDrag:function(e,t){var a=t.y;o(a)},children:(0,M.jsx)(oe,{ref:s})})]})},se=a(7262),ce=a(2453),de=a(3677),ue=a(3602),he=a(8481),fe=a(9530),be=a(8118),ve=function(e){var t=e.content,a=e.highlight,n=e.selectedRow,l=e.handleClick,r=e.outline,o=e.rowIdx,i=e.lowlight,s=u.useState(null),d=(0,c.Z)(s,2),h=d[0],f=d[1],b=function(){f(null)},v=Boolean(h);return(0,G.BX)(ce.Z,{scope:r?"cell-active":"",role:r?"cell-active":"",sx:function(){var e={backgroundColor:"transparent",color:"#000"};return i&&(e.backgroundColor=p.O9.secondary,e.color="#fff"),(o===n||r)&&(e.backgroundColor=p.O9.primary,e.color="#fff"),e}(),onClick:l,children:[(0,G.tZ)("span",{onMouseEnter:function(e){r&&null!==a&&void 0!==a&&a.description&&f(e.currentTarget)},onMouseLeave:b,children:t||"-"}),(0,G.tZ)(de.ZP,{id:"table-cell-popover-".concat(t),sx:{pointerEvents:"none"},open:v,anchorEl:h,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:b,disableRestoreFocus:!0,children:(0,G.tZ)(g.Z,{variant:"body1",children:null===a||void 0===a?void 0:a.description})})]},"table-cell-".concat(t))},pe=function(e){var t=e.headers,a=e.rows,n=e.id,l=e.selectable,r=e.selectedHandler,o=e.highlight,i=e.lowlights,s=(0,u.useState)(-1),d=(0,c.Z)(s,2),h=d[0],f=d[1];(0,u.useEffect)((function(){f(-1)}),[n]);return(0,G.BX)(he.Z,{children:[(0,G.tZ)(fe.Z,{children:(0,G.tZ)(ue.Z,{children:t.map((function(e,t){return(0,G.tZ)(ce.Z,{children:e},"table-head-".concat(n,"-").concat(t))}))})}),(0,G.tZ)(be.Z,{children:a.map((function(e,t){return(0,G.tZ)(ue.Z,{children:(a=e.cells,s=t,c=e.raw,a.map((function(e,t){var a=o&&o.row===s&&o.cell===t;return(0,G.tZ)(ve,{lowlight:i&&i["".concat(s,"_").concat(t)],outline:a,content:e,highlight:o,rowIdx:s,selectedRow:h,handleClick:function(){l&&(f(s===h?-1:s),r&&r(s===h?null:c))}},"".concat(s,"-").concat(t))})))},"table-row-".concat(n,"-").concat(t));var a,s,c}))})]})},ge=function(e){var t=e.data,a=e.id,n=e.error,l=e.childErrors;(0,u.useEffect)((function(){var e;n||(null===(e=document.querySelector("h5"))||void 0===e||e.scrollIntoView())}),[n]);var r=Object.keys(t),o=Object.values(t);return(0,M.jsx)(pe,{lowlights:function(){if(l&&!(l.length<1)){var e={};return l.forEach((function(t){e["".concat(0,"_",r.indexOf(t.columns_affected))]=!0})),e}}(),highlight:n?{row:0,cell:r.indexOf(n.columns_affected),description:q.filter((function(e){return e.value===n.rule_code.toString()}))[0].label||""}:null,headers:r,rows:[{cells:o}],id:a})},Ce=function(e){var t=e.errorList,a=e.errorSelectedHandler,n=e.childId;return(0,M.jsx)(pe,{selectable:!0,selectedHandler:function(e){a(e)},headers:["Rule Code","Rule Description"],rows:t.map((function(e){return{cells:[e.rule_code,e["Rule Message"]],raw:e}})),id:"error-table-".concat(n)})},ye=function(e){var t=e.childItem,a=e.childId,n=["Header","errors","hide"],l=(0,u.useState)(null),r=(0,c.Z)(l,2),o=r[0],i=r[1];(0,u.useEffect)((function(){i(null)}),[a]);return(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(ie,{topContent:(0,M.jsxs)(p.gO,{spacing:"blockLarge",children:[(0,M.jsx)(p.gO,{spacing:"blockLarge",children:(0,M.jsxs)(g.Z,{variant:"h5",children:["Child ID: ",a]})}),function(){if(t){var e={};return Object.values(t.errors).forEach((function(t){e[t.tables_affected.toLowerCase()]||(e[t.tables_affected.toLowerCase()]=[]),e[t.tables_affected.toLowerCase()].push(t)})),Object.keys(t).map((function(a){return n.indexOf(a)>-1?null:(0,M.jsxs)(p.gO,{spacing:"blockExtraLarge",children:[(0,M.jsx)(g.Z,{variant:"body1",children:(0,M.jsx)("strong",{children:(l=a,(0,se.startCase)(l))})}),(0,M.jsx)(ge,{childErrors:e[a.toLowerCase()]||null,error:o&&o.tables_affected.toLowerCase()===a.toLowerCase()?o:null,data:t[a],id:a},a)]});var l}))}return null}()]}),bottomContent:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("br",{}),(0,M.jsx)("br",{}),(0,M.jsx)(g.Z,{variant:"h5",children:"Errors"}),t.errors?(0,M.jsx)(Ce,{errorSelectedHandler:function(e){i(e)},errorList:Object.values(t.errors),childId:a}):(0,M.jsx)(g.Z,{variant:"body1",children:"No errors found for this entry"})]})})})},me=function(e){var t=e.handleRouteChange,a=e.api,n=e.data,l=e.dispatch,r=(0,u.useState)(null),d=(0,c.Z)(r,2),h=d[0],f=d[1];(0,u.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var t,n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.call("get_children",{});case 2:return t=e.sent,e.next=5,a.call("get_errors",{});case 5:n=e.sent,l({type:o.SET_CHILDREN,payload:{children:JSON.parse(t.val),errors:JSON.parse(n)}});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object.values(n).length<1&&e()}));var b=function(e){f(e[0])};return(0,M.jsxs)(Z.Z,{flexGrow:1,style:{height:"750px",overflowY:"hidden"},children:[(0,M.jsxs)(A.ZP,{container:!0,spacing:2,style:{height:"700px",overflowY:"hidden"},children:[(0,M.jsx)(A.ZP,{item:!0,xs:2,style:{height:"100%"},children:(0,M.jsxs)(Y,{children:[(0,M.jsxs)(K,{children:[(0,M.jsx)(g.Z,{variant:"h6",children:"Child ID"}),(0,M.jsx)(p.j0,{label:"Filter",children:(0,M.jsx)(ee,{filterString:n.filter,dispatch:l})})]}),function(){if(!n.children)return null;var e=Object.values(n.children).filter((function(e){return!!e.ChildIdentifiers&&(!(Object.keys(e.errors).length<1)&&!e.hide)})).map((function(e){return[e.ChildIdentifiers.LAchildID,e.errors?Object.keys(e.errors).length:0]}));return(0,M.jsx)(p.VI,{headers:["Code","Count"],rows:e,onRowSelect:b})}()]})}),(0,M.jsx)(A.ZP,{item:!0,xs:10,style:{height:"100%"},children:h&&n.children&&n.children[h]?(0,M.jsx)(ye,{childId:h,childItem:n.children[h]}):(0,M.jsx)(g.Z,{variant:"h6",children:"Select child"})})]}),(0,M.jsx)(p.gO,{spacing:"blockLarge",children:(0,M.jsx)(k,{children:(0,M.jsx)(D,{children:(0,M.jsx)(V,{disableDownload:!1,disableButtons:!1,onClearClick:function(){l({type:o.RESET,payload:{}}),t(B.LOAD_DATA)},onValidateClick:function(){},onGenerateClick:function(){n&&n.tables&&Object.keys(n.tables).forEach((function(e){var t=X(Object.values(JSON.parse(n.tables[e])));if(t){var a=encodeURI(t),l=document.createElement("a");document.body.appendChild(l),l.download="".concat(e,".csv"),l.href=a,l.click(),document.body.removeChild(l)}}))},onReportClick:function(){!function(){if(n&&n.userReport){var e=X(Object.values(n.userReport));if(e){var t=encodeURI(e),a=document.createElement("a");document.body.appendChild(a),a.download="User Report.csv",a.href=t,a.click(),document.body.removeChild(a)}}}()}})})})})]})};!function(e){e.LOAD_DATA="LOAD_DATA",e.REPORT="REPORT"}(B||(B={}));var we=function(e){var t=(0,u.useState)(B.LOAD_DATA),a=(0,c.Z)(t,2),n=a[0],l=a[1],r=(0,d.Z)({handleRouteChange:function(e){l(e)}},e);return(0,M.jsx)(p.uT,{title:"CIN Validator",chip:e.APIName||"Sample",children:n===B.LOAD_DATA?(0,M.jsx)(J,(0,d.Z)({},r)):n===B.REPORT?(0,M.jsx)(me,(0,d.Z)({},r)):void 0})},Ze=(0,d.Z)({},p.rS);Ze.components.MuiContainer.styleOverrides.maxWidthLg["&.MuiContainer-maxWidthLg"].maxWidth=1600;var Ae=(0,h.Z)(Ze),Ie=void 0,xe=!0;var Ee=function(e){var t=(0,u.useState)(!1),a=(0,c.Z)(t,2),n=a[0],l=a[1],r=(0,u.useReducer)(S,{}),o=(0,c.Z)(r,2),h=o[0],g=o[1],C=(0,u.useReducer)(H,(0,d.Z)({},F)),y=(0,c.Z)(C,2),m=y[0],w=y[1];(0,u.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var t,a;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.parse(window.location.search),a={options:{appName:"rpc_main:app"}},t.url?(a.transport=v.jG.WEB,a.options.url=t.url):(a.transport=v.jG.PYODIDE,a.options.nativePackages=["numpy","pandas"],a.options.packages=t.packages?t.packages:["/bin/dist/cin_validator-0.1.0-py3-none-any.whl","rpc-wrap","fs","plotly","prpc_python"]),e.next=5,(0,v.LC)(a,Z);case 5:Ie=e.sent;case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();xe&&(console.log("init..."),xe=!1,e())}),[]);var Z=function(e){null!==e&&void 0!==e&&e.error?(console.error("Failed to initialise API",e.error),alert("Failed to load pyodide")):e===v.Px.READY?l(!0):console.log("Unknown API response",e)};return(0,M.jsx)(f.Z,{theme:Ae,children:(0,M.jsx)(p.W2,{children:n&&Ie?(0,M.jsx)(we,{data:h,fileState:m,dispatch:g,fileDispatch:w,api:Ie,APIName:e.APIName}):(0,M.jsx)(p.aN,{type:"cover",label:"Loading Python API"})})})}},5634:function(e,t,a){"use strict";a.d(t,{Z:function(){return g}});var n=a(9439),l=a(390),r=a(2803),o=a(3),i=a(2883),s=a(4971),c=a(5858),d=a(4270),u=a(47),h=a(3831),f=a(7606),b=a(8253).map((function(e){return{la_id:e.UTLA21CD,la_name:e.UTLA21NM}})).reduce((function(e,t){return e[t.la_id]=t,e}),{}),v=Object.values(b).sort((function(e,t){return e.la_name>t.la_name?1:-1})),p=a(7079),g=function(e){var t=(0,l.useState)(""),a=(0,n.Z)(t,2),b=a[0],g=a[1];return(0,p.BX)(c.Z,{flexGrow:1,children:[(0,p.tZ)(f.gO,{children:(0,p.tZ)(d.Z,{variant:"body1",children:"Data to Insight is a national project led by local authorities with support from the ADCS, DLUHC, DfE and Ofsted to help local authorities make better use of data."})}),(0,p.tZ)(f.gO,{children:(0,p.tZ)(d.Z,{variant:"body1",children:"This tool was developed by local authority data analysts, supported by technical expertise from our friends at Social Finance. It will let you perform the same kinds of data validation as the DfE\u2019s CIN (children in need) statutory data submission tool. You can run this tool at any time, using your year-to-date extract of CIN data. We recommend a monthly data checking cycle."})}),(0,p.tZ)(f.gO,{spacing:"blockLarge",children:(0,p.tZ)(u.ZP,{container:!0,spacing:2,children:(0,p.tZ)(u.ZP,{item:!0,xs:6,children:(0,p.BX)(r.Z,{fullWidth:!0,children:[(0,p.tZ)(o.Z,{id:"la-select-label",children:"Choose local authority"}),(0,p.tZ)(i.Z,{value:b,labelId:"la-select-label",label:"Choose local authority",onChange:function(e){console.log("set..."),g(e.target.value)},children:v.map((function(e){return(0,p.tZ)(s.Z,{value:e.la_id,children:e.la_name},e.la_id)}))})]})})})}),(0,p.tZ)(f.gO,{spacing:"blockLarge",children:(0,p.tZ)(h.Z,{onClick:function(){try{gtag("event","cin-la-select",{localAuthority:b,localAuthorityName:v.filter((function(e){return e.la_id===b}))[0].la_name,event_callback:function(){e.onClick()},debug_mode:!0})}catch(t){console.log(t)}},variant:"contained",sx:{boxShadow:0},disabled:""===b,children:"Start"})})]})}}}]);
//# sourceMappingURL=680.9be51891.chunk.js.map