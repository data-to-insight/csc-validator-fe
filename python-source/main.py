
import io


def endpoint(payload):
    print('from inside package')

    if payload['method'] == 'PROCESS_ONE':
        return processOne()

    if payload['method'] == 'PROCESS_TWO':
        return processTwo()

    if payload['method'] == 'UPLOAD':
        return upload(payload)    


def fileUpload(payload):
    return {"val", "FILES UPLOADED"}


def processOne():
    return {"val": "Response from Process One"}


def processTwo():
    return {"val": "Response from Process Two"}

def upload(file):
    return {"val": "Response from Upload"}