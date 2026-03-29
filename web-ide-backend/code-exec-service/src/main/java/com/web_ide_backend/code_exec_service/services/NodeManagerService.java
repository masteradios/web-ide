package com.web_ide_backend.code_exec_service.services;

import com.web_ide_backend.code_exec_service.exceptions.NodeManagerException;
import com.web_ide_backend.code_exec_service.models.INode;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.Set;

@Service
public class NodeManagerService {



    @Value("${ROOT_PATH}") // Must match exactly 'ROOT_PATH' from .bashrc
    private String root;
    private Path rootPath;

    @PostConstruct
    public void init() {
        // This runs after Spring injects the @Value
        this.rootPath = Path.of(root).toAbsolutePath().normalize();

        // Safety check: Create the user-space if it doesn't exist on your SSD
        if (!Files.exists(rootPath)) {
            try {
                Files.createDirectories(rootPath);
            } catch (IOException e) {
                throw new RuntimeException("Could not initialize storage path", e);
            }
        }
    }


    public void createFolder (INode node) {
        if(node.getIsFile()){
            throw new NodeManagerException("Invalid Request !");
        }
        String uri =node.getUri();
        if (uri == null || !uri.matches("^[a-zA-Z0-9/_-]+$")) {
            throw new SecurityException("Invalid path !");
        }
        Set<PosixFilePermission> ownerWritable = PosixFilePermissions.fromString("rwx------");


        try {

            Path userFolderPath = rootPath.resolve(uri).normalize();
            System.out.println(userFolderPath.toAbsolutePath());
            validatePath(userFolderPath);

            Files.createDirectories(userFolderPath,
                    PosixFilePermissions.asFileAttribute(ownerWritable));

        }catch (IOException e){
throw new RuntimeException("An unexpected Error Occurred !!");
        }
    }


    private void validatePath (Path path){
        Path absoluteRoot = rootPath.toAbsolutePath().normalize();
        Path absoluteUser = path.toAbsolutePath().normalize();
        if (!absoluteUser.startsWith(absoluteRoot)) {
            throw new NodeManagerException("Invalid Folder/File Name !");
        }
        if (Files.isSymbolicLink(path)) {
            throw new NodeManagerException("Invalid Folder/File Name !");

        }
        if (Files.exists(path)) {
            throw new NodeManagerException("Folder already exists !");
        }
    }
}
