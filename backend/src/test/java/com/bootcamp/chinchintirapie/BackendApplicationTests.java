package com.bootcamp.chinchintirapie;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.mock.mockito.MockBean;
import software.amazon.awssdk.services.s3.S3Client;

@SpringBootTest
@ActiveProfiles("test")
class BackendApplicationTests {

    @MockBean
    private S3Client s3Client;

    @Test
    void contextLoads() {
    }

}
