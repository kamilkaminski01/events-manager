class ResponseMessage:
    CREATED = {
        "message": "Object created",
        "code": "created",
    }
    DELETED = {
        "message": "Object deleted",
        "code": "deleted",
    }
    UPDATED = {
        "message": "Object updated",
        "code": "updated",
    }
    NOT_FOUND = {
        "message": "Object not found",
        "code": "not_found",
    }
    INVALID_DATA = {
        "message": "You provided invalid data",
        "code": "invalid_data",
    }
    INVALID_REQUEST = {
        "message": "This request is not allowed",
        "code": "invalid_request",
    }
