package com.web_ide_backend.code_exec_service.services;

import com.web_ide_backend.code_exec_service.models.CreateNodeRequest;
import com.web_ide_backend.code_exec_service.models.INode;
import com.web_ide_backend.code_exec_service.models.SignupRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private NodeManagerService nodeManagerService;

    @Autowired
    private EncryptionService encryptionService;

    public void createUser (SignupRequestBody signupRequestBody){
        INode node =new INode();
        node.setIsExpanded(false);
        node.setIsFile(false);
        node.setIsSelected(false);
        node.setName(signupRequestBody.getUserName());

            String encryptedName = encryptionService.encrypt(signupRequestBody.getUserName());



        node.setUri(encryptedName);
        node.setParent("");
        System.out.println(node);
        nodeManagerService.createFolder(node);
    }

    public void createNode (CreateNodeRequest createNodeRequest){
        String userName = createNodeRequest.getUserName();
        String encryptedRootName= encryptionService.encrypt(userName);
        String uri= createNodeRequest.getNode().getUri();
        uri = uri.replaceFirst(userName, encryptedRootName);
        System.out.println(uri);
        INode node = createNodeRequest.getNode();
        node.setUri(uri);
        createNodeRequest.setNode(node);
        System.out.println(node.toString());
        nodeManagerService.createFolder(createNodeRequest.getNode());
    }
}
