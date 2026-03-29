package com.web_ide_backend.code_exec_service.contollers;

import com.web_ide_backend.code_exec_service.models.CreateNodeRequest;
import com.web_ide_backend.code_exec_service.models.INode;
import com.web_ide_backend.code_exec_service.models.SignupRequestBody;
import com.web_ide_backend.code_exec_service.services.EncryptionService;
import com.web_ide_backend.code_exec_service.services.NodeManagerService;
import com.web_ide_backend.code_exec_service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/node")
public class NodeController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser (@RequestBody SignupRequestBody signupRequestBody){

    userService.createUser(signupRequestBody);
    return  ResponseEntity.ok("");

    }

    @PostMapping("/createFolder")
    public ResponseEntity<?> createFolder(@RequestBody CreateNodeRequest createNodeRequest){

        userService.createNode(createNodeRequest);
        return ResponseEntity.ok("");


    }

}
