package com.tkyngs.hurima.service.email;

import com.icegreen.greenmail.junit.GreenMailRule;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.util.GreenMailUtil;
import org.junit.Rule;
import org.junit.Test;

import javax.mail.internet.MimeMessage;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/31/2021 3:01 PM
 */


public class ReceiveTest {
  @Rule
  public final GreenMailRule greenMailRule = new GreenMailRule();

  @Test
  public void testReceive() {
    GreenMailUser user = greenMailRule.setUser("to@localhost", "login-id", "password");
    user.deliver(createMimeMessage());
    GreenMailUtil.sendTextEmailTest("to@localhost", "from@localhost",
      "subject", "body");
  }

  private MimeMessage createMimeMessage() {
    return GreenMailUtil.createTextEmail("to@localhost", "from@localhost", "subject", "body",
      greenMailRule.getImap().getServerSetup());
  }
}
