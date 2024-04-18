class ResponseMessage:
    INVALID_DATA = {
        "message": "You provided invalid data",
        "code": "invalid_data",
    }
    INVALID_REQUEST = {
        "message": "This request is not allowed",
        "code": "invalid_request",
    }
