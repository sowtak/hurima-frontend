import scala.Console.in

val scalaVersionValue = "2.13.8"

lazy val common = Seq(
  organization := "io.github.sowtak",
  scalaVersion := scalaVersionValue,
  scalacOptions ++= Seq(
    "-Ymacro-annotations",
    "-language:higherKinds"
  ),
  scalacOptions in (Compile, compile) ++= Seq(
    "-Ywarn-unused",
    "-Ywarn-macros:after"
  )
)

lazy val root = (project in file("."))
  .settings(common: _*)
  // .dependsOn(macros)
  .settings(
    name := "server",
    version := "0.1.0",
    libraryDependencies ++= Seq(
      "ch.qos.logback" % "logback-classic" % "1.2.10",
      "com.typesafe.scala-logging" %% "scala-logging" % "3.9.4",
      "com.typesafe" % "config" % "1.4.2",
      "org.scalatest" %% "scalatest" % "3.2.11",
      "org.scalatest" %% "scalatest" % "3.2.11" % "test", 
      "dev.zio" %% "zio" % "2.0.0-RC6",
      "dev.zio" %% "zio-streams" % "2.0.0-RC6",
      "com.sun.mail" % "javax.mail" % "1.6.2"
    ),
    resolvers += "Artima Maven Repository" at "https://repo.artima.com/releases"
  )


// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
