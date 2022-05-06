package com.fleabay.service

import java.nio.charset.Charset

sealed trait Content
final case class Text(
    body: String,
    charset: Charset = Charset.defaultCharset
    ) extends Content

final case class Credentials(
  username: String,
  password: String
)

final case class MailerConfig(
    host: Option[String] = None,
    port: Option[Int] = None,
    auth: Option[Boolean] = None,
    startTls: Option[Boolean] = None,
    ssl: Option[Boolean] = None,
    trustAll: Option[Boolean] = None,
    socketFactory: Option[String] = Some("javax.net.ssl.SSLSocketFactory"),
    socketFactoryPort: Option[String] = None,
    creds: Option[Credentials] = None
)

final case class Mail(
    from: String,
    to: List[String] = List.empty[String],
    cc: List[String] = List.empty[String],
    bcc: List[String] = List.empty[String],
    replyTo: Option[String] = None,
    replyToAll: Option[Boolean] = None,
    headers: List[(String, String)] = List.empty[(String, String)],
    content: Content = Text("")    
)

object Session {

}