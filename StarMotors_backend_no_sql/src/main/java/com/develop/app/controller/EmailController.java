package com.develop.app.controller;

import org.springframework.validation.annotation.Validated;

import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;


import com.develop.app.model.Email;
import com.develop.app.service.MailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/email")
public class EmailController {

	@Autowired
	private MailService mailService;
	
	@PostMapping("/enviar")
	public Email seEmail(@Validated @RequestBody Email email) throws MessagingException {
		return mailService.sendEmail(email);
	}
	@PostMapping(value="/enviarFile")
	public String sendEmailWithAttachment(@RequestParam(value = "file") MultipartFile file, @RequestParam(value = "correo") String correo) {
		try {
			mailService.sendEmailWithAttachment(file, correo);
			return "Email Sent!";
		} catch (Exception ex) {
			return "Error in sending email: " + ex;
		}
	}

}
