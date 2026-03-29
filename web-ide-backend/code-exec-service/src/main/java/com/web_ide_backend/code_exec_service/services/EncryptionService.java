package com.web_ide_backend.code_exec_service.services;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
public class EncryptionService {
    // Keep this 16-character string secret!
    @Value("${SECRET_ENCRYPTION_KEY}")
    private String SECRET_KEY;
    private SecretKeySpec keySpec ;


    @PostConstruct
    public void init() {
        // This runs after Spring injects the @Value
        keySpec= new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
    }



    public String encrypt(String data)  {
        if (data == null || !data.matches("^[a-zA-Z0-9/_-]+$")) {
            throw new SecurityException("Invalid path !");
        }
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, keySpec);
            String encryptString =data+"someencryptedsecret";
            byte[] encrypted = cipher.doFinal(encryptString.getBytes());
            // Use UrlEncoder to ensure the folder name doesn't contain "/" or "+"
            return Base64.getUrlEncoder().withoutPadding().encodeToString(encrypted);
        }catch (NoSuchPaddingException | IllegalBlockSizeException | NoSuchAlgorithmException | BadPaddingException |
                InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    public String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, keySpec);
            byte[] decoded = Base64.getUrlDecoder().decode(encryptedData);
            return new String(cipher.doFinal(decoded));
        }
         catch (NoSuchPaddingException | InvalidKeyException | BadPaddingException | IllegalBlockSizeException |
                NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
