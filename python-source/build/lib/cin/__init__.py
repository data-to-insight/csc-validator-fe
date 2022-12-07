import os
import hashlib
from typing import Iterable

import tempfile
import zipfile
from datetime import date
from io import BytesIO
from math import ceil
from pathlib import Path
from typing import Iterable, List

from rpc_wrap import RpcApp

from datastore import fs_datastore

app = RpcApp("sfdl_sample_pyodide")




class CINValidationSession:
    def __init__(self):
        self.temp_folder = tempfile.TemporaryDirectory()
        self.temp_folder_path = Path(self.temp_folder.name)
        self.uploads_path = self.temp_folder_path / "uploads"
        self.uploads_path.mkdir(parents=True, exist_ok=True)

        self.__datastore = None

    def list_files(self) -> List[str]:
        return [
            str(f.relative_to(self.uploads_path)) for f in self.uploads_path.iterdir()
        ]

    def add_files(self, files: Iterable):
        for record in files:
            year = record["year"]
            file = record["file"]
            if file.content_type == "application/zip":
                self.add_zip_file(file)
            else:
                folder_path = self.uploads_path / year
                folder_path.mkdir(parents=True, exist_ok=True)
                with open(folder_path / file.filename, "wb") as f:
                    f.write(file.read())
        self.datastore_invalidate()

    def add_zip_file(self, file):
        bytes = BytesIO(file.read())
        with zipfile.ZipFile(bytes, "r") as zip_ref:
            zip_ref.extractall(self.uploads_path)   

    def delete_files(self, names: Iterable[str]):
        for name in names:
            (self.uploads_path / name).unlink()

    @property
    def datastore(self):
        if self.__datastore is None:
            self.__datastore = fs_datastore(self.uploads_path.as_posix())
        print("Returning datastore", self.__datastore)
        return self.__datastore

    def datastore_invalidate(self):
        self.data_container_invalidate()
        self.__datastore = None

    def data_container_invalidate(self):
        self.__datacontainer = None

    def close(self):
        self.datastore_invalidate()
        self.temp_folder.cleanup()


cin_session = CINValidationSession()

















@app.call
def reset():
    global cin_session
    cin_session.close()
    cin_session = CINValidationSession()
    return list_files()


@app.call
def list_files() -> List[str]:
    return cin_session.list_files()


@app.call
def add_files(files: Iterable) -> List[str]:
    print("adding files...")
    cin_session.add_files(files)
    print(list_files())
    return list_files()


@app.call
def delete_files(names: Iterable[str]) -> List[str]:
    cin_session.delete_files(names)
    return list_files()

@app.call
def get_children():
    data = '[{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"1","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"115356"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"135717"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"147980"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"194633"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"197474"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"232161"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"2431"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"244935"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"245118"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"250009"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"288369"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"289080"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"300367"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"308457"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"354455"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"363625"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"378727"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"419002"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"420627"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"422644"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"438490"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"483691"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"500229"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"508004"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"516400"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"518085"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"549531"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"560048"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"574154"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"58648"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"591172"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"652288"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"657425"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"659560"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"721241"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"725957"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"727783"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"733974"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"760316"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"79078"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"800819"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"806933"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"833390"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"842472"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"843267"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"863149"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"864948"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"868758"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"87520"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"87702"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"880820"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"934440"},{"Index":1289,"DOB":"22/04/2002","SDQ_SCORE":null,"SDQ_REASON":"SDQ3","CONVICTED":"0","HEALTH_CHECK":"0","IMMUNISATIONS":"0","TEETH_CHECK":"0","HEALTH_ASSESSMENT":"1","SUBSTANCE_MISUSE":"0","INTERVENTION_RECEIVED":"0","INTERVENTION_OFFERED":"0","errors":2,"code":"969789"}]'
    return {"val": data}

@app.call
def get_child():
    data = '''{
   "header":{
      "Collection":"CIN",
      "Year":2023,
      "ReferenceDate":"2023-03-31",
      "SourceLevel":"L",
      "LEA":201,
      "SoftwareCode":"Local Authority",
      "Release":"ver 3.1.21",
      "SerialNo":1,
      "DateTime":"2023-05-23T11:14:05"
   },
   "childIdentifiers":{
      "#text":"PersonBirthDate",
      "LAchildID":"DfEX0000001",
      "UPN":"A123456789123",
      "FormerUPN":"X98765432123B",
      "UPNunknown":"UN3",
      "PersonBirthDate":"1965-03-27",
      "ExpectedPersonBirthDate":"1066-04-13",
      "GenderCurrent":1,
      "PersonDeathDate":"1980-10-08"
   },
   "childCharacteristics":{
      "LAchildID":"DfEX0000001",
      "Ethnicity":"WBRI"
   },
   "disabilities":{
      "LAchildID":"DfEX0000001",
      "Disability":[
         "HAND",
         "HEAR"
      ]
   },
   "cinDetails":{
      "LAchildID":"DfEX0000001",
      "CINdetailsID":"",
      "CINreferralDate":"1970-10-06",
      "ReferralSource":"1A",
      "PrimaryNeedCode":"N4",
      "CINclosureDate":"1971-02-27",
      "ReasonForClosure":"RC1",
      "DateOfInitialCPC":"1970-12-06",
      "ReferralNFA":0
   },
   "assessments":{
      "LAchildID":"DfEX0000001",
      "CINdetailsID":"",
      "AssessmentActualStartDate":"1970-06-03",
      "AssessmentInternalReviewDate":"1970-06-22",
      "AssessmentAuthorisationDate":"1971-07-18",
      "AssessmentFactors":[
         "2A",
         "2B"
      ]
   },
   "cinPlanDates":{
      "LAchildID":"DfEX0000001",
      "CINdetailsID":"",
      "CINPlanStartDate":"1971-01-24",
      "CINPlanEndDate":"1971-01-26"
   },
   "section47":{
      "LAchildID":"DfEX0000001",
      "CINdetailsID":"",
      "S47ActualStartDate":"1970-06-02",
      "InitialCPCtarget":"1970-06-23",
      "DateOfInitialCPC":"1970-06-17",
      "ICPCnotRequired":false
   },
   "childProtectionPlans":{
      "LAchildID":"DfEX0000001",
      "CINdetailsID":"",
      "CPPID":"",
      "CPPstartDate":"1970-02-17",
      "CPPendDate":"1971-03-14",
      "InitialCategoryOfAbuse":"PHY",
      "LatestCategoryOfAbuse":"PHY",
      "NumberOfPreviousCPP":10
   }
}'''    

    return {"val": data}


@app.call
def get_errors():
    return '''[
   {
      "tables_affected":"Header",
      "columns_affected":"ReferenceDate",
      "ROW_ID":"0",
      "rule_code":100,
      "rule_type":0,
      "ERROR_ID":"nan"
   },
   {
      "tables_affected":"Assessments",
      "columns_affected":"AssessmentActualStartDate",
      "ROW_ID":0,
      "rule_code":1103,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"Assessments",
      "columns_affected":"AssessmentActualStartDate",
      "ROW_ID":1,
      "rule_code":1103,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"CINdetails",
      "columns_affected":"CINreferralDate",
      "ROW_ID":0,
      "rule_code":1103,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"CINdetails",
      "columns_affected":"CINreferralDate",
      "ROW_ID":0,
      "rule_code":1103,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"ChildProtectionPlans",
      "columns_affected":"CPPstartDate",
      "ROW_ID":0,
      "rule_code":1105,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"CINdetails",
      "columns_affected":"CINreferralDate",
      "ROW_ID":0,
      "rule_code":1105,
      "rule_type":2,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"UPN",
      "ROW_ID":"0",
      "rule_code":1510,
      "rule_type":0,
      "ERROR_ID":"nan"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"UPN",
      "ROW_ID":"0",
      "rule_code":1530,
      "rule_type":0,
      "ERROR_ID":"nan"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"GenderCurrent",
      "ROW_ID":"0",
      "rule_code":4180,
      "rule_type":0,
      "ERROR_ID":"nan"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"PersonDeathDate",
      "ROW_ID":0,
      "rule_code":"8535Q",
      "rule_type":1,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"PersonBirthDate",
      "ROW_ID":0,
      "rule_code":"8535Q",
      "rule_type":1,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"PersonBirthDate",
      "ROW_ID":0,
      "rule_code":8525,
      "rule_type":1,
      "ERROR_ID":"DfEX0000001"
   },
   {
      "tables_affected":"ChildIdentifiers",
      "columns_affected":"ExpectedPersonBirthDate",
      "ROW_ID":0,
      "rule_code":8525,
      "rule_type":1,
      "ERROR_ID":"DfEX0000001"
   }
]'''

@app.call
def listfiles(path: str = ".") -> Iterable[str]:
    filesystem = {}
    for root, dirs, files in os.walk(path):
        path_elements = root.split(os.sep)
        current = filesystem
        for element in path_elements:
            current = current.setdefault(element, {})

        for d in dirs:
            current[d] = {}
        for f in files:
            current[f] = dict(size=os.path.getsize(os.path.join(root, f)))

    return filesystem


@app.call
def checksum(algorithm: str = "sha256", single_file=None, multi_file=None):
    files = []
    if single_file:
        files.append(single_file)
    if multi_file:
        files.extend(multi_file)

    if not files:
        return "No files provided"

    print("Received the following files:")
    for f in files:
        print(f"  {f}")

    if algorithm not in hashlib.algorithms_available:
        return f"Algorithm {algorithm} not available"

    return_value = {}
    for file in files:
        hasher = hashlib.new(algorithm)
        hasher.update(file.read())
        return_value[file.filename] = hasher.hexdigest()
    return return_value