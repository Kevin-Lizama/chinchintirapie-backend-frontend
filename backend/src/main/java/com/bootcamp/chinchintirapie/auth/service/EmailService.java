package com.bootcamp.chinchintirapie.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.from:noreply@chinchintirapie.com}")
    private String fromEmail;

    @Async
    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Recuperación de Contraseña - Chinchintirapié");
        message.setText("Hola,\n\n"
                + "Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva:\n\n"
                + resetLink + "\n\n"
                + "Si no has solicitado este cambio, ignora este correo.\n\n"
                + "Saludos,\n"
                + "El equipo de Chinchintirapié");

        mailSender.send(message);
    }
}
