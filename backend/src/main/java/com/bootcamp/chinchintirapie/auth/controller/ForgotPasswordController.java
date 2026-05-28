package com.bootcamp.chinchintirapie.auth.controller;

import com.bootcamp.chinchintirapie.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final AuthService authService;

    /**
     * Endpoint to handle forgot password requests at the root path.
     * This mirrors the existing /api/auth/forgot-password endpoint but is exposed without the /api/auth prefix
     * to support legacy or external client calls.
     */
    @PostMapping("/forgot-password")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("El correo es requerido");
        }
        return authService.forgotPassword(email);
    }
}
