package com.web_ide_backend.code_exec_service;

import com.web_ide_backend.code_exec_service.exceptions.NodeManagerException;
import com.web_ide_backend.code_exec_service.models.ErrorResponseBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NodeManagerException.class)
    public ResponseEntity<ErrorResponseBody> handleNodeManagerException(NodeManagerException e){
        ErrorResponseBody errorResponseBody= new ErrorResponseBody(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseBody);
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ErrorResponseBody> handleSecurityException(SecurityException e){
    ErrorResponseBody errorResponseBody= new ErrorResponseBody(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseBody);
}
}
