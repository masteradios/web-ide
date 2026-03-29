package com.web_ide_backend.code_exec_service.models;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class INode {
    private String name;
    private Boolean isFile;
    private String uri;
    private  Boolean isExpanded;
    private Boolean isSelected;
    private String parent;

}
