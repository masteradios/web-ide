package com.web_ide_backend.code_exec_service.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreateNodeRequest {

    private String userName;
    private INode node;
}
