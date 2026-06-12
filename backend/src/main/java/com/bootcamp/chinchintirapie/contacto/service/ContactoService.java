package com.bootcamp.chinchintirapie.contacto.service;

import com.bootcamp.chinchintirapie.auth.service.EmailService;
import com.bootcamp.chinchintirapie.contacto.dto.ContactoRequestDto;
import com.bootcamp.chinchintirapie.contacto.dto.ContactoResponseDto;
import com.bootcamp.chinchintirapie.contacto.mapper.ContactoMapper;
import com.bootcamp.chinchintirapie.contacto.model.ContactoEntity;
import com.bootcamp.chinchintirapie.contacto.repository.ContactoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactoService {

    private final ContactoRepository contactoRepository;
    private final EmailService emailService;

    @Transactional
    public ContactoResponseDto create(ContactoRequestDto request) {
        ContactoEntity contacto = ContactoEntity.builder()
                .nombre(request.nombre())
                .email(request.email())
                .telefono(request.telefono())
                .asunto(request.asunto())
                .mensaje(request.mensaje())
                .build();

        ContactoEntity savedContacto = contactoRepository.save(contacto);
        emailService.sendContactNotificationEmail(savedContacto);
        return ContactoMapper.toResponseDto(savedContacto);
    }
}
