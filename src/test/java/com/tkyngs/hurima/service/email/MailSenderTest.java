package com.tkyngs.hurima.service.email;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetup;
import org.junit.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.mail.internet.MimeMessage;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MailSenderTest {

  @RegisterExtension
  static GreenMailExtension greenMailExtension = new GreenMailExtension(ServerSetup.SMTP)
    .withConfiguration(GreenMailConfiguration.aConfig().withUser("duke", "springboot"))
    .withPerMethodLifecycle(false);

  @Autowired
  private TestRestTemplate template;

  @Test
  public void shouldSendEmailWithCorrectPayloadToUser() throws Exception {
    String payload = "{ \"email\": \"duke@spring.io\", \"content\": \"Test\"}";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> request = new HttpEntity<>(payload, headers);

    ResponseEntity<Void> response = this.template.postForEntity("/api/v1/registration", request, Void.class);

    assertEquals(200, response.getStatusCodeValue());


    MimeMessage receivedMessage = greenMailExtension.getReceivedMessages()[0];
    assertEquals("Test", GreenMailUtil.getBody(receivedMessage));
    assertEquals(1, receivedMessage.getAllRecipients().length);
    assertEquals("duke@spring.io", receivedMessage.getAllRecipients()[0].toString());

  }

}