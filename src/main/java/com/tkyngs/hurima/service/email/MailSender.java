package com.tkyngs.hurima.service.email;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/28/2021 8:38 PM
 */

@Service
@RequiredArgsConstructor
public class MailSender {

  private final JavaMailSender mailSender;
  private final SpringTemplateEngine templateEngine;

  @Value("${spring.mail.username}")
  private String username;

  public void sendMessage(String to, String subject, String template, Map<String, Object> attributes) throws MessagingException {
    Context context = new Context();
    context.setVariables(attributes);
    String body = templateEngine.process(template, context);
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);
    helper.setFrom(username);
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(body, true);
    mailSender.send(message);
  }
}
