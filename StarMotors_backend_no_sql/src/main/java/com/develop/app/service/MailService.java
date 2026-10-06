package com.develop.app.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;



import com.develop.app.model.Email;

@Service
public class MailService {
	

	
	@Autowired
	private JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String mailFrom;

	public Email sendEmail(Email email) throws MessagingException {

		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
		String mensaje = "<h2> Hola, " + email.getText() + "</h2>\r\n"
				+ "<p>Mensaje de Aceptacion de Reparacion del Automovil:</p>"
				+ "<p>Se le informa que se cubrira la totalidad de su garantia: </p>\r\n"
				+ "<p>A continuacion le detallaremos los datos del vehiculo y el contenido del informe </p>\r\n"
				+ "<p>Placas: PR-206</p>\r\n" + "<p>Marca: NISSAN FORD </p>\r\n"
				+ "<p>para continuar con el proceso envie su respuesta de aceptacion </p>\r\n"
				+ "<p>Saludos Cordiales, </p>\r\n" + "<p>La Agencia Star Motors, le agredece </p>\r\n";
		helper.setFrom(mailFrom);
		helper.setTo(email.getTo());
		helper.setSubject(email.getSubject());
		helper.setText(mensaje, true);
		emailSender.send(message);
		return email;

	}

	public void sendEmailWithAttachment(MultipartFile multipartFile, String correo)
			 {
				 try {
		MimeMessage msg = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(msg, true);


			if (correo.contains(",")) {
				String[] emails = correo.split(",");
				int receipantSize = emails.length;
				for (int i = 0; i < receipantSize; i++) {
					helper.setTo(emails[i]);
					helper.setSubject("Attachment File !");
					helper.setText("<h1>" + "Find the Attachment file" + "</h1>", true);
					InputStreamSource attachment = new ByteArrayResource(multipartFile.getBytes());

					helper.addAttachment(multipartFile.getOriginalFilename(), attachment);
					emailSender.send(msg);
				}

			} else {
				helper.setTo(correo);
				helper.setSubject("Attachment File !");

				helper.setText("<h1>" + "Find the Attachment file" + "</h1>", true);
				InputStreamSource attachment = new ByteArrayResource(multipartFile.getBytes());

				helper.addAttachment(multipartFile.getOriginalFilename(), attachment);
				emailSender.send(msg);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
}
