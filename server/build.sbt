val scalaVersionValue = "2.13.8"
val catsVersion = "2.7.0"
val catsTaglessVersion = "0.14.0"
val catsEffectVersion = "3.3.11"
val scalaTestVersion = "3.2.11"

lazy val common = Seq(
  organization := "net.sowtak",
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
  //.dependsOn(macros)
  .settings(
    name := "server",
    version := "0.1.0",
    libraryDependencies ++= Seq(
        "org.scalatest" %% "scalatest" % scalaTestVersion,
        "org.typelevel" %% "cats-core" % catsVersion,
        "org.typelevel" %% "cats-tagless-core" % catsTaglessVersion,
        "org.typelevel" %% "cats-effect" % catsEffectVersion
      )
  )


// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
